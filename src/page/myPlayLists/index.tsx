import { Avatar, Input, List, Table, Typography } from "antd";
import { PlayCircleFilled } from '@ant-design/icons';
import React, { useEffect, useState } from "react";
import VirtualList from 'rc-virtual-list';
import BasicLayout from "../../common/layouts/basicLayout";
import { spotifyApi } from "../../service/url";
import { useDispatch, useSelector } from "react-redux";
import { currentPlayingActions, currentUserActions, currentUserData } from "../../reduxToolkit";
import AlertNotification from "../../common/components/alertNotifacation";
import { AddButton, DeleteButton } from "../../common/components/buttons";
import { ColumnsType } from "antd/lib/table";
import { useParams } from "react-router";
import { UserDataType } from "../../type/userDataType";

type OperationType = "create" | "delete";

export default function MyPlayLists(){
    const ref = React.useRef(null);
    const ContainerHeight = 400;
    const token = useSelector(currentUserData.token);
    const userPlayLists = useSelector(currentUserData.userPlayLists);
    const urlParams = useParams();
    const dispatch = useDispatch();
    const [ loading, setLoading ] = useState(false);
    const [ searchValue, setSearchValue ] = useState("");
    const [ searchResults, setSearchResults ] = useState<SpotifyApi.TrackObjectFull[]>([]);
    const [ playListData, setPlayListData ] = useState<UserDataType>();
    const [ offset, setOffset ] = useState(0);

    const columns: ColumnsType<SpotifyApi.TrackObjectFull> = [
        {
            title: '',
            width: 60,
            onCell: () => ({style: {textAlign: "center"}}),
            render: (row: SpotifyApi.TrackObjectFull) => ( 
                <PlayCircleFilled style={{fontSize: 25}} onClick={()=> {
                    dispatch(currentPlayingActions.startPlaying());
                    dispatch(currentPlayingActions.recordPlayingData(row));
                }}/>
            ),
        },
        {
            title: '歌名',
            render: (row: SpotifyApi.TrackObjectFull) => ( 
                <List.Item.Meta
                    avatar={<Avatar src={row.album.images[1].url} />}
                    title={row.name}
                    description={getArtistNames(row.artists)}
                /> 
            )
        },
        {
            title: '專輯',
            dataIndex: ['album', 'name'],
            responsive: ['sm'],
        },
        {
            title: '發行日期',
            dataIndex: ['album', 'release_date'],
            responsive: ['lg'],
        },
        {
            title: '',
            width: 100,
            render: (row: SpotifyApi.TrackObjectFull) => (
                <DeleteButton onClick={()=> handleDeleteItemToPlayList(row)}/>
            )
        },
    ];

    useEffect(() => {
        const currentUserPlayList = userPlayLists.find(item => item.id === urlParams.playListId);
        setPlayListData(currentUserPlayList);
    }, [urlParams.playListId, userPlayLists])

    const onSearch = (value: string, preResults: SpotifyApi.TrackObjectFull[] = []) => {
        setLoading(true);
        spotifyApi().setAccessToken(token);
        spotifyApi().searchTracks(value, { limit: 10, offset: offset })
        .then(res => {
            const getPreviewUrlData = res.tracks.items.filter(item => item.preview_url !== null);
            const appendData = preResults.concat(getPreviewUrlData);
            setSearchResults(appendData);
        }).catch(err => {
            console.log("err: ",err);
            AlertNotification({
                type: "error",
                title: "搜尋失敗！",
                description: "請重新輸入！"
            })
        }).finally(() => setLoading(false))
    }
    useEffect(() => {
        if(searchValue){
            onSearch(searchValue, searchResults)
        }else{
            onSearch("a");
        }
    }, [offset])

    useEffect(()=> {
        setSearchValue("");
        setOffset(0);
        onSearch("a");
    }, [urlParams.playListId])

    const getArtistNames = (artistsData: SpotifyApi.ArtistObjectSimplified[]): string => {
        const artistNames = artistsData.map(item => item.name);
        return artistNames.join();
    }

    const onScroll = (event: React.UIEvent<HTMLElement, UIEvent>) => {
        if ((event.currentTarget.scrollHeight - event.currentTarget.scrollTop) === ContainerHeight) {
            setOffset(offset+10);
        }
    }

    const transferResults = (operation: OperationType, item: SpotifyApi.TrackObjectFull) => {
        const tempResults = [...searchResults];
        const targetIndex = searchResults.findIndex(item => item.id === item.id);
        if(operation === "create"){
            tempResults.splice(targetIndex, 1);
        }else if(operation === "delete"){
            tempResults.push(item);
        }
        setSearchResults(tempResults);
    }

    const handleAddItemToPlayList = (item: SpotifyApi.TrackObjectFull) => {
        const updateCurrentPlayList = {
            ...playListData as UserDataType,
            playList: (playListData?.playList) ? [...playListData.playList, item] : [item]
        };
        dispatch(currentUserActions.updateUserPlayList(updateCurrentPlayList));
        transferResults( "create", item);
    }

    const handleDeleteItemToPlayList = (row: SpotifyApi.TrackObjectFull) => {
        const currentPlayListData = (playListData?.playList) ? [...playListData.playList] : [];
        const targetDataIndex = currentPlayListData.findIndex(item => item.id === row.id);
        if(targetDataIndex !== -1){
            currentPlayListData.splice(targetDataIndex, 1)
        }
        const updateCurrentPlayList = {
            ...playListData as UserDataType,
            playList: currentPlayListData
        };
        dispatch(currentUserActions.deleteUserPlayList(updateCurrentPlayList));
        transferResults( "delete", row);
    }

    return(
        <BasicLayout
            title={playListData?.name||""}
            main={
                <Table 
                    size="small" 
                    loading={loading}
                    rowKey="id"
                    columns={columns}
                    dataSource={playListData?.playList}
                    scroll={{y: 400}}
                    pagination={false}
                />
            }
            details={
                <>
                    <Typography.Title level={3}>推薦清單</Typography.Title>
                    <Input.Search 
                        placeholder="搜尋歌曲或專輯..." 
                        value={searchValue}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)} 
                        onSearch={() => onSearch(searchValue)}
                        onPressEnter={() => onSearch(searchValue)}
                        enterButton 
                        style={{width: 300, margin: "10px 0"}}
                    />
                    {   searchResults.length > 0
                        ?   (<List>
                                <VirtualList
                                    data={searchResults}
                                    height={ContainerHeight}
                                    itemHeight={47}
                                    itemKey="id"
                                    onScroll={onScroll}
                                    // ref={awesomeInputRef}
                                >
                                    {item => (                                
                                        <List.Item 
                                            key={item.id}
                                            extra={<AddButton onClick={() => handleAddItemToPlayList(item)}/>}
                                        >
                                            <List.Item.Meta
                                                avatar={<Avatar src={item.album.images[1].url} />}
                                                title={item.name}
                                                description={getArtistNames(item.artists)}
                                            />
                                        </List.Item>
                                    )}
                                </VirtualList>
                            </List>)
                        :  
                            <Typography.Title level={5}>查無資料</Typography.Title>
                    }
                </>
            }
        />
    )
}

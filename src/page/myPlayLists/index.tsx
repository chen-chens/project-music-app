import { Avatar, Input, List, Table, Typography } from "antd";
import { PlayCircleFilled } from '@ant-design/icons';
import React, { useEffect, useState } from "react";
import VirtualList from 'rc-virtual-list';
import BasicLayout from "../../common/layouts/basicLayout";
import { spotifyApi } from "../../service/url";
import { useDispatch, useSelector } from "react-redux";
import { currentUserActions, currentUserData } from "../../reduxToolkit";
import AlertNotification from "../../common/components/alertNotifacation";
import { AddButton, DeleteButton } from "../../common/components/buttons";
import { ColumnsType } from "antd/lib/table";
import { useParams } from "react-router";
import { UserDataType } from "../../type/userDataType";

export default function MyPlayLists(){
    const ContainerHeight = 400;
    const token = useSelector(currentUserData.token);
    const userPlayLists = useSelector(currentUserData.userPlayLists);
    const urlParams = useParams();
    const dispatch = useDispatch();
    const [ loading, setLoading ] = useState(false);
    const [ searchValue, setSearchValue ] = useState("");
    const [ searchResults, setSearchResults ] = useState<SpotifyApi.TrackObjectFull[]>([]);
    const [ playListData, setPlayListData ] = useState<UserDataType>();

    const columns: ColumnsType<SpotifyApi.TrackObjectFull> = [
        {
            title: '',
            width: 60,
            onCell: () => ({style: {textAlign: "center"}}),
            render: (row: SpotifyApi.TrackObjectFull) => ( 
                <PlayCircleFilled style={{fontSize: 25}} onClick={()=> {}}/>
            )
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
        },
        {
            title: '發行日期',
            dataIndex: ['album', 'release_date'],
        },
        {
            title: '',
            width: 100,
            render: (row: SpotifyApi.TrackObjectFull) => (
                <DeleteButton onClick={()=> {}}/>
            )
        },
    ];

    useEffect(() => {
        const currentUserPlayList = userPlayLists.find(item => item.id === urlParams.playListId);
        setPlayListData(currentUserPlayList);
    }, [urlParams.playListId, userPlayLists])

    const onSearch = (value: string) => {
        console.log(value);
        setLoading(true);

        spotifyApi().setAccessToken(token);
        spotifyApi().searchTracks(value, { limit: 15 })
        .then(res => {
            console.log("res: ",res);
            const getPreviewUrlData = res.tracks.items.filter(item => item.preview_url !== null);
            setSearchResults(getPreviewUrlData);
        }).catch(err => {
            console.log("err: ",err);
            AlertNotification({
                type: "error",
                title: "搜尋失敗！",
                description: "請重新輸入！"
            })
        }).finally(() => setLoading(false))
    }

    const getArtistNames = (artistsData: SpotifyApi.ArtistObjectSimplified[]): string => {
        const artistNames = artistsData.map(item => item.name);
        return artistNames.join();
    }

    const appendData = () => {
       
    }

    const onScroll = (event: React.UIEvent<HTMLElement, UIEvent>) => {
        if ((event.currentTarget.scrollHeight - event.currentTarget.scrollTop) === ContainerHeight) {
            appendData();
        }
    }

    const handleAddItemToPlayList = (item: SpotifyApi.TrackObjectFull) => {
        const tempUserPlayList = [...userPlayLists];
        if(playListData){
            const updateCurrentPlayList = {
                ...playListData,
                playList: (playListData?.playList) ? [...playListData.playList, item] : [item]
            };
            tempUserPlayList.splice(Number(playListData.id)-1, 1, updateCurrentPlayList)
        }
        
        dispatch(currentUserActions.updateUserData(tempUserPlayList))
    }

    return(
        <BasicLayout
            title={playListData?.name||"122"}
            main={
                <Table 
                    size="small" 
                    loading={loading}
                    rowKey="id"
                    columns={columns}
                    dataSource={playListData?.playList}
                    scroll={{ y: 400}}
                />
            }
            details={
                <>
                    <Input.Search 
                        placeholder="搜尋歌曲或專輯..." 
                        value={searchValue}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)} 
                        onSearch={onSearch}
                        onPressEnter={(e: React.KeyboardEvent<HTMLInputElement>) => {}}
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
                                    // onScroll={()}
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
                        :   <Typography.Title level={5}>查無資料</Typography.Title>
                    }
                </>
            }
        />
    )
}

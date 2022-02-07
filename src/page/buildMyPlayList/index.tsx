import { Avatar, Button, Divider, Input, List, Table } from "antd";
import React, { ReactNode, useState } from "react";
import VirtualList from 'rc-virtual-list';
import BasicLayout from "../../common/basicLayout";
import { spotifyApi } from "../../service/url";
import { useSelector } from "react-redux";
import { currentUserData } from "../../reduxToolkit";
import AlertNotification from "../../components/alertNotifacation";

export default function BuildMyPlayList(){
    const ContainerHeight = 400;
    const token = useSelector(currentUserData.token);
    const [ loading, setLoading ] = useState(false);
    const [ searchValue, setSearchValue ] = useState("");
    const [ searchResults, setSearchResults ] = useState<SpotifyApi.TrackObjectFull[]>([]);
    // const [ apiCall, setApiCall ] = useState<Promise<SpotifyApi.SearchResponse>|null>(null);

    const columns = [
        {
            title: '#',
            dataIndex: 'name',
        },
        {
            title: '標題',
            dataIndex: 'name',
        },
        {
            title: '專輯',
            dataIndex: 'name',
        },
        {
            title: '移除鈕',
            dataIndex: 'name',
        },
    ];
    

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
    };

    const appendData = () => {
       
    };

    const onScroll = (event: React.UIEvent<HTMLElement, UIEvent>) => {
        if ((event.currentTarget.scrollHeight - event.currentTarget.scrollTop) === ContainerHeight) {
            appendData();
        }
    };

    

    const getArtistNames = (artistsData: SpotifyApi.ArtistObjectSimplified[]): string => {
        const artistNames = artistsData.map(item => item.name);
        return artistNames.join();
    }

    return(
        <BasicLayout
            title="建立我的專屬請單＃1"
            main={
                <Table 
                    size="small" 
                    loading={loading}
                    // bordered
                    rowKey="id"
                    columns={columns}
                    dataSource={[]}
                    // dataSource={userPlayList}
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
                        onPressEnter={(event: React.KeyboardEvent<HTMLInputElement>) => {}}
                        enterButton 
                        style={{width: 300, margin: "10px 0"}}
                    />
                    <List>
                        <VirtualList
                            data={searchResults}
                            height={ContainerHeight}
                            itemHeight={47}
                            itemKey="id"
                            // onScroll={()}
                        >
                            {item => (
                                <List.Item key={item.id}>
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.album.images[1].url} />}
                                        title={item.name}
                                        description={getArtistNames(item.artists)}
                                    />
                                    <div style={{flex: "1 1"}}>
                                        {item.album.name} / {item.album.release_date}
                                    </div>
                                    <Button>新增</Button>
                                </List.Item>
                            )}
                        </VirtualList>
                    </List>
                </>
            }
        />
    )
}

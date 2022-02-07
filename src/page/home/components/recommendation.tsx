import { Spin, Tabs, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AlertNotification from "../../../components/alertNotifacation";
import { currentUserData } from "../../../reduxToolkit";
import { spotifyApi } from "../../../service/url";
import { Genrees } from "../../../type/genrees";
import Details from "./details";


export default function Recommendation(){
    const token = useSelector(currentUserData.token);
    const [ recommendationList, setRecommendationList ] = useState<globalThis.SpotifyApi.RecommendationsFromSeedsResponse>();
    const [ genresKey, setGenresKey ] = useState<string>(Genrees.NEW_RELEASE);
    const [ loading, setLoading ] = useState(false);
    const [ targetItem, setTargetItem ] = useState<SpotifyApi.TrackObjectFull>();

    const categoryTags = [
        {
            key: Genrees.NEW_RELEASE,
            title: "最新發行",
        },
        {
            key: Genrees.K_POP,
            title: "韓國流行樂",
        },
        {
            key: Genrees.HIP_HOP,
            title: "Hip Hop",
        },
        {
            key: Genrees.ROCK,
            title: "搖滾樂",
        },
        {
            key: Genrees.STUDY,
            title: "專注",
        },
        {
            key: Genrees.WORK_OUT,
            title: "健身",
        },
    ];

    useEffect(()=> {
        if(token){
            setLoading(true);
            spotifyApi().setAccessToken(token);
            spotifyApi().getRecommendations({ seed_genres: genresKey })
            .then(res => {
                console.log("res: ",res);
                setRecommendationList(res);
            }).catch(err => {
                console.log("err: ",err);
                AlertNotification({
                    type: "error",
                    title: "取得資料失敗！"
                })
            }).finally(() => setLoading(false))
        }
    }, [token, genresKey])
    
    return(
        <>
            <Typography.Title level={3}>今天想聽什麼歌？</Typography.Title>
            <Tabs onChange={(key: string)=> setGenresKey(key)}>
                {categoryTags.map(tag => (
                    <Tabs.TabPane tab={tag.title} key={tag.key}>
                        <Spin spinning={loading}>
                            <Details data={recommendationList} genresKey={genresKey} setTargetItem={setTargetItem}/>    
                        </Spin>
                    </Tabs.TabPane>
                ))}
            </Tabs>
        </>
    )
}
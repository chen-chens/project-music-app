import React, { useEffect, useState } from "react";
import { CopyRight, MainBody, Outline, TopHeader } from "./layouts";
import { MenuOutlined } from '@ant-design/icons';
import { Button, Spin, Tabs, Typography } from "antd";
import { useLocation, useNavigate } from "react-router";
import qs from "qs";
import { useDispatch } from "react-redux";
import { currentUserActions } from "../../reduxToolkit";
import { spotifyApi } from "../../service/url";
import NavBar from "./components/navBar";
import Details from "./components/details";
import AlertNotification from "../../components/alertNotifacation";

enum Genrees {
    NEW_RELEASE = "new-release", // 最新發行
    K_POP = "k-pop",
    HIP_HOP = "hip-hop", 
    ROCK = "rock",
    STUDY = "study", // 專注
    WORK_OUT = "work-out", // 健身
}

export default function Home(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation(); // To get url
    const urlParams = qs.parse(location.hash.slice(1), { ignoreQueryPrefix: true }); // pase url params to get token
    const [ showMobileNav, setShowMobileNav ] = useState(false);
    const [ recommendationList, setRecommendationList ] = useState<globalThis.SpotifyApi.RecommendationsFromSeedsResponse>();
    const [ genresKey, setGenresKey ] = useState<string>(Genrees.NEW_RELEASE);
    const [ loading, setLoading ] = useState(false);

    useEffect(()=> {
        if(urlParams.access_token){
            setLoading(true);
            dispatch(currentUserActions.getToken(urlParams.access_token.toString())); // update token to redux

            spotifyApi().setAccessToken(urlParams.access_token.toString());
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
    }, [urlParams.access_token, genresKey])


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

    return(
        <Outline>
            <TopHeader>
                <Typography.Title level={2} className="logo">MUSIC</Typography.Title>
                <Button className="menu" type="primary" onClick={() => setShowMobileNav(!showMobileNav)}>
                    <MenuOutlined />
                </Button>
                <Button className="logBtn" type="primary" onClick={()=> navigate("/")}>
                    登出
                </Button>
            </TopHeader>
            <NavBar showMobileNav={showMobileNav}/>
            <MainBody>
                <Typography.Title level={3}>今天想聽什麼歌？</Typography.Title>
                <Tabs defaultActiveKey="1" onChange={(key: string)=> setGenresKey(key)}>
                    {categoryTags.map(tag => (
                        <Tabs.TabPane tab={tag.title} key={tag.key}>
                            <Spin spinning={loading}>
                                <Details data={recommendationList} genresKey={genresKey}/>    
                            </Spin>
                        </Tabs.TabPane>
                    ))}
                </Tabs>
                <CopyRight>Music App © 2022 By Chen Huei Jan</CopyRight>
            </MainBody>
        </Outline>
    )
}
import React, { useEffect, useState } from "react";
import { CopyRight, Details, MainBody, Outline, SideBar, TopHeader } from "./layouts";
import { MenuOutlined, UserOutlined, LikeOutlined, FolderAddOutlined } from '@ant-design/icons';
import { Button, Menu } from "antd";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import { spotifyRequest } from "../../service/url";
import qs from "qs";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../reduxToolkit/hooks";
import { currentUserActions, currentUserData } from "../../reduxToolkit";


export default function Home(){
    const iconStyle = {fontSize: "18px", fontWeight: 600 };
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation(); // To get url
    const urlParams = qs.parse(location.hash.slice(1), { ignoreQueryPrefix: true }); // pase url params to get token
    const [ showMobileNav, setShowMobileNav ] = useState(false);

    useEffect(()=> {
        console.log("urlParams: ", urlParams);
        if(urlParams.access_token){
            dispatch(currentUserActions.getToken(urlParams.access_token.toString()));
        }


        // spotifyRequest.get(`/v1/tracks/6rqhFgbbKwnb9MLmUQDhG6`, {
        //     headers:{"Authorization": `Bearer ${urlParams.access_token}`} 
        // }).then(res => {
        //     console.log("res: ",res);
        // }).catch(err => {
        //     console.log("err: ",err);
        // })

       
    }, [urlParams])



    return(
        <Outline>
            <TopHeader>
                <h1 className="logo">MUSIC</h1>
                <Button className="menu" type="primary" onClick={() => setShowMobileNav(!showMobileNav)}>
                    <MenuOutlined />
                </Button>
                <Button className="logBtn" type="primary" onClick={()=> navigate("/")}>
                    登出
                </Button>
            </TopHeader>
            <SideBar showMobileNav={showMobileNav}> 
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" icon={<UserOutlined style={iconStyle}/>}>
                        我的播放清單
                    </Menu.Item>
                    <Menu.Item key="2" icon={<LikeOutlined style={iconStyle}/>}>
                        已按讚歌曲
                    </Menu.Item>
                    <Menu.Item key="3" icon={<FolderAddOutlined style={iconStyle}/>}>
                        建立播放清單
                    </Menu.Item>
                </Menu>
            </SideBar>

            <MainBody>
                <Details>
                    今天想聽什麼歌？
                    搜尋鈕
                    (1) 熱門精選
                    (2) 最新發行
                    (3) 各種分類
                </Details>
                <CopyRight>Music App © 2022 By Chen Huei Jan</CopyRight>
            </MainBody>
        </Outline>
    )
}
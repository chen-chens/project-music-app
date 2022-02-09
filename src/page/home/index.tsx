import React, { useEffect, useState } from "react";
import { CopyRight, MainBody, Layout, TopHeader } from "./layouts";
import { MenuOutlined } from '@ant-design/icons';
import { Button, Typography } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router";
import qs from "qs";
import { useDispatch, useSelector } from "react-redux";
import { currentPlayingData, currentUserActions } from "../../reduxToolkit";
import NavBar from "./components/navBar";
import PlayBar from "../../common/components/playBar";


export default function Home(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation(); // To get url
    const urlParams = qs.parse(location.hash.slice(1), { ignoreQueryPrefix: true }); // pase url params to get token
    const showPlayBar = useSelector(currentPlayingData.showPlayBar);
    const [ showMobileNav, setShowMobileNav ] = useState(false);

    useEffect(()=> {
        if(urlParams.access_token){
            dispatch(currentUserActions.getToken(urlParams.access_token.toString())); // update token to redux
            // navigate("/master");
        }
    }, [urlParams.access_token])

    const handleLogOut = () => {
        navigate("/")
        dispatch(currentUserActions.logout);
    }


    return(
        <Layout>
            <TopHeader>
                <Typography.Title level={2} className="logo" onClick={() => navigate("/master")}>MUSIC</Typography.Title>
                <Button className="menu" type="primary" onClick={() => setShowMobileNav(!showMobileNav)}>
                    <MenuOutlined />
                </Button>
                <Button className="logBtn" type="primary" onClick={handleLogOut}>
                    登出
                </Button>
            </TopHeader>

            <NavBar showMobileNav={showMobileNav} setShowMobileNav={setShowMobileNav}/>

            <MainBody>
                <Outlet /> 
                <CopyRight>Music App © 2022 By Chen Huei Jan</CopyRight>
            </MainBody>
            { showPlayBar && <PlayBar /> }
        </Layout>
    )
}
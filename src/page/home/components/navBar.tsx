import { Menu } from "antd";
import { UserOutlined, FolderAddOutlined } from '@ant-design/icons';
import { SideBar } from "../layouts";
import React from "react";
import { useNavigate } from "react-router-dom";


export default function NavBar({showMobileNav}: {showMobileNav: boolean}){
    const iconStyle = {fontSize: "18px", fontWeight: 600 };
    const navigate = useNavigate();

    return(
        <SideBar showMobileNav={showMobileNav}> 
            <Menu theme="dark" mode="inline" onClick={(e) => navigate(`/master/${e.key}`)}>
                <Menu.Item key="myPlayLists" icon={<UserOutlined style={iconStyle}/>}>
                    我的播放清單
                </Menu.Item>
                <Menu.Item key="buildMyPlayList" icon={<FolderAddOutlined style={iconStyle}/>}>
                    建立播放清單
                </Menu.Item>
            </Menu>
        </SideBar>
    )
}
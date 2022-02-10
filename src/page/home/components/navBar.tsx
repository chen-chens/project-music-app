import { Button, Menu } from "antd";
import { UserOutlined, FolderAddOutlined } from '@ant-design/icons';
import { SideBar } from "../layouts";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { currentUserActions, currentUserData } from "../../../reduxToolkit";
import { icon_style } from "../../../common/style";
import React from "react";

interface NavBarProps {
    showMobileNav: boolean;
    setShowMobileNav: (value: React.SetStateAction<boolean>) => void;
}

export default function NavBar(props: NavBarProps){
    const BUILD_PLAYLIST = "buildMyPlayList";
    const LOG_OUT = "logOut";

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userPlayLists = useSelector(currentUserData.userPlayLists);

    const handleMenuClick = (key: string) => {
        switch (key) {
            case BUILD_PLAYLIST:
                const newPlayList = {
                    id: `${userPlayLists.length+1}`, 
                    name: `我的播放清單 #${userPlayLists.length+1}`,
                    playList:[]
                };
                dispatch(currentUserActions.createUserPlayList(newPlayList));
            break;
        
            default:
                navigate(`/master/myPlayLists/${key}`);
                props.setShowMobileNav(!props.showMobileNav);
            break;
        }
    }

    const handleLogOut = () => {
        navigate("/");
        dispatch(currentUserActions.logout);
    }

    return(
        <SideBar showMobileNav={props.showMobileNav}> 
            <Menu theme="dark" mode="inline" defaultValue={BUILD_PLAYLIST} onClick={(e) => handleMenuClick(e.key)}>
                <Menu.Item key={BUILD_PLAYLIST} icon={<FolderAddOutlined style={icon_style}/>}>
                    建立播放清單
                </Menu.Item>
                {   userPlayLists.map(menu => (
                    <Menu.Item key={menu.id} icon={<UserOutlined style={icon_style}/>}>
                        {menu.name}
                    </Menu.Item>
                ))}
                <Button type="primary" className="mobileLogOut" onClick={handleLogOut}>
                    登出
                </Button>
            </Menu>        
        </SideBar>
    )
}
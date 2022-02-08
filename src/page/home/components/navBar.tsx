import { Menu } from "antd";
import { UserOutlined, FolderAddOutlined } from '@ant-design/icons';
import { SideBar } from "../layouts";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { currentUserActions, currentUserData } from "../../../reduxToolkit";


export default function NavBar({showMobileNav}: {showMobileNav: boolean}){
    const BUILD_PLAYLIST = "buildMyPlayList";
    const iconStyle = {fontSize: "18px", fontWeight: 600 };
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userPlayLists = useSelector(currentUserData.userPlayLists);

    const handleMenuClick = (key: string) => {
        if(key === BUILD_PLAYLIST){
            const newPlayList = {
                id: `${userPlayLists.length+1}`, 
                name: `我的播放清單 #${userPlayLists.length+1}`,
                playList:[]
            };
            dispatch(currentUserActions.createUserData(newPlayList));
        }else{
            navigate(`/master/myPlayLists/${key}`);
        }
    }

    return(
        <SideBar showMobileNav={showMobileNav}> 
            <Menu theme="dark" mode="inline" onClick={(e) => handleMenuClick(e.key)}>
                <Menu.Item key={BUILD_PLAYLIST} icon={<FolderAddOutlined style={iconStyle}/>}>
                    建立播放清單
                </Menu.Item>
                {   userPlayLists.map(menu => (
                    <Menu.Item key={menu.id} icon={<UserOutlined style={iconStyle}/>}>
                        {menu.name}
                    </Menu.Item>
                ))}
            </Menu>
        </SideBar>
    )
}
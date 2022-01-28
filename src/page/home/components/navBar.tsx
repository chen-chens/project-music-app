import { Menu } from "antd";
import { UserOutlined, LikeOutlined, FolderAddOutlined } from '@ant-design/icons';
import { SideBar } from "../layouts";


export default function NavBar({showMobileNav}: {showMobileNav: boolean}){
    const iconStyle = {fontSize: "18px", fontWeight: 600 };

    return(
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
    )
}
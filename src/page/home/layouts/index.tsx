import styled from "styled-components";
import '../../../App.css';


export const Layout = styled.section`
    display: flex;
    flex-wrap: wrap;
    position: relative;
`;

export const TopHeader = styled.header`
    width: 100%;
    height: 60px;
    position: fixed;
    z-index: 2;
    padding: 10px;
    background-color: var(--dark-theme);
    box-shadow: 0px 3px 3px var(--shadow-300);
    display: flex;
    justify-content: space-between;
`;


interface SideBarProps{
    readonly showMobileNav: boolean;
}
export const SideBar = styled.aside<SideBarProps>`
    position: fixed; 
    z-index: 1;
    top:0;
    left: 0;
    width: ${props => props.showMobileNav ? "100%" : 0}; 
    height: ${props => props.showMobileNav ? "100vh" : "auto"}; 
    background-color: var(--dark-theme);
    transition: .2s all;

    ::before{
        content: "";
        display: block;
        margin-top: 60px;
    }
    .ant-menu-dark.ant-menu-dark:not(.ant-menu-horizontal) .ant-menu-item-selected{
        background-color: var(--primary-color);
    }
    .ant-menu.ant-menu-root.ant-menu-inline.ant-menu-dark{
        display: ${props => props.showMobileNav ? "block" : "none"}; 
        transition: .5s all;
        height: auto;
        background-color: var(--dark-theme);
    }
    .ant-menu-title-content{
        font-size: calc(var(--font-size-base) * 0.9);
        color: var(--gray-100);
    }

    /* Medium */
    @media(min-width: 768px) {
        position: relative; 
        width: 200px;

        .ant-menu.ant-menu-root.ant-menu-inline.ant-menu-dark{
            display: block; 
        }
        .ant-menu-item:last-child{
            display: none;
        }
    }
`;


export const MainBody = styled.section`
    width: 100%; 
    min-height: calc(100vh - 60px);
    padding: 20px 20px 0 20px;
    margin-top: 60px;
    position: relative;
    transition: 0.2s all;
    background-color: var(--light-theme);

    /* Medium */
    @media(min-width: 768px) {
        width: calc(100% - 200px);
    }

`;

export const DetailList = styled.main`
    display: flex;
    flex-wrap: wrap;
`;


export const CopyRight = styled.footer`
    margin-top: 15px;
    line-height: 80px;
    text-align: center;
    border-top: 1px solid var(--shadow-200);
    color: var(--gray-600);
`;

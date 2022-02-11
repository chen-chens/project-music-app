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
    background-color: var(--gray-800);
    border-bottom: 1px solid var(--shadow-200);
    display: flex;
    justify-content: space-between;

    .ant-typography.logo{
        height: 40px;
        color: ${props => props.theme.logoColor};
        cursor: pointer;
        font-family: 'Permanent Marker', cursive, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
        'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
        'Noto Color Emoji';
        margin: 0px 20px;
    }

    /* Mobile menu */
    .menuBtn{
        height: 60px;
        width: 60px;
        position: fixed;
        top: 0;
        right: 0;
        font-size: 1.5rem;
        font-weight: 600;
        border-radius: 0;
    }

    @media(min-width: 768px){
        .menuBtn{
            display: none;
        }
    }

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
    background-color: ${props => props.theme.navBground};
    border-right: 1px solid var(--shadow-200);
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
        background-color: transparent;
    }
    .ant-menu-item .anticon.ant-menu-item-icon{
        color: ${props => props.theme.color};
    }
    .ant-menu-title-content{
        font-size: calc(var(--font-size-base) * 0.9);
        color: ${props => props.theme.color};
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
    background-color: ${props => props.theme.background};

    .ant-switch{
        position: absolute;
        right: 35px;
        z-index: 2;
    }
    .ant-switch.ant-switch-checked{
        background-color: var(--primary-color);
    }

    /* Medium */
    @media(min-width: 768px) {
        width: calc(100% - 200px);
    }

`;

export const DetailList = styled.main`
    display: flex;
    flex-wrap: wrap;

    .ant-card.ant-card-bordered.ant-card-hoverable{
        position: relative;
        width: calc(100% - 30px);
        margin: 15px;
    }
    .ant-card.ant-card-bordered.ant-card-hoverable::before{
        content: '';
        display: block;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        border: 2px solid var(--secondary-color);
        background-color: var(--primary-color);
        position: absolute;
        bottom: 20%;
        right: 20px;
        color: var(--success-color);
    }
    .ant-card.ant-card-bordered.ant-card-hoverable::after{
        content: '';
        display: block;
        position: absolute;
        bottom: calc(20% + 17px);
        right: calc(20px + 17px);
        border-top: 12px solid transparent;
        border-bottom: 12px solid transparent;
        border-right: 0;
        border-left: 20px solid #ffffff;
    }

    @media(min-width: 576px){
        .ant-card.ant-card-bordered.ant-card-hoverable{
            width: calc(50% - 30px);
        }
    }

    @media(min-width: 768px){

        .ant-card.ant-card-bordered.ant-card-hoverable{
            width: calc(33.333333% - 30px);
        }
        .ant-card.ant-card-bordered.ant-card-hoverable::before{
            width: 0px;
            height: 0px;    
            transition: linear .2s;
        }
        .ant-card.ant-card-bordered.ant-card-hoverable:hover::before{
            width: 60px;
            height: 60px;
        }
        .ant-card.ant-card-bordered.ant-card-hoverable::after{
            border: none;
            transition: linear .2s;
        }
        .ant-card.ant-card-bordered.ant-card-hoverable:hover::after{
            border-top: 12px solid transparent;
            border-bottom: 12px solid transparent;
            border-right: 0;
            border-left: 20px solid #ffffff;
        }

    }

    @media(min-width: 1200px){
        .ant-card.ant-card-bordered.ant-card-hoverable{
            width: calc(25% - 30px);
        }

    }

    @media(min-width: 1600px){
        .ant-card.ant-card-bordered.ant-card-hoverable{
            width: calc(20% - 30px);
        }

    }

`;


export const CopyRight = styled.footer`
    margin-top: 15px;
    line-height: 80px;
    text-align: center;
    border-top: 1px solid var(--shadow-200);
    color: var(--gray-600);
`;

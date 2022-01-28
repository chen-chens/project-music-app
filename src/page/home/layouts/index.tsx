import { Button, Typography } from "antd";
import { MenuOutlined } from '@ant-design/icons';
import React from "react";
import styled from "styled-components";


export const Outline = styled.section`
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
    background-color: #313a46;
    box-shadow: 0px 3px 3px #313a4663;
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
    background-color: #313a46;
    transition: .2s all;

    ::before{
        content: "";
        display: block;
        margin-top: 60px;
    }

    .ant-menu.ant-menu-root.ant-menu-inline.ant-menu-dark{
        display: ${props => props.showMobileNav ? "block" : "none"}; 
        transition: .5s all;
        height: auto;
    }

    /* Medium */
    @media(min-width: 768px) {
        position: relative; 
        width: 200px;

        .ant-menu.ant-menu-root.ant-menu-inline.ant-menu-dark{
            display: block; 
        }
    }
`;


export const MainBody = styled.section`
    width: "100%"; 
    min-height: calc(100vh - 120px);
    padding: 20px 20px 0 20px;
    margin-top: 60px;
    position: relative;
    transition: 0.2s all;
    background-color: #fafbfe;

    /* Medium */
    @media(min-width: 768px) {
        width: calc(100% - 200px);
    }

`;

export const DetailList = styled.main`
    min-height: calc(100vh - 120px);
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
`;


export const CopyRight = styled.footer`
    margin-top: 15px;
    line-height: 80px;
    text-align: center;
    border-top: 1px solid #98a6ad33;
    color: #98a6ad;
`;

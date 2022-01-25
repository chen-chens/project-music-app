import styled from "styled-components";


export const Outline = styled.section`
    display: flex;
    flex-wrap: wrap;
    flex: 0 0 200px;   
    position: relative;

`;

export const TopHeader = styled.header`
    width: 100%;
    height: 60px;
    position: fixed;
    z-index: 1;
    padding: 10px;
    background-color: #313a46;
    box-shadow: 0px 3px 3px #313a4663;
`;

export const MainBody = styled.section`
    width: 100%;
    margin-top: 60px;
    position: relative;
    transition: 0.2s all;
    background-color: #fafbfe;

    /* Medium */
    @media(min-width: 768px) {
        width: calc(100% - 200px);
    }

`;

export const SideBar = styled.aside`
    position: relative;
    top: 0;
    left: 0;
    width: 0;
    background-color: #313a46;
    transition: 0.2s all;

    ::before{
        content: "";
        display: block;
        margin-top: 60px;
    }

    /* Medium */
    @media(min-width: 768px) {
        width: 200px;
    }
`;

export const Details = styled.main`
    padding: "20px 15px";
    padding: 20px;
    min-height: calc(100vh - 120px);
`;

export const CopyRight = styled.footer`
    height: 60px;
    padding: 20px;
    text-align: center;
    border-top: 1px solid #98a6ad33;
    color: #98a6ad;
`;

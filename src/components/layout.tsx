import styled from "styled-components";



export const MainLayout = styled.section`
    padding: "20px 15px";
    background-color: "pink";
    margin: auto;
    display: flex;
    flex-direction: column;

    .container{
        /* Medium */
        @media(min-width: 768px) {
            max-width: 600px;
            background: #87af99;
            color: papayawhip;
            flex-direction: row;
        }
    
        /* Large */
        @media(min-width: 1400px) {
            max-width: 1200px;
            background: #808fbe;
            color: papayawhip;
        }

    }
`;

export const Content = styled.main`
    padding: "20px 15px";
    background-color: "pink";
`;

export const SideBar = styled.aside`
    width: 250px;
    background: #070f27;
    color: #fff;
    padding: 20px;

`;

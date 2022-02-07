import React from "react";
import BuildMyPlayList from "../page/buildMyPlayList";
import Home from "../page/home";
import Recommendation from "../page/home/components/recommendation";
import LogIn from "../page/logIn";
import MyPlayLists from "../page/myPlayLists";
import { RoutesType } from "../type/routesType";


export const routes: RoutesType[] = [
    {
        path: "/",
        element: <LogIn />,
    },
    {
        path: "logIn",
        element: <LogIn />,
    },
    {
        path: "master/*",
        element: <Home />,
        children: [
            {
                path: "",
                element: <Recommendation />,
            },
            {
                path: "buildMyPlayList",
                element: <BuildMyPlayList />,
            },
            {
                path: "myPlayLists",
                element: <MyPlayLists />,
            },
            {
                path: "buildMyPlayList",
                element: <BuildMyPlayList />,
            },
        ]
    },
];
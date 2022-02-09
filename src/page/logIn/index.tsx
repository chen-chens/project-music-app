import { Card, Row, Typography } from "antd";
import React from "react";
import LoginForm from "./loginForm";


export default function LogIn(){


    return(
        <Row 
            justify="center"
            align="middle" 
            style={{height: '100vh', flexDirection:'column'}}
        >
            <Card 
                className="logInCard"
                title={<Typography.Title level={1} style={{textAlign: "center", color: "#727cf5"}} className="logo">Music App</Typography.Title>} 
                bordered 
            >
                <LoginForm />
            </Card>     
        </Row>
    )
}
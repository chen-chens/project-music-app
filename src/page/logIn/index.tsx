import { Card, Row, Typography } from "antd";
import React from "react";
import LoginForm from "./loginForm";


export default function LogIn(){


    return(
        <Row 
            justify="center"
            align="middle" 
            style={{height: '100vh', flexDirection:'column',}}
        >
            <Card 
                className="logInCard"
                title={<Typography.Title level={3} style={{textAlign: "center"}}>Welcom to Music App</Typography.Title>} 
                bordered 
                // style={{ width: 400, boxShadow: '0 0 10px #adadad4c' }}
            >
                <LoginForm />
            </Card>     
        </Row>
    )
}
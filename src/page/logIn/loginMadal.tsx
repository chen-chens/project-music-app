import { Modal, Typography } from "antd";
import React from "react";
import LoginForm from "./loginForm";

export default function LoginModal({expired}: {expired: boolean}){


    return(
        <Modal
            zIndex={5000} 
            title={<Typography.Title level={1} style={{textAlign: "center", color: "#727cf5"}} className="logo">Music App</Typography.Title>} 
            visible={expired} 
            closable={false}
            footer={null}
        >
            <LoginForm />
        </Modal>
    )
}
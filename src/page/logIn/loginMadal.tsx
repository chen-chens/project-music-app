import { Modal } from "antd";
import React from "react";
import LoginForm from "./loginForm";

export default function LoginModal({expired}: {expired: boolean}){


    return(
        <Modal
            zIndex={5000} 
            title="Welcome to Music App" 
            visible={expired} 
            closable={false}
            footer={null}
        >
            <LoginForm />
        </Modal>
    )
}
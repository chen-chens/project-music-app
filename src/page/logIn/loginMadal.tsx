import { Modal } from "antd";
import React from "react";
import AlertNotification from '../../components/alertNotifacation';
import LoginForm from "./loginForm";

export default function LoginModal(){


    return(
        <Modal
            zIndex={5000} 
            title="Welcome to Music App" 
            // visible={props.isModalVisible} 
            closable={false}
            footer={null}
        >
            <LoginForm />
        </Modal>
    )
}
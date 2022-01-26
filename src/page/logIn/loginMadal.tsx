import { Modal } from "antd";
import React from "react";
import AlertNotification from '../../components/alertNotifacation';
import LoginForm from "./loginForm";

export default function LoginModal(){

       // form 資料驗證成功
       const onFinish = (values: any) => {
       console.log("🚀 ~ log value valid", values);

        const request = {
            userName: values.username,
            password: values.password,
        };

        // call login request
        // ApiLogin(request)
        // .then(res => {
            
        //     dispatch(currentUserActions.updateUserToken(res.data.token));
        //     getCurrentUserData(res.data.token);

        //     //增加延遲，使login modal不要跳出
        //     // setTimeout(() =>history.push('/master/index'),100)

        // })
        // .catch(err => {
        //     console.log("loginPage err:", err);

        //     AlertNotification({
        //         type :"error", 
        //         title: "登入失敗", 
        //         description: "請重新確認！"
        //     });
        // });
        
    };

    // form 資料驗證失敗
    const onFinishFailed = (errorInfo: any) => {
        console.log("帳號密碼沒填", errorInfo);
        
        AlertNotification({
            type :"error",
            title: "帳號密碼為必填項目"
        });
    };

    return(
        <Modal
            zIndex={5000} 
            title="Welcome to Music App" 
            // visible={props.isModalVisible} 
            closable={false}
            footer={null}
        >
            <LoginForm onFinishFailed={onFinishFailed} onFinish={onFinish}/>
        </Modal>
    )
}
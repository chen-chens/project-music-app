import {Form,Input,Button} from 'antd';
import { UserOutlined, LockOutlined, GoogleOutlined } from '@ant-design/icons';
import AlertNotification from '../../components/alertNotifacation';
import axios from 'axios';
import {Buffer} from 'buffer';
import { useDispatch } from 'react-redux';
import { currentUserActions } from '../../reduxToolkit';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

const LoginForm = () =>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation('logInPage');
    const { t: globalT } = useTranslation('global');
    const config = [{ required: true, message: globalT('requiredField') }];


    // form 資料驗證成功
    const onFinish = () => {
        const client_id = 'd2a09310d88449df94972cd08f3a96ec'; // Your client id
        const client_secret = 'e09ce6492cad46bd8a8414d9bbd28e30'; // Your secret

        axios('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers : { 
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + Buffer.from(`${client_id}:${client_secret}`).toString('base64')
            },  
            data: 'grant_type=client_credentials',
        }).then(res => {
            console.log("res: ", res.data.access_token);
            dispatch(currentUserActions.getToken(res.data.access_token));
            dispatch(currentUserActions.userExpired(false));
            navigate("/master");
        }).catch(err => {
            console.log("clientCredentials err: ", err);

            AlertNotification({
                type: "error",
                title: t('connectionFail')
            })
        })
    }
     
    // form 資料驗證失敗
    const onFinishFailed = (errorInfo: any) => {
        console.log(errorInfo);
        
        AlertNotification({
            type :"error",
            title: t('requiredFields')
        });
    };

    const handleGoogleLogIn = () => {
        console.log("Log In By Google!")
    }
    
    return(
        <Form         
            name={"Music App"}
            onFinishFailed={onFinishFailed}
            onFinish={onFinish}
            initialValues={{username: "user", password: "password" }}
        >
            <Form.Item name="username" rules={config}>
                <Input 
                    prefix={<UserOutlined />} 
                    placeholder={t('account')}
                />            
            </Form.Item>

            <Form.Item name="password" rules={config}>
                <Input
                    prefix={<LockOutlined />}
                    type="password"
                    placeholder={t('password')}
                />            
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" style={{ width:'100%'}}>
                    {t('logIn')}
                </Button>
            </Form.Item>

            <Button style={{ width:'100%'}} icon={<GoogleOutlined />} onClick={handleGoogleLogIn}>
                {t('logInByGoogle')}
            </Button>
        </Form>
    )
}

export default LoginForm;
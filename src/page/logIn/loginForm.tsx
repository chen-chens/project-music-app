import {Form,Input,Button} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import AlertNotification from '../../components/alertNotifacation';
import axios from 'axios';
import {Buffer} from 'buffer';
import { useDispatch } from 'react-redux';
import { currentUserActions } from '../../reduxToolkit';
import { useNavigate } from 'react-router';

const LoginForm = () =>{
    const config = [{ required: true, message: '必填欄位' }];
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
                title: "無法連線 Spotify！"
            })
        })
    }
     
    // form 資料驗證失敗
    const onFinishFailed = (errorInfo: any) => {
        console.log("帳號密碼沒填", errorInfo);
        
        AlertNotification({
            type :"error",
            title: "帳號密碼為必填項目"
        });
    };
    
    return(
        <Form         
            name={"Music App Log In"}
            onFinishFailed={onFinishFailed}
            onFinish={onFinish}
            initialValues={{username: "user", password: "password" }}
        >
            <Form.Item name="username" rules={config}>
                <Input 
                    prefix={<UserOutlined />} 
                    placeholder="帳號" 
                />            
            </Form.Item>

            <Form.Item name="password" rules={config}>
                <Input
                    prefix={<LockOutlined />}
                    type="password"
                    placeholder="密碼"
                />            
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" style={{ width:'100%'}}>
                    登入
                </Button>
            </Form.Item>
        </Form>
    )
}

export default LoginForm;
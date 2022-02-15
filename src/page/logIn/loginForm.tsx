import {Form,Input,Button} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import AlertNotification from '../../components/alertNotifacation';

const LoginForm = () =>{
    const config = [{ required: true, message: '必填欄位' }];

    function generateRandomString(length: number) {
        var text = '';
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    };


    // form 資料驗證成功
    const onFinish = (values: {username: string, password: string}) => {
        const client_id = 'd2a09310d88449df94972cd08f3a96ec'; // Your client id
        // const redirect_uri = 'http://localhost:3000/project-music-app/master'; // Your redirect uri
        const redirect_uri = 'https://chen-chens.github.io/project-music-app/master'; // Your redirect uri

        const stateKey = 'spotify_auth_state';
        const state = generateRandomString(16);

        localStorage.setItem(stateKey, state); 
        const scope = 'user-read-private user-read-email';

        let url = 'https://accounts.spotify.com/authorize';
        url += '?response_type=token';
        url += '&client_id=' + encodeURIComponent(client_id);
        url += '&scope=' + encodeURIComponent(scope);
        url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
        url += '&state=' + encodeURIComponent(state);

        window.location.href = url; // status code: 302 (重新導向，要求的資源暫時存於不同的 URI 底下，用戶端瀏覽器必須採取更多動作才能完成要求。)
        
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
        <Form         
            name={"Music App Log In"}
            onFinishFailed={onFinishFailed}
            onFinish={onFinish}
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
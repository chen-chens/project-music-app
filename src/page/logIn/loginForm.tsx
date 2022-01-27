import {Form,Input,Button} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import AlertNotification from '../../components/alertNotifacation';
import { useNavigate } from 'react-router-dom';

const LoginForm = () =>{
    const navigate = useNavigate();
    const config = [{ required: true, message: '必填欄位' }];
           // form 資料驗證成功
           const onFinish = (values: {username: string, password: string}) => {
            console.log("🚀 ~ log in valid", values);
            navigate("./home");
     
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
                <Button 
                    type="primary" 
                    htmlType="submit"
                    style={{ width:'100%' }}
                >
                    登入
                </Button>
            </Form.Item>
        </Form>
    )
}

export default LoginForm;
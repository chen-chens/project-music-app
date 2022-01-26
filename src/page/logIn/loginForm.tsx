import {Form,Input,Button,FormProps} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

export interface LoginFormProps extends FormProps<any>{
    onFinishFailed: (values: any)=>void
    onFinish: (errorInfo: any)=>void
}

const LoginForm = (props:LoginFormProps) =>{
    
    const config = [
        {
         required: true, 
         message: '必填欄位' 
        }
    ];
    
    return(
        <Form         
            name={props.name}
            onFinishFailed={props.onFinishFailed}
            onFinish={props.onFinish}
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
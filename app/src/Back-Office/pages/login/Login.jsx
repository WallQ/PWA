import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { useState } from 'react'
import { Navigate } from 'react-router'
import "antd/dist/antd.css";
import './Login.css';

    
const Login = () => {
    const [loginSucess, setLoginSucess] = useState(false);
    const onSubmit = data => login(data)

    const login = (values) => {
        console.log('Form Values:', values);
        fetch('/auth/sign-in', {
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
            body: JSON.stringify(values)
        })
        .then(r => r.json())
        .then((response)=>{
            console.log(response);
            if(response.auth){
                setLoginSucess(true);
                console.log("Loged")
            }else{
                alert("Login Errado");
            }
        })
        .catch((error)=>{
            console.error('Error:',error);
        })
    }

    
    const onFinish = (values) => {
        console.log('Success:', values);
      };
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    if(loginSucess){
        return <Navigate to='dashboard'/>
    }


    return (
        <div className='frame'>
        <Form name="basic"
                labelCol={{span: 8,}}
                wrapperCol={{span: 16,}}
                initialValues={{remember: true,}}
                onFinish={login}
                onFinishFailed={onFinishFailed}
                autoComplete="off">

            <Form.Item
                label="Username"
                name="email"
                rules={[
                {
                    required: true,
                    message: 'Please input your username!',
                },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                {
                    required: true,
                    message: 'Please input your password!',
                },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                offset: 8,
                span: 16,
                }}
            >
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item
                wrapperCol={{
                offset: 8,
                span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                Submit
                </Button>
            </Form.Item>

        </Form>
        </div>
    
    );
}

export default Login;

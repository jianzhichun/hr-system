import './Login.scss';
import { Modal, Checkbox, Input, Button, Form } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { POST } from "../../string";

export default function Login() {

    /**
     * login
     */
    function login({ password, email }) {
        axios({
            method: POST,
            url: '/api/employee/login',
            data: {
                email: email,
                password: password
            }
        }).then(({ data: { code, message } }) => {
            if (!code) {
                Modal.error({ content: message });
            } else {
                window.location.hash = '/app/';
            }
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <div className={'login'}>
            <div className={'form'}>
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={login}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { type: 'email' },
                            {
                                required: true,
                                message: 'Please input your email!',
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
                            Login
                        </Button>
                        &nbsp; &nbsp;
                        <Link to='/sign-up'>Register</Link>
                    </Form.Item>

                </Form>
            </div>
        </div>
    );
}

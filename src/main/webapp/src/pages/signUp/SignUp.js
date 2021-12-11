import './SignUp.scss';
import { Modal, Form, Space, Input, Button } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { POST } from "../../string";

export default function SignUp() {

    /**
     * login
     */
    function signUp({ password, email, passwordVerify }) {
        debugger
        if (password !== passwordVerify) {
            Modal.error({ content: 'Password don\'t match.' });
        }

        axios({
            method: POST,
            url: '/api/employee/register',
            data: {
                email: email,
                password: password
            }
        }).then(({ data: { code, message } }) => {
            if (!code) {
                Modal.error({ content: message });
            } else {
                window.location.hash = '/login/';
            }
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <div className={'sign-up'}>
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
                    onFinish={signUp}
                    autoComplete="off"
                >
                    <div className={'title'}>Register</div>
                    <Space direction={'vertical'}>
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
                        ><Input />
                        </Form.Item>
                        <Form.Item label="Password"
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
                        <Form.Item label="Verify Password"
                            name="passwordVerify"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                    </Space>
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Register
                        </Button>
                    </Form.Item>

                </Form>
            </div>

            <div className={'more'}>
                Already got an account, <Link to={'/login'}>login</Link>.
            </div>
        </div>
    );
}

import './Login.scss';
import { Modal, Checkbox, Input, Button, Form } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { POST } from "../../util/string";

export default function Login(props) {

    /**
     * login
     */
    function login({ password, email }) {
        axios({
            method: POST,
            url: '/api/account/login',
            data: {
                email: email,
                password: password
            }
        }).then(({ data: { code, message } }) => {
            if (code !== 0) {
                Modal.error({ content: message });
            } else {
                props.loadUser();
                window.location.hash = '/app/';
            }
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <div className={'login'}>
            <div className={'form'}>
                <div className={'bold font-16 m-b-10'}>Login</div>
                <Form
                    name="basic"
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    initialValues={{remember: true}}
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
                        <Link to='/sign-up' className={'m-l-20'}>Register</Link>
                    </Form.Item>

                </Form>
            </div>
        </div>
    );
}

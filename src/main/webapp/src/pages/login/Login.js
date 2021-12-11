import './Login.scss';
import {Space, Input, Button, Form} from "antd";
import {Link} from "react-router-dom";
import $ from 'jquery';
import axios from "axios";
import {BASE, POST} from "../../string";

export default function Login() {

    /**
     * login
     */
    function login() {
        let email = $('#email');
        let password = $('#password');

        axios({
            method: POST,
            url: BASE + '',
            data: {
                email: email,
                password: password
            }
        }).then(response => {
            // todo
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <div className={'login'}>
            <div className={'form'}>
                <div className={'title'}>登录</div>
                <Form labelCol={{span: 4}} wrapperCol={{span: 16}}>
                    <Form.Item label={'邮箱'}>
                        <Input placeholder={'输入邮箱'} id={'email'}/>
                    </Form.Item>
                    <Form.Item label={'密码'}>
                        <Input.Password placeholder={'请输入密码'} id={'password'}/>
                    </Form.Item>
                    <Form.Item wrapperCol={{offset: 4, span: 16}}>
                        <Button onClick={login} type={'primary'}>
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>

            <div className={'more'}>
                没有账号? 去<Link to={'/sign-up'}>注册</Link>.
            </div>
        </div>
    );
}

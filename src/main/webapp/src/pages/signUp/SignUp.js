import './SignUp.scss';
import {Space, Input, Button} from "antd";
import {Link} from "react-router-dom";
import $ from "jquery";
import axios from "axios";
import {BASE, POST} from "../../string";

export default function SignUp() {

    /**
     * login
     */
    function signUp() {
        let email = $('#email');
        let password = $('#password');
        let passwordVerify = $('#password-verify');

        axios({
            method: POST,
            url: BASE + '',
            data: {
                email: email,
                password: password,
                passwordVerify: passwordVerify
            }
        }).then(response => {
            //todo
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <div className={'sign-up'}>
            <div className={'form'}>
                <div className={'title'}>注册</div>
                <Space direction={'vertical'}>
                    <Input placeholder={'输入邮箱'} id={'email'}/>
                    <Input.Password placeholder={'请输入密码'} id={'password'}/>
                    <Input.Password placeholder={'再次请输入密码'} id={'password-verify'}/>
                </Space>
                <Button type={'primary'} className={'action-button'} onClick={signUp}>注册</Button>
            </div>

            <div className={'more'}>
                已经有账号? 去<Link to={'/login'}>登录</Link>.
            </div>
        </div>
    );
}

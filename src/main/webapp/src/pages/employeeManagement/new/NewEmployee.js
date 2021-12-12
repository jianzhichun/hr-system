import {Button, DatePicker, Form, Input, message} from "antd";
import TextArea from "antd/es/input/TextArea";
import Radio from "antd/es/radio/radio";
import axios from "axios";
import {POST} from "../../../util/string";


export default function NewEmployee() {

    function addEmployee(data) {
        console.log(data);
        axios({
            method: POST,
            url: '/api/employee/add',
            data: data
        }).then(response => {
            let code = response.data.code;
            if (code === 0) {
                message.success('Success!');
            } else if (code === 503) {
                message.error('This email has been taken');
            } else {
                console.log(response);
            }
        }).catch(e => {
            console.log(e);
        });
    }

    return (
        <div style={{backgroundColor: '#fff', padding: 24}}>
            <div className={'bold font-16 m-b-20'}>Add New Employee</div>
            <Form labelCol={{span: 4}}
                  wrapperCol={{span: 16}}
                  onFinish={addEmployee}>
                <Form.Item label={"Name"} name={'name'}
                           rules={[
                               {
                                   required: true,
                                   message: 'Please input name',
                               },
                           ]}>
                    <Input/>
                </Form.Item>
                <Form.Item label={'Email'} name={'email'} rules={[
                    { type: 'email' },
                    {
                        required: true,
                        message: 'Please input email',
                    },
                ]}>
                    <Input/>
                </Form.Item>
                <Form.Item label={"Enroll Date"} name={'enrol'} rules={[
                    {
                        required: true,
                        message: 'Please input enrol time',
                    },
                ]}>
                    <DatePicker placeholder={'Select'}/>
                </Form.Item>
                <Form.Item label={"Contact"} name={'contact'} rules={[
                    {
                        required: true,
                        message: 'Please input contact information',
                    },
                ]}>
                    <Input placeholder={'Phone number'}/>
                </Form.Item>
                <Form.Item label={"Address"} name={'address'} rules={[
                    {
                        required: true,
                        message: 'Please input address!',
                    },
                ]}>
                    <TextArea showCount maxLength={140}/>
                </Form.Item>
                <Form.Item label={'Gender'} name={'gender'} rules={[
                    {
                        required: true,
                        message: 'Please input gender',
                    },
                ]}>
                    <Radio.Group>
                        <Radio value={'F'}>Female</Radio>
                        <Radio value={'M'}>Male</Radio>
                        <Radio value={'O'}>Other</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item wrapperCol={{offset: 4, span: 16}}>
                    <Button type={'primary'} htmlType="submit">
                        Add
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

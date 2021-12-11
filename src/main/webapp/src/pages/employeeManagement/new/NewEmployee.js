import {Button, DatePicker, Form, Input} from "antd";
import TextArea from "antd/es/input/TextArea";
import Radio from "antd/es/radio/radio";

export default function NewEmployee() {
    return (
        <div style={{backgroundColor: '#fff', padding: 24}}>
            <div className={'bold font-16 m-b-10'}>添加新员工</div>
            <Form labelCol={{span: 4}} wrapperCol={{span: 16}}>
                <Form.Item label={"姓名"}>
                    <Input/>
                </Form.Item>
                <Form.Item label={'电子邮箱'}>
                    <Input/>
                </Form.Item>
                <Form.Item label={"出生日期"}>
                    <DatePicker placeholder={'请选择'}/>
                </Form.Item>
                <Form.Item label={"入职时间"}>
                    <DatePicker placeholder={'请选择'}/>
                </Form.Item>
                <Form.Item label={"联系方式"}>
                    <Input placeholder={'手机号码'}/>
                </Form.Item>
                <Form.Item label={"住址"}>
                    <TextArea showCount maxLength={140}/>
                </Form.Item>
                <Form.Item label={'性别'}>
                    <Radio.Group>
                        <Radio value={'F'}>女</Radio>
                        <Radio value={'M'}>男</Radio>
                        <Radio value={'O'}>其他</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item wrapperCol={{offset: 4, span: 16}}>
                    <Button type={'primary'}>
                        添加
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

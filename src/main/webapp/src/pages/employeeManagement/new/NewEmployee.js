import {Button, DatePicker, Form, Input} from "antd";
import TextArea from "antd/es/input/TextArea";
import Radio from "antd/es/radio/radio";

export default function NewEmployee() {
    return (
        <div style={{backgroundColor: '#fff', padding: 24}}>
            <div className={'bold font-16 m-b-20'}>Add New Employee</div>
            <Form labelCol={{span: 4}} wrapperCol={{span: 16}}>
                <Form.Item label={"Name"}>
                    <Input/>
                </Form.Item>
                <Form.Item label={'Email'}>
                    <Input/>
                </Form.Item>
                <Form.Item label={"Birthday"}>
                    <DatePicker placeholder={'Select'}/>
                </Form.Item>
                <Form.Item label={"Enroll Date"}>
                    <DatePicker placeholder={'Select'}/>
                </Form.Item>
                <Form.Item label={"Contact"}>
                    <Input placeholder={'Phone number'}/>
                </Form.Item>
                <Form.Item label={"Address"}>
                    <TextArea showCount maxLength={140}/>
                </Form.Item>
                <Form.Item label={'Gender'}>
                    <Radio.Group>
                        <Radio value={'F'}>Female</Radio>
                        <Radio value={'M'}>Male</Radio>
                        <Radio value={'O'}>Other</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item wrapperCol={{offset: 4, span: 16}}>
                    <Button type={'primary'}>
                        Add
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

import { Button, Form, Input, message } from "antd";
import axios from "axios";
import { POST } from "../../../util/string";

export default function NewEmployment() {

    function addEmployment(data) {
        console.log(data);
        axios({
            method: POST,
            url: '/api/employment/add',
            data: data
        }).then(response => {
            let code = response.data.code;
            if (code === 0) {
                message.success('Success!');
            } else {
                console.log(response);
            }
        }).catch(e => {
            console.log(e);
        });
    }



    return (
        <div style={{ backgroundColor: '#fff', padding: 24 }}>
            <div className={'bold font-16 m-b-20'}>Add New Employment</div>
            <Form labelCol={{ span: 4 }}
                wrapperCol={{ span: 16 }}
                onFinish={addEmployment}>
                <Form.Item label={"Resume URL"} name={'resumeUrl'} rules={[
                    {
                        required: true,
                        message: 'Please input resume url',
                    },
                ]}>
                    <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                    <Button type={'primary'} htmlType="submit">
                        Add
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

import {Button, DatePicker, Form, Input, message, Select, Spin} from "antd";
import TextArea from "antd/es/input/TextArea";
import Radio from "antd/es/radio/radio";
import axios from "axios";
import {GET, POST} from "../../../util/string";
import {useMemo, useRef, useState} from "react";
import debounce from 'lodash/debounce';



const DebounceSelect = ({ fetchOptions, debounceTimeout = 50, ...props }) => {
    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState([]);
    const fetchRef = useRef(0);
    const debounceFetcher = useMemo(() => {
        const loadOptions = (value) => {
            fetchRef.current += 1;
            const fetchId = fetchRef.current;
            setOptions([]);
            setFetching(true);
            fetchOptions(value).then((newOptions) => {
                if (fetchId !== fetchRef.current) {
                    // for fetch callback order
                    return;
                }

                setOptions(newOptions);
                setFetching(false);
            });
        };

        return debounce(loadOptions, debounceTimeout);
    }, [fetchOptions, debounceTimeout]);
    return (
        <Select
            showSearch
            filterOption={false}
            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Spin size="small" /> : null}
            {...props}
            options={options}
        />
    );
}


export default function NewAttendance() {

    const fetchEmployeesByEmail = (email) => {
        return axios({
            method: GET,
            url: `/api/employee/queryByEmail?email=${email}`
        }).then(({data: {code, message, data}}) => data.map(item => ({label: item.email, value: item.id})))
    };

    function addAttendance(data) {
        console.log(data);
        axios({
            method: POST,
            url: '/api/attendance/add',
            data: data
        }).then(response => {
            let code = response.data.code;
            if (code === 0) {
                message.success('Success!');
            } else {
                message.error(response.data.message);
                console.log(response);
            }
        }).catch(e => {
            console.log(e);
        });
    }

    return (
        <div style={{backgroundColor: '#fff', padding: 24}}>
            <div className={'bold font-16 m-b-20'}>Add Attendance</div>
            <Form labelCol={{span: 4}}
                  wrapperCol={{span: 16}}
                  onFinish={addAttendance}>
                <Form.Item label={"Employee Email"} name={'employeeId'}
                           rules={[
                               {
                                   required: true,
                                   message: 'Please input employee email',
                               },
                           ]}>
                    <DebounceSelect
                        placeholder="Select employees by email"
                        fetchOptions={fetchEmployeesByEmail}
                    />
                </Form.Item>

                <Form.Item label={"Start Date"} name={'start'} rules={[
                    {
                        required: true,
                        message: 'Please input start date',
                    },
                ]}>
                    <DatePicker placeholder={'Select'}/>
                </Form.Item>
                <Form.Item label={"End Date"} name={'end'} rules={[
                    {
                        required: true,
                        message: 'Please input end date',
                    },
                ]}>
                    <DatePicker placeholder={'Select'}/>
                </Form.Item>
                <Form.Item label={'Type'} name={'type'} rules={[
                    {
                        required: true,
                        message: 'Please input type',
                    },
                ]}>
                    <Radio.Group>
                        <Radio value={'L'}>Leave</Radio>
                        <Radio value={'E'}>Evection</Radio>
                        <Radio value={'O'}>Overtime</Radio>
                        <Radio value={'D'}>Deferred holidays</Radio>
                        <Radio value={'S'}>Shut down</Radio>
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

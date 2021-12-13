import { Button, DatePicker, Form, Input, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import Radio from "antd/es/radio/radio";
import axios from "axios";
import { GET, POST } from "../../../util/string";
import { useState, useRef, useMemo } from "react";
import { Select, Spin } from 'antd';
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


export default function NewEmployee() {
    const fetchDepartmentsByName = (departmentName) => {
        return axios({
            method: GET,
            url: `/api/department/queryByName?name=${departmentName}`
        }).then(({ data: { code, message, data } }) => data.map(item => ({ label: item.name, value: item.id })))
    }, fetchPositionsByName = (name) => {
        return axios({
            method: GET,
            url: `/api/position/queryByName?name=${name}`
        }).then(({ data: { code, message, data } }) => data.map(item => ({ label: `${item.name}(${item.level})`, value: item.id })))
    };

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
        <div style={{ backgroundColor: '#fff', padding: 24 }}>
            <div className={'bold font-16 m-b-20'}>Add New Employee</div>
            <Form labelCol={{ span: 4 }}
                wrapperCol={{ span: 16 }}
                onFinish={addEmployee}>
                <Form.Item label={"Name"} name={'name'}
                    rules={[
                        {
                            required: true,
                            message: 'Please input name',
                        },
                    ]}>
                    <Input />
                </Form.Item>
                <Form.Item label={'Email'} name={'email'} rules={[
                    { type: 'email' },
                    {
                        required: true,
                        message: 'Please input email',
                    },
                ]}>
                    <Input />
                </Form.Item>
                <Form.Item label={"Enroll Date"} name={'enrolTime'} rules={[
                    {
                        required: true,
                        message: 'Please input enrol time',
                    },
                ]}>
                    <DatePicker placeholder={'Select'} />
                </Form.Item>
                <Form.Item label={"Birthday"} name={'birthday'} rules={[
                    {
                        required: true,
                        message: 'Please input birthday',
                    },
                ]}>
                    <DatePicker placeholder={'Select'} />
                </Form.Item>
                <Form.Item label={"Contact"} name={'phoneNumber'} rules={[
                    {
                        required: true,
                        message: 'Please input contact information',
                    },
                ]}>
                    <Input placeholder={'Phone number'} />
                </Form.Item>
                <Form.Item label={"Address"} name={'address'} rules={[
                    {
                        required: true,
                        message: 'Please input address!',
                    },
                ]}>
                    <TextArea showCount maxLength={140} />
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
                <Form.Item label={"Department Name"} name={'departmentId'} rules={[
                    {
                        required: true,
                        message: 'Please input Department Name',
                    }
                ]}>
                    <DebounceSelect
                        placeholder="Select employees by email"
                        fetchOptions={fetchDepartmentsByName}
                    />
                </Form.Item>
                <Form.Item label={"Position Name"} name={'positionId'} rules={[
                    {
                        required: true,
                        message: 'Please input Position Name',
                    }
                ]}>
                    <DebounceSelect
                        placeholder="Select positions by name"
                        fetchOptions={fetchPositionsByName}
                    />
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

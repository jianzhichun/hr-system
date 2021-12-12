import { Button, InputNumber, Form, message } from "antd";
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

export default function NewSalary() {
    const fetchEmployeesByEmail = (email) => {
            return axios({
                method: GET,
                url: `/api/employee/queryByEmail?email=${email}`
            }).then(({data: {code, message, data}}) => data.map(item => ({label: item.email, value: item.id})))
        };

    function addSalary(data) {
        console.log(data);
        axios({
            method: POST,
            url: '/api/salary/add',
            data: {...data}
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
            <div className={'bold font-16 m-b-20'}>Add New Salary</div>
            <Form labelCol={{ span: 4 }}
                wrapperCol={{ span: 16 }}
                onFinish={addSalary}>
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
                <Form.Item label={"Amount"} name={'amount'} rules={[
                    {
                        required: true,
                        message: 'Please input amount',
                    },
                ]}>
                    <InputNumber
                        min="0"
                        step="0.000001"
                        stringMode
                        style={{ width: 200 }}
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

import { Button, Form, Input, InputNumber, message, DatePicker } from "antd";
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
            labelInValue
            filterOption={false}
            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Spin size="small" /> : null}
            {...props}
            options={options}
        />
    );
}

export default function NewJoboffer() {
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
    function addJoboffer(data) {
        console.log(data);
        axios({
            method: POST,
            url: '/api/joboffer/add',
            data: { ...data, status: 'publish', departmentId: data.department[0].value, positionId: data.position[0].value }
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
            <div className={'bold font-16 m-b-20'}>Add New Joboffer</div>
            <Form labelCol={{ span: 4 }}
                wrapperCol={{ span: 16 }}
                onFinish={addJoboffer}>
                <Form.Item label={"Title"} name={'title'} rules={[
                    {
                        required: true,
                        message: 'Please input title',
                    }
                ]}>
                    <Input />
                </Form.Item>
                <Form.Item label={"Number"} name={'number'} rules={[
                    {
                        required: true,
                        message: 'Please input number',
                    }
                ]}>
                    <InputNumber />
                </Form.Item>
                <Form.Item label={"Due Date"} name={'dueDate'} rules={[
                    {
                        required: true,
                        message: 'Please input Due Date',
                    }
                ]}>
                    <DatePicker placeholder={'Select'} />
                </Form.Item>
                <Form.Item label={"Department Name"} name={'department'} rules={[
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
                <Form.Item label={"Position Name"} name={'position'} rules={[
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

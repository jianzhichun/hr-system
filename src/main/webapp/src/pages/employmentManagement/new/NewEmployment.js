import { Button, Form, Input, message } from "antd";
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

export default function NewEmployment() {
    const fetchJobOffersByName = (jobName) => {
        return axios({
            method: GET,
            url: `/api/joboffer/queryByName?name=${jobName}`
        }).then(({data: {code, message, data}}) => data.map(item => ({label: item.name, value: item.id})))
    };

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
                <Form.Item label={"Job"} name={'jobOfferId'}
                    rules={[
                        {
                            required: true,
                            message: 'Please input job name',
                        },
                    ]}>
                    <DebounceSelect
                        placeholder="Select job offer by name"
                        fetchOptions={fetchJobOffersByName}
                    />
                </Form.Item>
                <Form.Item label={"Resume URL"} name={'resumeUrl'} rules={[
                    {
                        required: true,
                        message: 'Please input resume url',
                    },
                    { type: 'url', warningOnly: true }
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

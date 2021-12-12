import React, { useState, useRef, useMemo, useEffect } from 'react';
import { message, Table, Input, InputNumber, Popconfirm, Form, Typography } from 'antd';
import axios from "axios";
import {DELETE, GET, POST} from "../../../util/string";
import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce';

const DebounceSelect = ({ fetchOptions, firstOptions, debounceTimeout = 50, ...props }) => {
    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState(firstOptions);
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

export default function ManageAttendance() {

    const fetchJobOffersByName = (jobName) => {
        return axios({
            method: GET,
            url: `/api/joboffer/queryByName?name=${jobName}`
        }).then(({ data: { code, message, data } }) => data.map(item => ({ label: item.title, value: item.id })))
    };

    const EditableCell = ({
        editing,
        dataIndex,
        title,
        inputType,
        record,
        index,
        children,
        ...restProps
    }) => {
        let inputNode =  <Input />;
        if (dataIndex === 'attendanceId') {
            inputNode = <DebounceSelect
                placeholder="Select job offer by name"
                fetchOptions={fetchJobOffersByName}
                firstOptions={[{label: record.jobTitle, value: record.jobOfferId}]}
            />;
        }
        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item
                        name={dataIndex}
                        style={{
                            margin: 0,
                        }}
                        rules={[
                            {
                                required: true,
                                message: `Please Input ${title}!`,
                            },
                        ]}
                    >
                        {inputNode}
                    </Form.Item>
                ) : (
                    children
                )}
            </td>
        );
    };


    const [form] = Form.useForm();

    const [data, setData] = useState([]),
        [pagination, setPagination] = useState({
            current: 1,
            pageSize: 10,
        }),
        [editingKey, setEditingKey] = useState(''),
        fetch = (pagination) => {
            return axios({
                method: GET,
                url: `/api/attendance/page?page=${pagination.current}&size=${pagination.pageSize}`
            }).then(({ data: { code, message, data } }) => {
                if (code !== 0) {
                    message.error({ content: message })
                } else {
                    setData(data.list.map(item => {
                        return { ...item, key: item.id };
                    }));
                    setPagination({
                        current: data.pageNum,
                        pageSize: data.pageSize,
                        total: data.total
                    })
                }
            })
        };

    useEffect(() => {
        fetch(pagination)
    }, [])

    const isEditing = (record) => record.key === editingKey;

    const edit = (record) => {
        form.setFieldsValue({
            ...record,
        });
        setEditingKey(record.key);
    };

    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);

            if (index > -1) {
                const item = newData[index];
                axios({
                    method: POST,
                    url: `/api/attendance/update/${key}`,
                    data: row
                }).then(({ data: { code, message: msg } }) => {
                    if (code !== 0) {
                        message.error({ content: msg });
                    } else {
                        message.success({ content: "success" })
                        newData.splice(index, 1, { ...item, ...row });
                        setData(newData);
                        setEditingKey('');
                        fetch(pagination);
                    }
                })
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const columns = [
        {
            title: 'Employee Email',
            dataIndex: 'email',
            width: '20%'
        },
        {
            title: 'Start Time',
            dataIndex: 'start',
            width: '15%',
            editable: true,
        },
        {
            title: 'End Time',
            dataIndex: 'end',
            width: '15%',
            editable: true,

        },
        {
            title: 'Status',
            dataIndex: 'status',
            width: '10%',
            editable: true,
        },
        {
            title: 'Type',
            dataIndex: 'type',
            width: '10%',
            editable: true,
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link
                            onClick={() => save(record.key)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            Save
                        </Typography.Link>
                        <Typography.Link
                            onClick={() =>
                                axios({
                                    method: DELETE, url: `/api/attendance/delete/${record.key}`
                                }).then(({ data: { code, message: msg } }) => {
                                    if (code !== 0) {
                                        message.error({ content: msg })
                                    } else {
                                        fetch(pagination).then(() => message.success({ content: "success" }) && setEditingKey(''))
                                    }
                                }).catch(err => message.error({ content: err.toJSON().message }))
                            }
                            style={{
                                marginRight: 8,
                            }}
                        >
                            Delete
                        </Typography.Link>
                        <Popconfirm title="Sure to cancel?" onConfirm={() => setEditingKey('')}>
                            <a>Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                        Edit
                    </Typography.Link>
                );
            },
        },
    ];
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (
        <div style={{ backgroundColor: '#fff', padding: 24 }}>
            <div className={'bold font-16 m-b-10'}>
                <Form form={form} component={false}>
                    <Table
                        components={{
                            body: {
                                cell: EditableCell,
                            },
                        }}
                        bordered
                        dataSource={data}
                        columns={mergedColumns}
                        rowClassName="editable-row"
                        pagination={{
                            ...pagination,
                            onChange: page => {
                                fetch({ ...pagination, current: page }).then(() => setEditingKey(''))
                            },
                        }}
                    />
                </Form>
            </div>
        </div>
    );
}

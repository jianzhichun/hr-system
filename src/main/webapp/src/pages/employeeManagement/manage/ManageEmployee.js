import React, { useState, useRef, useMemo, useEffect } from 'react';
import { message, Radio, Table, Input, InputNumber, Popconfirm, Form, Typography, DatePicker } from 'antd';
import axios from "axios";
import { GET, POST } from "../../../util/string";
import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce';
import moment from 'moment';

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

export default function EmployeeManagement() {

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
        let inputNode;
        if (dataIndex === 'departmentId') {
            inputNode = <DebounceSelect
                placeholder="Select department by name"
                fetchOptions={fetchDepartmentsByName}
                firstOptions={[{ label: record.departmentName, value: record.departmentId }]}
            />;
        } else if (dataIndex === 'positionId') {
            inputNode = <DebounceSelect
                placeholder="Select position by name"
                fetchOptions={fetchPositionsByName}
                firstOptions={[{ label: record.positionName, value: record.positionId }]}
            />;
        } else if (dataIndex === 'birthday' || dataIndex === 'resignTime' || dataIndex === 'enrolTime') {
            inputNode = <DatePicker />
        } else if (dataIndex === 'gender') {
            inputNode = <Radio.Group>
                <Radio value={'F'}>Female</Radio>
                <Radio value={'M'}>Male</Radio>
                <Radio value={'O'}>Other</Radio>
            </Radio.Group>
        } else {
            inputNode = <Input />;
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
                url: `/api/employee/page?page=${pagination.current}&size=${pagination.pageSize}`
            }).then(({ data: { code, message, data } }) => {
                if (code !== 0) {
                    message.error({ content: message })
                } else {
                    setData(data.list.map(item => {
                        return { ...item, key: item.id, birthday: item.birthday && moment(item.birthday), resignTime: item.birthday && moment(item.resignTime), enrolTime: item.birthday && moment(item.enrolTime) };
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
                    url: `/api/employee/update/${key}`,
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
            title: 'Name',
            dataIndex: 'name',
            width: '10%',
            editable: true
        },
        {
            title: 'Email',
            dataIndex: 'email',
            width: '10%',
            editable: true
        },
        {
            title: 'Address',
            dataIndex: 'address',
            width: '10%',
            editable: true
        },
        {
            title: 'Contract',
            dataIndex: 'phoneNumber',
            width: '10%',
            editable: true
        },
        {
            title: 'Birthday',
            dataIndex: 'birthday',
            width: '15%',
            editable: true,
            render: (_, record) => {
                return <>{record.birthday && record.birthday != null && record.birthday.format("YYYY-MM-DD")}</>
            }
        },
        {
            title: 'Enroll Date',
            dataIndex: 'enrolTime',
            width: '15%',
            editable: true,
            render: (_, record) => {
                return <>{record.enrolTime && record.birthday != null && record.enrolTime.format("YYYY-MM-DD")}</>
            }
        },
        {
            title: 'Resign Date',
            dataIndex: 'resignTime',
            width: '15%',
            editable: true,
            render: (_, record) => {
                return <>{record.resignTime && record.birthday != null && record.resignTime.format("YYYY-MM-DD")}</>
            }
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            width: '10%',
            editable: true,
            render: (_, record) => {
                return <>{record['gender']}</>
            }
        },
        {
            title: 'Department',
            dataIndex: 'departmentId',
            width: '15%',
            editable: true,
            render: (_, record) => {
                return <>{record.departmentName}</>
            }
        },
        {
            title: 'Position',
            dataIndex: 'positionId',
            width: '15%',
            editable: true,
            render: (_, record) => {
                return <>{record.positionName}</>
            }
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
                                    method: POST, url: `/api/employee/delete/${record.key}`
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

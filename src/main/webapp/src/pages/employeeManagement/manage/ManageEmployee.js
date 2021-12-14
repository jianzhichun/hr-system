import React, { useState, useRef, useMemo, useEffect } from 'react';
import { message, Radio, Table, Input, InputNumber, Popconfirm, Form, Typography, DatePicker } from 'antd';
import axios from "axios";
import { GET, POST } from "../../../util/string";
import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce';
import moment from 'moment';
import { SearchOutlined } from '@ant-design/icons';

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
            allowClear
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

    const getColumnSearchProps = (dataIndex, type) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
            if (type === 'date') {
                return (<div style={{ padding: 8 }}>
                    <DatePicker
                        placeholder={`Search ${dataIndex}`}
                        value={selectedKeys[0]}
                        onChange={e => { setSelectedKeys(e ? [e] : []); confirm(); }}
                        style={{ marginBottom: 8, display: 'block', width: '90px' }}
                    />
                </div>)
            } else if (type === 'department') {
                return (<div style={{ padding: 8 }}>
                    <DebounceSelect
                        placeholder="Select department by name"
                        fetchOptions={fetchDepartmentsByName}
                        onChange={e => { setSelectedKeys(e ? [e] : []); confirm(); }}
                        style={{ marginBottom: 8, display: 'block', width: '140px' }}
                    />
                </div>)
            } else if (type === 'position') {
                return (<div style={{ padding: 8 }}>
                    <DebounceSelect
                        placeholder="Select position by name"
                        fetchOptions={fetchPositionsByName}
                        onChange={e => { setSelectedKeys(e ? [e] : []); confirm(); }}
                        style={{ marginBottom: 8, display: 'block', width: '140px' }}
                    />
                </div>)
            } else {
                return (<div style={{ padding: 8 }}>
                    <Input
                        placeholder={`Search ${dataIndex}`}
                        value={selectedKeys[0]}
                        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => confirm()}
                        style={{ marginBottom: 8, display: 'block', width: '100px' }}
                    />
                </div>)
            }

        },
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) => {
            if (type === 'date') {
                return record[dataIndex].format('YYYY-MM-DD') === value.format('YYYY-MM-DD');
            } else if (type == 'text') {
                return record[dataIndex]
                    ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                    : ''
            } else {
                return record[dataIndex] == value;
            }

        }
    });

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
        fetch = (param) => {
            return axios({
                method: GET,
                url: `/api/employee/page?page=${param.current}&size=${param.pageSize}${(param.name && '&name=' + param.name) || ''}${(param.departmentId && '&departmentId=' + param.departmentId) || ''}${(param.positionId && '&positionId=' + param.positionId) || ''}${(param.enrolTime && '&enrolTime=' + param.enrolTime[0].format('YYYY-MM-DD')) || ''}`
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
            width: 120,
            dataIndex: 'name',
            ...getColumnSearchProps('name', 'text'),
            editable: true
        },
        {
            title: 'Email',
            dataIndex: 'email',
            width: 120,
            ...getColumnSearchProps('email', 'text'),
            editable: true
        },
        {
            title: 'Address',
            dataIndex: 'address',
            width: 120,
            ...getColumnSearchProps('address', 'text'),
            editable: true
        },
        {
            title: 'Contract',
            dataIndex: 'phoneNumber',
            width: 120,
            ...getColumnSearchProps('phoneNumber', 'text'),
            editable: true
        },
        {
            title: 'Birthday',
            dataIndex: 'birthday',
            width: 120,
            ...getColumnSearchProps('birthday', 'date'),
            editable: true,
            render: (_, record) => {
                return <>{record.birthday && record.birthday != null && record.birthday.format("YYYY-MM-DD")}</>
            }
        },
        {
            title: 'Enroll Date',
            dataIndex: 'enrolTime',
            width: 120,
            editable: true,
            ...getColumnSearchProps('enrolTime', 'date'),
            render: (_, record) => {
                return <>{record.enrolTime && record.birthday != null && record.enrolTime.format("YYYY-MM-DD")}</>
            }
        },
        {
            title: 'Resign Date',
            dataIndex: 'resignTime',
            width: 120,
            editable: true,
            ...getColumnSearchProps('resignTime', 'date'),
            render: (_, record) => {
                return <>{record.resignTime && record.birthday != null && record.resignTime.format("YYYY-MM-DD")}</>
            }
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            width: 80,
            editable: true,
            ...getColumnSearchProps('gender', 'text'),
            render: (_, record) => {
                return <>{record['gender']}</>
            }
        },
        {
            title: 'Department',
            dataIndex: 'departmentId',
            width: 150,
            editable: true,
            ...getColumnSearchProps('departmentId', 'department'),
            render: (_, record) => {
                return <>{record.departmentName}</>
            }
        },
        {
            title: 'Position',
            dataIndex: 'positionId',
            width: 150,
            editable: true,
            ...getColumnSearchProps('positionId', 'position'),
            render: (_, record) => {
                return <>{record.positionName}</>
            }
        },
        {
            title: 'operation',
            width: 200,
            fixed: 'right',
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
                        onChange={(pagination, filters, sorter, extra) => {
                            fetch({ ...pagination, ...filters }).then(() => setEditingKey(''))
                        }}
                        bordered
                        dataSource={data}
                        columns={mergedColumns}
                        rowClassName="editable-row"
                        pagination={pagination}
                        scroll={{ x: 1800 }}
                    />
                </Form>
            </div>
        </div>
    );
}

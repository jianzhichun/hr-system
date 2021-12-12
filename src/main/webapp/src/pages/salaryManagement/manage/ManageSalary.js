import React, { useEffect, useState } from 'react';
import { message, Table, Input, InputNumber, Popconfirm, Form, Typography } from 'antd';
import axios from "axios";
import { GET, POST } from "../../../util/string";


export default function SalaryManagement() {

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
        const inputNode = inputType === 'number' ? <InputNumber min="0"
            step="0.000001"
            stringMode
            style={{ width: 200 }}
        /> : <Input />;
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
        [loading, setLoading] = useState(false),
        [editingKey, setEditingKey] = useState(''),
        fetch = (pagination) => {
            setLoading(true);
            return axios({
                method: GET,
                url: `/api/salary/page?page=${pagination.current}&size=${pagination.pageSize}`
            }).then(({ data: { code, message, data } }) => {
                if (code != 0) {
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
                    url: `/api/salary/update/${key}`,
                    data: row
                }).then(({ data: { code, message: msg } }) => {
                    if (code != 0) {
                        message.error({ content: msg });
                    } else {
                        message.success({ content: "success" })
                        newData.splice(index, 1, { ...item, ...row });
                        setData(newData);
                        setEditingKey('');
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
            title: 'Employee',
            dataIndex: 'employeeName',
            width: '25%'
        },
        {
            title: 'Department',
            dataIndex: 'departmentName',
            width: '15%',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            width: '40%',
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
                                    method: POST, url: `/api/salary/delete/${record.key}`
                                }).then(({ data: { code, message: msg } }) => {
                                    if (code != 0) {
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
                inputType: col.dataIndex === 'amount' ? 'number' : 'text',
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

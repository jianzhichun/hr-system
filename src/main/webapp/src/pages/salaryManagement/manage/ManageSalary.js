import React, { useEffect, useState } from 'react';
import { message, Table, Input, Button, InputNumber, Popconfirm, Form, Typography } from 'antd';
import axios from "axios";
import { GET, POST } from "../../../util/string";
import { SearchOutlined } from '@ant-design/icons';
import { Row, Col, Divider } from 'antd';

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
        [editingKey, setEditingKey] = useState(''),
        fetch = (param) => {
            return axios({
                method: GET,
                url: `/api/salary/page?page=${param.current}&size=${param.pageSize}${(param.amount && param.amount[0].start && '&amountStart=' + param.amount[0].start) || ''}${(param.amount && param.amount[0].end && '&amountEnd=' + param.amount[0].end) || ''}`
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
                    url: `/api/salary/update/${key}`,
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
    const [form1] = Form.useForm();
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
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
                return (<div style={{ padding: 8, margin: 10, width: '300px' }}>
                    <Form labelCol={{ span: 10 }} form={form1}
                        wrapperCol={{ span: 150 }}
                    >
                        <Form.Item label={"Start:"} name={'start'}>
                            <InputNumber

                                min="0"
                                step="0.000001"
                                stringMode
                                value={selectedKeys[0] && selectedKeys[0].start}
                                onChange={e => setSelectedKeys(e ? [{ ...selectedKeys[0], start: e }] : [])}
                                style={{ marginBottom: 8, display: 'block', width: '100px' }}
                            />
                        </Form.Item>
                        <Form.Item label={"End:"} name={'end'} >
                            <InputNumber
                                min="0"
                                step="0.000001"
                                stringMode
                                value={selectedKeys[0] && selectedKeys[0].start}
                                onChange={e => setSelectedKeys(e ? [{ ...selectedKeys[0], end: e }] : [])}
                                style={{ marginBottom: 8, display: 'block', width: '100px' }}
                            />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                            <Button type={'primary'} htmlType="submit" onClick={() => confirm()}
                                icon={<SearchOutlined />}
                                size="small">
                                Search
                            </Button> &nbsp;
                            <Button onClick={() => { clearFilters(); setSelectedKeys([]); form1.resetFields();}} size="small" style={{ width: 90 }}>
                                Reset
                            </Button>
                        </Form.Item>
                    </Form>
                </div>)
            },
            filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
            onFilter: ({ start, end }, record) => {
                return record.amount >= start && record.amount < end;
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
                                    method: POST, url: `/api/salary/delete/${record.key}`
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
                        onChange={(pagination, filters, sorter, extra) => {
                            fetch({ ...pagination, ...filters }).then(() => setEditingKey(''))
                        }}
                        bordered
                        dataSource={data}
                        columns={mergedColumns}
                        rowClassName="editable-row"
                        pagination={{
                            ...pagination
                        }}
                    />
                </Form>
            </div>
        </div>
    );
}

import React, { useEffect, useState } from 'react'
import {
    Card,
    Table,
    Form,
    Input,
    Button,
    Modal,
    message,
} from 'antd'
import {
    UserOutlined,
    EditOutlined,
    DeleteOutlined,
    ExclamationCircleOutlined,
} from '@ant-design/icons'
import { useForm } from 'antd/lib/form/Form'
import {
    getRoleList,
    adduser,
    updateUser,
    delUser,
} from '@/api/permission/role'
import type { Key } from 'react'
import { useNavigate } from "react-router-dom";
import {
    UserItem,
    UserList,
    UserType,
    RoleItemType
} from '@/api/permission/model/userTypes'

import type { ColumnsType } from 'antd/lib/table'
import './index.less'

const { confirm } = Modal

const Role: React.FC = () => {
    const [userList, setUserList] = useState<UserList>([])
    const [current, setCurrent] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(5)
    const [total, setTotal] = useState<number>(0)
    const [selectedIds, setSelectedIds] = useState<Key[]>([])
    const [modalTitle, setModalTitle] = useState<string>('添加用户')
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [modalType, setModalType] = useState<UserType>(1)
    const [user, setUser] = useState<UserItem>()
    const [form] = useForm()
    const [formSearch] = useForm()
    const navigate = useNavigate()

    useEffect(() => {
        initRoleList()
    }, [])

    const initRoleList = async (page = current, limit = pageSize) => {
        try {
            setCurrent(page)
            setPageSize(limit)
            const { roleName } = formSearch.getFieldsValue()
            const { records, total } = await getRoleList({ page, limit, roleName })
            setUserList(records)
            setTotal(total)
        } catch (e) { }
    }
    const handleRole = (type: UserType, row?: UserItem) => {
        changeModalTitlte(type)
        setModalType(type)
        setUser(row)
        if (type === 1) {
            form.resetFields()
        } else if (type === 2) {
            form.setFieldsValue(row)
        }
        setIsModalOpen(true)
    }
    //修改Modal标题
    const changeModalTitlte = (type: UserType) => {
        switch (type) {
            case 1:
                setModalTitle('添加角色')
                break
            case 2:
                setModalTitle('修改角色')
                break
            case 3:
                setModalTitle('设置角色')
                break
            default:
                setModalTitle('添加角色')
        }
    }
    //批量删除用户
    const batchDeleteUser = () => {
        message.info('开发中...')
    }
    //Modal确认
    const handleOk = () => {
        // 表单校验通过
        form.validateFields()
            .then(async (values) => {
                if (modalType === 1) {
                    await adduser(values)
                    initRoleList(1, 5)
                } else if (modalType === 2) {
                    await updateUser({ ...values, _id: user?._id })
                    initRoleList()
                }
                setIsModalOpen(false)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    //关闭Modal
    const handleCancel = () => {
        setIsModalOpen(false)
    }
    //删除用户
    const handleRemoveUser = (id: number) => {
        confirm({
            icon: <ExclamationCircleOutlined />,
            content: '不建议删除原有角色, 是否继续?（建议新增角色后测试删除功能）',
            async onOk() {
                try {
                    await delUser(id)
                    initRoleList(1, 5)
                } catch (e) { }
            },
            onCancel() {
                console.log('Cancel')
            },
        })
    }
    const handleAuth = ({_id, roleName}: RoleItemType) => {
        navigate(`/permission/assign/${_id}/${roleName}`)
    }
    const columns: ColumnsType<UserItem> = [
        {
            title: '序号',
            dataIndex: 'hoscode',
            render(value, row, index) {
                return index + 1
            },
            width: 100,
            align: 'center',
        },
        {
            title: '角色名称',
            dataIndex: 'roleName',
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
        },
        {
            title: '更新时间',
            dataIndex: 'updateTime',
        },
        {
            title: '操作',
            render(row: UserItem) {
                return (
                    <>
                        <Button
                            type="primary"
                            icon={<UserOutlined />}
                            onClick={() => handleAuth(row)}
                        />
                        <Button
                            type="primary"
                            icon={<EditOutlined />}
                            className="ml"
                            onClick={() => handleRole(2, row)}
                        />
                        <Button
                            type="primary"
                            icon={<DeleteOutlined />}
                            className="ml"
                            onClick={() => handleRemoveUser(row._id)}
                            danger
                        />
                    </>
                )
            },
            width: 200,
            fixed: 'right',
        },
    ]

    return (
        <Card>
            <div className="mtb">
                <Button type="primary" onClick={() => handleRole(1)}>
                    添加
                </Button>
                <Button
                    type="primary"
                    danger
                    className="ml"
                    disabled={selectedIds.length === 0}
                    onClick={batchDeleteUser}
                >
                    批量删除
                </Button>
            </div>
            <Table
                bordered
                dataSource={userList}
                columns={columns}
                rowKey="_id"
                scroll={{ x: 1200 }}
                pagination={{
                    current,
                    pageSize,
                    total,
                    pageSizeOptions: [5, 10, 15, 20],
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total) => `总共 ${total} 条`,
                    onChange: initRoleList,
                }}
                rowSelection={{
                    type: 'checkbox',
                    onChange: (selectedRowKeys: Key[], selectedRows: UserItem[]) => {
                        console.log(selectedRowKeys, selectedRows)
                        // 保存选中的id数组
                        setSelectedIds(selectedRowKeys)
                    },
                }}
            />
            <Modal
                title={modalTitle}
                forceRender
                destroyOnClose
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} labelCol={{ span: 6 }}>
                    <Form.Item
                        label="角色名称"
                        name="roleName"
                        rules={[{ required: true, message: '角色名称必须输入' }]}
                    >
                        <Input placeholder='请求输入角色名称' />
                    </Form.Item>
                </Form>
            </Modal>
        </Card>
    )
}

export default Role

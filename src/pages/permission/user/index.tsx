import React, { useEffect, useState } from 'react'
import {
    Card,
    Table,
    Form,
    Input,
    Button,
    Modal,
    message,
    Checkbox,
} from 'antd'
import {
    UserOutlined,
    EditOutlined,
    DeleteOutlined,
    ExclamationCircleOutlined,
} from '@ant-design/icons'
import { useForm } from 'antd/lib/form/Form'
import {
    getUserList,
    adduser,
    updateUser,
    delUser,
    getRoles,
    assignRoles,
} from '@/api/permission/user'
import type { Key } from 'react'
import {
    UserItem,
    UserList,
    UserType,
    OptionTypes,
} from '@/api/permission/model/userTypes'
import type { ColumnsType } from 'antd/lib/table'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'
import './index.less'
import AuthButton from '@/components/AuthButton'

const { confirm } = Modal

const User: React.FC = () => {
    const [userList, setUserList] = useState<UserList>([])
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const [total, setTotal] = useState<number>(0)
    const [selectedIds, setSelectedIds] = useState<Key[]>([])
    const [modalTitle, setModalTitle] = useState<string>('添加用户')
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [modalType, setModalType] = useState<UserType>(1)
    const [user, setUser] = useState<UserItem>()
    const [roleList, setRoleList] = useState<OptionTypes[]>([])
    const [userRolesIds, setUserRolesIds] = useState<string[]>([])
    const [checkAll, setCheckAll] = useState<boolean>(false)
    const [form] = useForm()
    const [roleForm] = useForm()

    useEffect(() => {
        initUserList()
    }, [])

    const initUserList = async (page = current, limit = pageSize) => {
        try {
            setCurrent(page)
            setPageSize(limit)
            const { records, total } = await getUserList({ page, limit })
            setUserList(records)
            setTotal(total)
        } catch (e) { }
    }
    const handleUser = (type: UserType, row?: UserItem) => {
        changeModalTitlte(type)
        setModalType(type)
        if (type === 1) {
            form.resetFields()
        } else if (type === 2) {
            setUser(row)
            form.setFieldsValue(row)
        } else {
            setUser(row)
            getRoleList(row?._id)
        }
        setIsModalOpen(true)
    }
    const getRoleList = async (id: any) => {
        try {
            const res: any = await getRoles(id)
            const allRolesList = res.allRolesList.map((item: any) => {
                return {
                    label: item.roleName,
                    value: item._id,
                }
            })
            setRoleList(allRolesList)
            const assignRoles: string[] = res?.assignRoles.map((i: any) => i?._id)
            setUserRolesIds(assignRoles)
            setCheckAll(res.allRolesList.length === res.assignRoles.length)
        } catch (e) { }
    }
    const changeModalTitlte = (type: UserType) => {
        switch (type) {
            case 1:
                setModalTitle('添加用户')
                break
            case 2:
                setModalTitle('修改用户')
                break
            case 3:
                setModalTitle('设置角色')
                break
            default:
                setModalTitle('添加用户')
        }
    }
    //批量删除用户
    const batchDeleteUser = () => {
        message.info('开发中...')
    }
    //Modal确认
    const handleOk = () => {
        if (modalType === 3) {
            submitAssign()
            return
        }
        // 表单校验通过
        form.validateFields()
            .then(async (values) => {
                if (modalType === 1) {
                    await adduser(values)
                    initUserList(1, 5)
                } else if (modalType === 2) {
                    await updateUser({ ...user, ...values })
                    initUserList()
                }
                setIsModalOpen(false)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const submitAssign = async () => {
        const roleId = userRolesIds.join(',')
        const adminId: any = user?._id
        try {
            await assignRoles(adminId, roleId)
            initUserList()
            setIsModalOpen(false)
        } catch (e) { }
    }
    const handleCancel = () => {
        setIsModalOpen(false)
        setUserRolesIds([])
    }
    const handleCheckAll = (e: CheckboxChangeEvent) => {
        const checked = e.target.checked
        const roleIds: any = checked ? roleList.map((item) => item.value) : []
        console.log(roleIds)
        setCheckAll(checked)
        setUserRolesIds(roleIds)
    }
    const handleCheckBoxChange = (values: any) => {
        setUserRolesIds(values)
        setCheckAll(values.length === roleList.length)
    }
    //删除用户
    const handleRemoveUser = (id: number) => {
        confirm({
            icon: <ExclamationCircleOutlined />,
            content: '不建议删除原有用户, 是否继续?（建议新增用户后测试删除功能）',
            async onOk() {
                try {
                    await delUser(id)
                    initUserList(1, 5)
                } catch (e) { }
            },
            onCancel() {
                console.log('Cancel')
            },
        })
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
            title: '邮箱',
            dataIndex: 'email',
        },
        {
            title: '用户昵称',
            dataIndex: 'name',
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
                        <AuthButton authKey="user.assign">
                            <Button
                                type="primary"
                                icon={<UserOutlined />}
                                onClick={() => handleUser(3, row)}
                            />
                        </AuthButton>
                        <AuthButton authKey="user.update">
                            <Button
                                type="primary"
                                icon={<EditOutlined />}
                                className="ml"
                                onClick={() => handleUser(2, row)}
                            />
                        </AuthButton>
                        <AuthButton authKey="user.delete">
                            <Button
                                type="primary"
                                icon={<DeleteOutlined />}
                                className="ml"
                                onClick={() => handleRemoveUser(row._id)}
                                danger
                            />
                        </AuthButton>
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
                <Button type="primary" onClick={() => handleUser(1)}>
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
                    onChange: initUserList,
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
                {modalType !== 3 ? (
                    <Form form={form} labelCol={{ span: 6 }}>
                        <Form.Item
                            label="邮箱"
                            name="email"
                            rules={[{ required: true, message: '邮箱必须输入' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item label="昵称" name="name">
                            <Input value={user?.name} />
                        </Form.Item>
                        {modalType === 1 && (
                            <Form.Item
                                label="密码"
                                name="password"
                                rules={[{ required: true, message: '密码必须输入' }]}
                            >
                                <Input />
                            </Form.Item>
                        )}
                    </Form>
                ) : (
                    <Form form={roleForm} labelCol={{ span: 4 }}>
                        <Form.Item label="邮箱">
                            <Input disabled value={user?.email} />
                        </Form.Item>
                        <Form.Item label="全选">
                            <Checkbox
                                className="mtp-6"
                                checked={checkAll}
                                onChange={handleCheckAll}
                            />
                            <div className="mbp-15"></div>
                            <Checkbox.Group
                                onChange={handleCheckBoxChange}
                                value={userRolesIds}
                                options={roleList}
                            />
                        </Form.Item>
                    </Form>
                )}
            </Modal>
        </Card>
    )
}

export default User

import React, { useEffect, useState } from 'react'
import { Card, Table, Button, Modal, Form, Input, message } from 'antd'
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons'
import {
  getPermissionList,
  addPermission,
  removePermission,
  updatePermission,
} from '@api/permission/permision'
import {
  PermisionTypes,
  PermisionType,
  PermisionItem,
  PermisionItemList,
} from '@/api/permission/model/permisionTypes'
import type { ColumnsType } from 'antd/lib/table'
import {getExpandedRowKeys} from '../../../utils'

const defalutPermision = {
  level: 0,
  name: '',
  code: '',
  toCode: '',
}

const { confirm } = Modal

const Permision: React.FC = () => {
  const [permmisionList, setPermisionList] = useState<PermisionItemList>([])
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [modalTitle, setModalTitle] = useState<string>('添加菜单')
  const [permision, setPermision] = useState<PermisionType>(defalutPermision)
  const [expandedRowKeys, setExpandedRowKeys] = useState<readonly React.Key[]>([])
  const [form] = Form.useForm()
  useEffect(() => {
    getList()
  }, [])

  /**
   * @description: 获取权限列表
   * @returns {*}
   */
  const getList = async () => {
    const res: any = await getPermissionList()
    if(expandedRowKeys.length === 0) {
      setExpandedRowKeys(getExpandedRowKeys(res))
    }
    setPermisionList(res)
  }
  const onExpandedRowsChange = (expandedRows:readonly React.Key[]) => {
    setExpandedRowKeys(expandedRows)
  }
  /**
   * @description: 添加菜单
   * @returns {*}
   */
  const toAddPermission = (row: PermisionTypes, title: string) => {
    setPermision(permision => {
      return {
        ...permision,
        _id: '',
        pid: row._id,
        level: row.level + 1,
        type: permision.level === 4 ? 2 : 1,
      }
    })  
    setModalTitle(title)  
    setIsModalOpen(true)
    form.resetFields()
  }

  /**
   * @description: 修改菜单
   * @returns {*}
   */
  const toUpdatePermission = (row: PermisionTypes, title: string) => {
    setPermision(() => {
      return {
        ...row,
        type: permision.level === 4 ? 2 : 1, 
      }
    })
    setIsModalOpen(true)
    setModalTitle(title)
    //将上次的信息写入modal表单，给用户更好的输入体验
    form.setFieldsValue(row)
  }

  /**
   * @description: 关闭Modal
   * @returns {*}
   */
  const handleCancel = () => {
    setIsModalOpen(false)
  }

  /**
   * @description: Modal确认
   * @returns {*}
   */
  const handleOk = () => {
    // 表单校验通过
    form
      .validateFields()
      .then(async (values) => {
        try {
          if (permision._id) {
            await updatePermission({ ...permision, ...values })
            // message.success('修改成功')
          } else {
            await addPermission({ ...permision, ...values })
            // message.success('添加成功')
          }
          setIsModalOpen(false)
          getList()
        } catch (e) {}
      })
      .catch((error) => {
        console.log(error)
      })
  }
  /**
   * @description: 删除菜单
   * @param {string} id
   * @returns {*}
   */
  const removePermision = (id: string) => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      content: `删除路由列表会导致某些页面无法访问，是否继续?（建议先新增路由后，再测试删除功能）`,
      async onOk() {
        try {
          await removePermission(id)
          // message.success('删除成功')
          getList()
        } catch (e) {}
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  const columns: ColumnsType<PermisionItem> = [
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '权限值',
      dataIndex: 'code',
    },
    {
      title: '跳转权限值',
      dataIndex: 'toCode',
    },
    {
      title: '操作',
      render(row: PermisionTypes) {
        return (
          <>
            <Button
              disabled={row.level === 4}
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => toAddPermission(row, '添加菜单')}
            ></Button>
            <Button
              disabled={row.level === 1}
              type="primary"
              icon={<EditOutlined />}
              className="ml"
              onClick={() => toUpdatePermission(row, '修改菜单')}
            ></Button>
            <Button
              disabled={row.level === 1}
              type="primary"
              icon={<DeleteOutlined />}
              className="ml"
              onClick={() => removePermision(row._id)}
              danger
            ></Button>
          </>
        )
      },
      width: 200,
      fixed: 'right',
    },
  ]

  return (
    <Card>
      <Table
        bordered
        dataSource={permmisionList}
        expandable={{
          expandedRowKeys,
          onExpandedRowsChange,
        }}
        // defaultExpandAllRows={true}
        // defaultExpandedRowKeys={['1', '7', '8', '9', '11', '12']}
        columns={columns}
        rowKey="_id"
        scroll={{ x: 1200 }}
        // pagination={false}
      />

      <Modal
        title={modalTitle}
        forceRender
        destroyOnClose
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} labelCol={{ span: 6 }} >
          <Form.Item
            label="名称"
            name="name"
            rules={[{ required: true, message: '名称必须输入' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="功能权限值"
            name="code"
            rules={[{ required: true, message: '功能权限值必须输入' }]}
          >
            <Input />
          </Form.Item>
          {
            permision.level===4 ? <Form.Item label="路由跳转权限值" name="toCode">
            <Input />
          </Form.Item> : null
          }
          
        </Form>
      </Modal>
    </Card>
  )
}

export default Permision

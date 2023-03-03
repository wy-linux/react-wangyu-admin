
import React, { useState } from 'react'
import { Form, Input, Button, Select} from "antd";
import { useAppDispatch } from "@/store/hooks";
import { loginAsync, LoginParams } from "@/store/slicers/userSlice";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import "./index.less"

const Login: React.FC = () => {
  const [isInputSelect, setIsInputSelect] = useState<boolean>(true)
  const dispatch = useAppDispatch()
  const handleInputSelect = () => {
    setIsInputSelect(!isInputSelect)
  }
  const onFinish = async (values: LoginParams) => {   
    await dispatch(loginAsync(values))
  }
  return (
    <div className="login">
      <div className="login-container">
        <h1>wangyu-admin</h1>
        <Form
          name="basic"
          initialValues={{ email: "查看所有路由@web.com", password: "123456" }}
          onFinish={onFinish}
          autoComplete="off"
        > 
          <Button type="primary" onClick={handleInputSelect} className="input-select-btn">
              {!isInputSelect ? '选择输入' : '手动输入'}
          </Button>
          <Form.Item label="" name="email" rules={[{ required: true, message: "请输入用户名!" }]}>
            {
              !isInputSelect 
              ? <Input prefix={<UserOutlined />} placeholder="用户名：wangyu@web.com"/>
              : <Select>
                 <Select.Option value="查看所有路由@web.com">查看所有路由@web.com</Select.Option>
                 <Select.Option value="查看用户管理@web.com">查看用户管理@web.com</Select.Option>
                 <Select.Option value="查看角色管理@web.com">查看角色管理@web.com</Select.Option>
                 <Select.Option value="查看菜单管理@web.com">查看菜单管理@web.com</Select.Option>
                </Select>
            }
          </Form.Item>

          <Form.Item label="" name="password" rules={[{ required: true, message: "请输入用户名密码!" }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="密码：123456" />
          </Form.Item>

          <Form.Item >
            <Button type="primary" htmlType="submit" className="login-btn">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;

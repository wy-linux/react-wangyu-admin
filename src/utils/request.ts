
import store from "../store";
import { removeToken } from '@/store/slicers/userSlice'
import { message } from "antd";
import axios from "axios";
//设置代理的基础路径、超时时间
const request = axios.create({
    baseURL: process.env.REACT_APP_API,
    timeout: 10000
})
//拦截器携带Token
request.interceptors.request.use((config) => {
    const token = store.getState().user.token
    if (token) {
        config.headers['authorization'] = token
    }
    return config
})

request.interceptors.response.use(
    //请求成功
    response => {
        //多个提示信息只显示一个
        // message.config({
        //   duration: 2,
        //   maxCount: 1,
        // })
        if (response.status === 200) {//请求成功
            message.success(response.data.message)
        }
        return response.data.data
    },
    //请求失败
    error => {
        const { response } = error
        message.error(response.data.message)
        if (response.status === 401) {
            store.dispatch(removeToken())
            window.location.href = '#/login'
        }
        // throw error
        return Promise.reject(error)
    }
)
export default request
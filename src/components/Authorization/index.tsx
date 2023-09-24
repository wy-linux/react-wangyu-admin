import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import Loading from "@/components/Loading"
import Login from "@pages/Login"
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getUserInfoAsync, selectUser } from "@/store/slicers/userSlice";

interface AuthProps {
    children: React.ReactElement
}
const Authorization: React.FC<AuthProps> = ({ children }) => {
    const { token, name } = useAppSelector(selectUser);
    const { pathname } = useLocation();
    const dispatch = useAppDispatch();
    // 有token, 说明登录过
    if (token) {
        // 如果要去的是登陆页面或根路径路由, 自动访问权限拥有页面
        if (pathname === "/login" || pathname === "/") {
            return <Navigate to='/home/index' />
        }
        // 如果有用户名, 说明已经登陆, 直接渲染目标组件 LayoutComponent/xxx组件
        if (name) {
            return children;
        }
        dispatch(getUserInfoAsync())
        // 在请求过程中, 先显示loading效果 
        return <Loading size='large' loginReturn />
    } else if(pathname === '/login') {
        return <Login />
    }
    
    return <Navigate to='/login' replace/>
}

export default Authorization;

import { FC } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { Spin } from "antd";
import Login from '../../pages/login'
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getUserInfoAsync, selectUser} from "@/store/slicers/userSlice";

const withAuthorization = (WrappedComponent: FC) => {
  return () => {    
    //读取redux: token登录与退出登录会重新执行   
    const { token, name} = useAppSelector(selectUser);
    const { pathname } = useLocation();
    const dispatch = useAppDispatch();
    // 有token, 说明登录过
    if (token) {
      // 如果要去的是登陆页面或根路径路由, 自动访问权限拥有页面
      if (pathname === "/login" || pathname === "/") {
        return <Navigate to='/wangyu/home/index' />
      }
      // 如果有用户名, 说明已经登陆, 直接渲染目标组件 LayoutComponent/xxx组件
      if(name) {
        return <WrappedComponent />;
      }
      dispatch(getUserInfoAsync())
      // 在请求过程中, 先显示loading效果 
      return <Spin size="large"/>;
    } else if(pathname === "/login" || pathname === "/") {
      return <Login />;
    }
    return <Navigate to="/login" />   
  };
}

export default withAuthorization;

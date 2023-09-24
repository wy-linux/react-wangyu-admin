import React from "react";
import { Result, Button, message} from "antd";
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "@/store/hooks";
import { removeToken } from "@/store/slicers/userSlice";
import { resultRoutes } from '@/router'

const NotFound: React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [{children = []}] = resultRoutes

    function returnPagePermission() {
        if(children.length === 0) {
            message.info("当前没有任何可以访问的路由！")
            dispatch(removeToken())
            message.info("退回登录页！")
        } else {
            navigate(children[0].path, {replace: true})
        }
    }

    return (
        <Result
            status="403"
            title="403"
            subTitle="您无权查看当前页面！"
            extra={
                <Button type="primary" onClick={returnPagePermission}>
                    返回持有权限页面
                </Button>
            }
        />
    );
}

export default NotFound;

import React from "react";
import { Button, Spin } from 'antd';
import { useAppDispatch } from "@/store/hooks";
import { removeToken } from "@/store/slicers/userSlice";
import './index.less'

interface LoadingProps {
    loginReturn?: boolean;
    size?: "small" | "default" | "large" ;
}

const Loading: React.FC<LoadingProps> = ({loginReturn, ...props}) => {
    const dispatch = useAppDispatch()

    const returnClick = () => {
        dispatch(removeToken())
    }

    return (
        <div className="loading-container">
            <Spin {...props}/>
            {loginReturn && (
                <Button type="primary" onClick={returnClick}>
                    返回登录页
                </Button>
            )}
        </div>
    )
}

export default Loading;

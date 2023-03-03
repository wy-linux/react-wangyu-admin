import React from "react";
import { Result, Button } from "antd";
import {returnPagePermission} from '../../utils'
const NotFound: React.FC = () => {
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

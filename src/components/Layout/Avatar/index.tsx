import React from 'react'
import { Link } from "react-router-dom";
import { Menu, Dropdown, Button } from "antd";
import type { MenuProps } from 'antd';
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logoutAsync, selectUser } from "@/store/slicers/userSlice";
import avatarGif from '../../../assets/imgs/avatar.gif';
import "./index.less";

const AvatarComponent: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const handleLogout =  () => {
    // 分发退出登陆的异步action
    dispatch(logoutAsync());
    // 如果成功了, 跳转到登陆页面
    // if (action.type==='user/logoutAsync/fulfilled') {
    //   navigator("/login");
    // }
  };

  const { t } = useTranslation("app");

  const items: MenuProps['items'] = [
        { 
          label: <Link to="/home/index">{t("goHomeBtnText")}</Link>, 
          key: '1' 
        }, // 菜单项务必填写 key
        { 
          label: <div onClick={handleLogout}>{t("logoutBtnText")}</div>, 
          key: '2' 
        }
      ]

  return (
    <Dropdown menu={{items}} trigger={["click"]}>
      <Button className="layout-dropdown-link" type="link">
        <img className="layout-avatar" src={avatarGif} alt={user.avatar} />
      </Button>
    </Dropdown>
  );
}

export default AvatarComponent;

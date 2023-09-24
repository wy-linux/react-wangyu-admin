import React from 'react'
import { Outlet } from "react-router-dom";
import { Layout, Button } from "antd";
import GithubIcon from './GithubIcon'
import Avatar from "./Avatar";
import Breadcrumb from "./Breadcrumb";
import SideBar from "./SideBar";
import Tabs from "./Tabs";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectLang, setLang } from "@/store/slicers/appSlice";
import "./index.less";

const { Header, Content, Footer } = Layout;

const LayoutComponent: React.FC = () => {
    const lang = useAppSelector(selectLang);
    const dispatch = useAppDispatch();
    const { i18n } = useTranslation();

    const handleChangeLang = () => {
        const newLang = lang === "zh_CN" ? "en_US" : "zh_CN";
        dispatch(setLang(newLang));
        i18n.changeLanguage(newLang);
    };

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <SideBar />
            <Layout>
                <Header className="layout-header">
                    <Breadcrumb />
                    <div>
                        <GithubIcon />
                        <Button size="small" onClick={handleChangeLang}>
                            {lang === "zh_CN" ? "English" : "中文"}
                        </Button>
                        <Avatar />
                    </div>
                </Header>
                <Tabs />
                <Content className="layout-content">
                    <Outlet />
                </Content>
                <Footer style={{ textAlign: "center" }}>
                    WangYu-admin后台管理系统模板
                </Footer>
            </Layout>
        </Layout>
    );
}

export default LayoutComponent;

import React from 'react'
import { ConfigProvider } from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import enUS from "antd/lib/locale/en_US";
import { useAppSelector } from "./store/hooks";
import { selectLang } from "./store/slicers/appSlice";
import { useAppRoutes } from "./router";
import Authorization from "./components/Authorization";

const App: React.FC = () => {
    const lang = useAppSelector(selectLang);
    const locale = lang === "zh_CN" ? zhCN : enUS
    return (
        <Authorization>
            <ConfigProvider locale={locale}>
                {useAppRoutes()}
            </ConfigProvider>
        </Authorization>
    )
}

export default App;

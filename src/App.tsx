import React from 'react'
import { ConfigProvider } from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import enUS from "antd/lib/locale/en_US";

import { useAppSelector } from "./store/hooks";
import { selectLang } from "./store/slicers/appSlice";

import { useAppRoutes } from "./router";
import withAuthorization from "./components/withAuthorization";

const App: React.FC = () => {  
  const lang = useAppSelector(selectLang);
  return <ConfigProvider locale={lang === "zh_CN" ? zhCN : enUS}>{useAppRoutes()}</ConfigProvider>;
}

export default withAuthorization(App);

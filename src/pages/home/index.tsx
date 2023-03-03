import React from 'react'
import { useTranslation } from "react-i18next";
import { Card } from "antd";
import { useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/slicers/userSlice";

 const Home: React.FC = () => {
  const user = useAppSelector(selectUser);
  const { t } = useTranslation(["app"]);

  return (
    <Card style={{ minHeight: "calc(100vh - 64px)" }}>
      <h2>{t("home")}</h2>
      <h2>用户名: {user.name}</h2>
    </Card>
  );
}

export default Home;

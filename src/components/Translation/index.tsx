import React from 'react'
import { useTranslation } from "react-i18next";
interface TranslationProps {
  children: string;
}
const Translation: React.FC<TranslationProps> = ({ children }) => {
  // children 代表组件标签包裹的内容
  const { t } = useTranslation();
  return <span>{t(children)}</span>;
}
export default Translation
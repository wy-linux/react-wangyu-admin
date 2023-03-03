import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CloseOutlined } from "@ant-design/icons";
import { Dropdown} from "antd";
import type { MenuProps } from 'antd';
import { TabType } from "../types";
import "./index.less";

interface TabProps {
  tab: TabType;
  active: boolean;
  index: number;
  length: number;
  onClose(index: number): void;
  onCloseOthers(index: number): void;
  onCloseAll(index: number): void;
}

const Tab: React.FC<TabProps> = ({ 
    tab,
    active, 
    index, 
    length, 
    onClose, 
    onCloseOthers, 
    onCloseAll 
  }) => {
  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    switch (key) {
      case "close":
        onClose(index);
        return;
      case "closeOthers":
        onCloseOthers(index);
        return;
      case "closeAll":
        onCloseAll(index);
        return;
    }
  };

  const items: MenuProps['items'] = (
    [
      {
        label: "关闭",
        key: "close",
        disabled: index === 0,
      },
      {
        label: "关闭其他",
        key: "closeOthers",
        disabled: length === 1 || (length === 2 && index !== 0),
      },
      {
        label: "全部关闭",
        key: "closeAll",
        disabled: length <= 1,
      },
    ]
  )
  const [isHover, setIsHover] = useState(false);

  const handleHover = (isHover: boolean) => {
    return () => {
      setIsHover(isHover);
    };
  };

  return (
    <Dropdown menu={{items, onClick: handleMenuClick}} trigger={["hover"]}>
      <div className={`tab ${active ? "active" : ""}`} onMouseEnter={handleHover(true)} onMouseLeave={handleHover(false)}>
        <Link className="tab-link" to={tab.path}>
          {tab.title}
        </Link>
        {tab.closable && (isHover || active) && <CloseOutlined className="tab-close" onClick={() => onClose(index)} />}
      </div>
    </Dropdown>
  );
}

export default Tab;

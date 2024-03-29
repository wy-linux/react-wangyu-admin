import React, { useState, useEffect, MouseEvent } from "react";
import { useLocation, useNavigate, matchPath } from "react-router-dom";
import Tab from "./Tab";
import { resultRoutes } from "@/router";
import { Routes, SMeta } from "@/router/types";
import type { TabsType } from "./types";
import "./index.less";

// 查找标题
const findTitle = (routes: Routes, pathname: string) => {
    for (let i = 0; i < routes.length; i++) {
        const route = routes[i];
        if (route.children?.length) {
            const title = findTitle(route.children, pathname) as string;
            if (title) return title;
        } else {
            if (matchPath(route.path as string, pathname)) {
                return (route.meta as SMeta).title as string;
            }
        }
    }
};

const Tabs: React.FC = () => {
    const [tabs, setTabs] = useState<TabsType>([]);
    const [oldPathname, setOldPathname] = useState("");
    const [activeIndex, setActiveIndex] = useState(0);
    const { pathname } = useLocation();
    const navigate = useNavigate();
    // 路由变化时保存新的tab页
    useEffect(() => {
        if (pathname === oldPathname) return;
        const newActiveIndex = tabs.findIndex((tab) => tab.path === pathname);
        setOldPathname(pathname);
        if (newActiveIndex >= 0) {
            setActiveIndex(newActiveIndex);
            return;
        }
        const title = findTitle(resultRoutes, pathname) as string;
        if (!title) {
            return;
        }
        // 保存
        setTabs([
            ...tabs,
            {
                key: pathname,
                path: pathname,
                title,
            },
        ]);

        setActiveIndex(tabs.length);
    }, [pathname]);

    const handleContextMenu = (e: MouseEvent) => {
        // 阻止默认行为
        e.preventDefault();
    };

    const close = (index: number) => {
        const newTabs = tabs.filter((tab, i) => index !== i);
        setTabs(newTabs);
        if (activeIndex === index) {
            const lastTab = newTabs[newTabs.length - 1];
            setOldPathname(lastTab.path);
            setActiveIndex(newTabs.length - 1);
            // 路由跳转
            navigate(lastTab.path);
        } else if (activeIndex > index) {
            setActiveIndex(activeIndex - 1);
        }
    };

    const closeOthers = (index: number) => {
        // 保留当前页和首页
        const newTabs = tabs.filter((tab, i) => index === i || i === 0);
        setTabs(newTabs);
        const lastTab = newTabs[newTabs.length - 1];
        setOldPathname(lastTab.path);
        setActiveIndex(newTabs.length - 1);
        // 路由跳转
        navigate(lastTab.path);
    };

    const closeAll = () => {
        // 只保留首页
        const newTabs = tabs.filter((tab, i) => i === 0);
        setTabs(newTabs);
        const lastTab = newTabs[newTabs.length - 1];
        setOldPathname(lastTab.path);
        setActiveIndex(newTabs.length - 1);
        // 路由跳转
        navigate(lastTab.path);
    };

    return (
        <div className="tabs" onContextMenu={handleContextMenu}>
            {tabs.map((tab, index) => (
                <Tab
                    tab={tab}
                    key={tab.key}
                    active={activeIndex === index}
                    index={index}
                    length={tabs.length}
                    onClose={close}
                    onCloseOthers={closeOthers}
                    onCloseAll={closeAll}
                />
            ))}
        </div>
    );
}

export default Tabs;

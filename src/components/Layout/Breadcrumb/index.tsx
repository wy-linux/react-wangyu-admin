import React from "react";
import { useLocation, matchPath } from "react-router-dom";
import { Breadcrumb } from "antd";
import { findSideBarRoutes } from "@/router";
import { Routes } from "@/router/types";

const findBreadcrumbTitle = (pathname: string, routes: Routes) => {
    for (let i = 0; i < routes.length; i++) {
        const route = routes[i];
        if (route.path === pathname) {
            return {
                title: route.meta?.title as string,
            };
        }
        if (route.children) {
            for (let j = 0; j < route.children.length; j++) {
                const childRoute = route.children[j];
                // 为了路由的params参数能匹配上，必须使用matchPath方法
                if (matchPath(childRoute.path as string, pathname)) {
                    return {
                        title: route.meta?.title as string,
                        childTitle: childRoute.meta?.title,
                    };
                }
            }
        }
    }
};

const BreadcrumbComponent: React.FC = () => {
    const { pathname } = useLocation();
    // 获取需要遍历的路由表
    const routes = findSideBarRoutes();
    // 生成导航
    const titles = findBreadcrumbTitle(pathname, routes);

    return (
        <Breadcrumb style={{ margin: "15px 10px" }}>
            <Breadcrumb.Item>{titles?.title}</Breadcrumb.Item>
            {/* 二级导航可能没有，所以进行判断 */}
            {titles?.childTitle && (
                <Breadcrumb.Item>{titles?.childTitle}</Breadcrumb.Item>
            )}
        </Breadcrumb>
    );
}

export default BreadcrumbComponent;

import { lazy, Suspense } from "react";
import type { FC } from "react";
import Layout from '../components/Layout'
import Loading from "@comps/Loading";
import { Outlet } from "react-router-dom";
import Translation from "@comps/Translation";
import {
    HomeOutlined,
    BugOutlined,
    GithubOutlined,
    LockOutlined,
} from "@ant-design/icons";
import type { Routes } from "./types";
const Home = lazy(() => import("@/pages/Home"));
const NotFound = lazy(() => import("@/pages/NotFount"));
const User = lazy(() => import("@/pages/permission/User"));
const Permision = lazy(() => import("@/pages/permission/Menu"));
const Role = lazy(() => import("@/pages/permission/Role"));
const RoleAuth = lazy(() => import("@/pages/permission/Assign"));
const load = (Comp: FC) => {
    return (
        <Suspense fallback={<Loading />}>
            <Comp />
        </Suspense>
    );
};
//不需要权限的路由
export const constantRoutes: Routes = [
    {
        path: "*",
        name: "*",
        hidden: true,
        // element: <Navigate to="/404" />,
        element: load(NotFound)
    },
];

// 需要权限的路由
export const allAsyncRoutes: Routes = [
    {
        path: "/",
        element: <Layout />,
        name: "/",
        children: [
            {
                path: "/home",
                element: <Outlet />,
                name: "/home",
                meta: {
                    icon: <HomeOutlined />,
                    title: <Translation>route:home</Translation>,
                },
                children: [
                    {
                        name: "/home/index",
                        path: "/home/index",
                        meta: {
                            title: '使用说明',
                        },
                        element: load(Home),
                    },
                ],
            },
            {
                name: "/permission",
                path: "/permission",
                meta: {
                    icon: <LockOutlined />,
                    title: <Translation>route:permission</Translation>,
                },
                element: <Outlet />,
                children: [
                    {
                        name: "/permission/user",
                        path: "/permission/user",
                        meta: {
                            title: "用户管理",
                        },
                        element: load(User),
                    },
                    {
                        name: "/permission/role",
                        path: "/permission/role",
                        meta: {
                            title: "角色管理",
                        },
                        element: load(Role),
                    },
                    {
                        name: "/permission/menu",
                        path: "/permission/menu",
                        meta: {
                            title: "菜单管理",
                        },
                        element: load(Permision),
                    },
                    {
                        name: "/permission/assign",
                        path: "/permission/assign/:id/:roleName",
                        meta: {
                            title: "角色授权",
                        },
                        hidden: true, // 不在导航菜单中显示
                        element: load(RoleAuth),
                    },
                ],
            },
            {
                name: "/spider",
                path: "/spider",
                meta: {
                    icon: <BugOutlined />,
                    title: <Translation>route:spider</Translation>,
                },
                element: <Outlet />,
            },
            {
                name: "/github",
                path: "/github",
                meta: {
                    icon: <GithubOutlined />,
                    title: <Translation>route:github</Translation>,
                },
                element: <Outlet />,
            },
        ],
    },
]
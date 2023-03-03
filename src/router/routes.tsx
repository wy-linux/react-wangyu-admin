import { lazy, Suspense } from "react";
import type { FC } from "react";
import Layout  from '../components/Layout'
import EmptyLayout from '../components/EmptyLayout'
import Loading from "@comps/Loading";
import { Outlet } from "react-router-dom";
import Translation from "@comps/Translation";
import {
  HomeOutlined,
  BugOutlined ,
  GithubOutlined,
  LockOutlined,
} from "@ant-design/icons";
import type { SRoutes } from "./types";
const Login = lazy(() => import("@pages/login"));
const Home = lazy(() => import("@/pages/home"));
const NotFound = lazy(() => import("@pages/404"));
const User = lazy(() => import("@pages/permission/user"));
const Permision = lazy(() => import("@/pages/permission/menu"));
const Role = lazy(() => import("@pages/permission/role"));
const RoleAuth = lazy(() => import("@pages/permission/role/auth"));
const load = (Comp: FC) => {
  return (
    // 因为路由懒加载，组件需要一段网络请求时间才能加载并渲染
    // 在组件还未渲染时，fallback就生效，来渲染一个加载进度条效果
    // 当组件渲染完成时，fallback就失效了
    <Suspense fallback={<Loading />}>
      {/* 所有lazy的组件必须包裹Suspense组件，才能实现功能 */}
      <Comp />
    </Suspense>
  );
};
//不需要权限的路由
export const constantRoutes: SRoutes = [
  {
    path: "/",
    name: "/",
    element: <EmptyLayout />,
    children: [
      {
        name: "login",
        path: "/login",
        element: load(Login),
      },
      {
        name: 'NotFound',
        path: "/404",
        element: load(NotFound),
      },
      {
        path: "/wangyu",
        element: <Layout />,
        name: "wangyu",
        children: [
          {
            name: "home",
            path: "/wangyu/home/index",
            meta: {
              icon: <HomeOutlined />,
              title: <Translation>route:home</Translation>,
            },
            element: load(Home),
          },
        ],
      },
    ],
  },
];
// 404、*路由
export const anyRoute = [
  {
    path: "*",
    // element: <Navigate to="/404" />,
    element:load(NotFound)
  },
];
// 需要权限的路由
export const allAsyncRoutes: SRoutes = [
  {
    path: "/wangyu",
    element: <Layout />,
    name: "/wangyu",
    children: [
      // 首页路由
      {
        name: "/home",
        path: "/wangyu/home",
        meta: {
          icon: <HomeOutlined />,
          title: <Translation>route:home</Translation>,
        },
        element: load(EmptyLayout),
        children: [
          {
            name: "/home/index",
            path: "/wangyu/home/index",
            meta: {
              title: "使用说明",
            },
            element: load(Home),
          }
        ]
      },
      {
        name: "/permission",
        path: "/wangyu/permission",
        meta: {
          icon: <LockOutlined />,
          title: <Translation>route:permission</Translation>,
        },
        element: <Outlet />,
        children: [
          {
            name: "/permission/user",
            path: "/wangyu/permission/user",
            meta: {
              title: "用户管理",
            },
            element: load(User),
          },
          {
            name: "/permission/role",
            path: "/wangyu/permission/role",
            meta: {
              title: "角色管理",
            },
            element: load(Role),
          },
          {
            name: "/permission/menu",
            path: "/wangyu/permission/menu",
            meta: {
              title: "菜单管理",
            },
            element: load(Permision),
          },
          {
            name: "/permission/assign",
            path: "/wangyu/permission/assign/:id",
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
        path: "/wangyu/spider",
        meta: {
          icon: <BugOutlined />,
          title: <Translation>route:spider</Translation>,
        },
        element: load(Home),
      },
      {
        name: "/github",
        path: "/wangyu/github",
        meta: {
          icon: <GithubOutlined />,
          title: <Translation>route:github</Translation>,
        },
        element: load(Home),
      },
    ],
  },
]
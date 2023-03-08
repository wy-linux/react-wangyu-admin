
import { useRoutes,  } from "react-router-dom";
import type { SRoutes } from "./types";
import { allAsyncRoutes, anyRoute, constantRoutes } from "./routes";
import { useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/slicers/userSlice";
import { filterRouter } from "./effect";
/* 
自定义hook: 注册应用的所有路由
*/
export let resultRoutes: SRoutes = []
export const useAppRoutes = () => {
  const {routes} = useAppSelector(selectUser);  
  resultRoutes = routes?.length ? filterRouter({
    allAsyncRoutes,
    routes
  }) : constantRoutes
  return useRoutes([...resultRoutes, ...anyRoute]);
};

// 找到要渲染成左侧菜单的路由
export const findSideBarRoutes = () => {
  const currentIndex = resultRoutes.findIndex((route) => route.path === "/");
  return resultRoutes[currentIndex].children as SRoutes;
}
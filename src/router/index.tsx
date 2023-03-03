
import { useRoutes,  } from "react-router-dom";
import type { SRoutes } from "./types";
import { allAsyncRoutes, anyRoute, constantRoutes } from "./routes";
import { useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/slicers/userSlice";
import { filterRouter } from "./effect";
/* 
自定义hook: 注册应用的所有路由
*/
let resultRouter: SRoutes = []
export const useAppRoutes = () => {
  const {routes} = useAppSelector(selectUser);  
  resultRouter = routes?.length ? filterRouter({
    allAsyncRoutes,
    routes
  }) : constantRoutes  
  return useRoutes([...resultRouter, ...anyRoute]);
};

// 找到要渲染成左侧菜单的路由
export const findSideBarRoutes = () => {
  const currentIndex = resultRouter.findIndex((route) => route.path === "/wangyu");
  return resultRouter[currentIndex].children as SRoutes;
};

export default resultRouter;

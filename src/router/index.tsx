
import { useRoutes } from "react-router-dom";
import type { Routes } from "./types";
import { allAsyncRoutes, constantRoutes } from "./routes";
import { useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/slicers/userSlice";
import { filterRouter } from "./effect";
import cloneDeep from 'lodash/cloneDeep'

// 注册应用的所有路由
export let resultRoutes: Routes = []
export const useAppRoutes = () => {
    const { routes } = useAppSelector(selectUser);
    resultRoutes = filterRouter({
        allAsyncRoutes: cloneDeep(allAsyncRoutes),
        routes
    }) 
    return useRoutes([...resultRoutes, ...constantRoutes]);
};

// 找到要渲染成左侧菜单的路由
export const findSideBarRoutes = () => {
    const currentIndex = resultRoutes.findIndex((route) => route.path === "/");
    return resultRoutes[currentIndex].children as Routes;
}
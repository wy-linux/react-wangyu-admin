import type { ReactElement } from "react";

export interface SMeta {
    icon?: ReactElement;
    title?: string | ReactElement;
}

export interface Route {
    path: string;
    children?: Routes;
    meta?: SMeta;
    hidden?: boolean;
    name: string;
    element: JSX.Element;
}

export type Routes = Route[];


export interface TreeRouterFilterParams {
    routeHash: Record<string, any>;
    allAsyncRoutes: Routes;
    lv?: number
}
export interface TreeRouterFilter {
    (params: TreeRouterFilterParams): Routes
}
export interface FilterRouterParams {
    allAsyncRoutes: Routes,
    routes: string[]
}
export interface FilterRouter {
    (params: FilterRouterParams): Routes
}

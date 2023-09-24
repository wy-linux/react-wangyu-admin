import { ReactElement } from "react";

export interface TabType {
  key: string;
  path: string;
  title: ReactElement | string;
}

export type TabsType = TabType[];

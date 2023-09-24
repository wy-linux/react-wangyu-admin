export interface MenuItem {
    _id: string;
    name: string;
    code: string;
    toCode: string;
    level: number;
    select: boolean
    children: MenuItem[]
}

export type Menu = MenuItem[];

export interface PermisionType {
    _id?: string;
    level: number;
    name: string;
    code: string;
    toCode: string;
    pid?: string,
    type?: number
}

export interface PermisionItem {
    name: string;
    code: string | null;
    toCode: string | null;
}
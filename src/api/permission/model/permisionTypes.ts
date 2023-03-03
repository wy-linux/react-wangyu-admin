export interface PermisionTypes {
  _id: string;
  name: string;
  code: string;
  toCode: string;
  level: number;
}

export type PermisionItemList = PermisionTypes[];

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
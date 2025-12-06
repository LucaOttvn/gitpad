import { TypesEnum } from "./enums";

export interface TreeItem {
    name: string;
    type: TypesEnum;
    path: string;
    children: TreeItem[];
}

export interface Content {
    name: string
}

export interface APIResponse {
    success: boolean
    message?: string
}
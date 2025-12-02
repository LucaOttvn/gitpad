import { effect, signal } from "@preact/signals";
import { TreeItem } from "./models";

export const test = signal<TreeItem[]>([])
export const itemsToPush = signal<{ path: string, content: string }[]>([])
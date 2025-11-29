'use client'
import { TreeItem } from "@/src/utils/models";
import "./shared-styles.scss";
import Link from "next/link";
import Image from "next/image";
import AnimatedDiv from "./animated/AnimatedDiv";

interface FolderComponentProps {
  folder: TreeItem;
  index?: number;
}
export default function FolderComponent(props: FolderComponentProps) {
  return (
    <AnimatedDiv delay={props.index != undefined ? 0.05 * props.index : 0}>
      <Link href={`/file-explorer/${props.folder.name}`} className="treeItem" style={{background: 'var(--lightBlack)'}}>
        <Image src="/icons/folder.svg" alt="folder" width={20} height={20} />
        <span>{props.folder.name}</span>
      </Link>
    </AnimatedDiv>
  );
}

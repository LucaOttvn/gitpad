"use client";
import {TreeItem} from "@/src/utils/models";
import Image from "next/image";
import "./shared-styles.scss";
import AnimatedDiv from "./animated/AnimatedDiv";
import Link from "next/link";

interface FileComponentProps {
  file: TreeItem;
  index?: number;
}

export default function FileComponent(props: FileComponentProps) {
  return (
    <AnimatedDiv delay={props.index != undefined ? 0.07 * props.index : 0}>
      <Link
        href={`/file-editor/${props.file.path}`}
        className="treeItem clickableItem"
        key={props.file.path}
        style={{background: "var(--grey)"}}
      >
        <Image src="/icons/file.svg" alt="folder" width={20} height={20} />
        <span>{props.file.name}</span>
      </Link>
    </AnimatedDiv>
  );
}

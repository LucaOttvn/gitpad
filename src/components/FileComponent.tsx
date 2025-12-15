"use client";
import {TreeItem} from "@/src/utils/models";
import Image from "next/image";
import "./shared-styles.scss";
import AnimatedDiv from "./animated/AnimatedDiv";
import Link from "next/link";
import toast from "react-hot-toast";

interface FileComponentProps {
  file: TreeItem;
  index?: number;
}

export default function FileComponent(props: FileComponentProps) {
  const isExtensionValid = props.file.name.endsWith(".md") || props.file.name.endsWith(".txt");
  return (
    <AnimatedDiv delay={props.index != undefined ? 0.07 * props.index : 0}>
      {isExtensionValid ? (
        <Link href={`/file-editor/${props.file.path}`} className="treeItem clickableItem" key={props.file.path} >
          <Image src="/icons/file.svg" alt="folder" width={20} height={20} />
          <span>{props.file.name}</span>
        </Link>
      ) : (
        <div
          key={props.file.path}
          className="treeItem disabledItem"
          style={{
            pointerEvents: "all",
          }}
          onClick={() => {
            toast.error("GitPad can only handle .md or .txt files");
          }}
        >
          <Image src="/icons/file.svg" alt="folder" width={20} height={20} />
          <span>{props.file.name}</span>
        </div>
      )}
    </AnimatedDiv>
  );
}

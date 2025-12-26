"use client";
import {TreeItem} from "@/src/utils/models";
import "./shared-styles.scss";
import AnimatedDiv from "./animated/AnimatedDiv";
import Link from "next/link";
import toast from "react-hot-toast";

interface FileComponentProps {
  file: TreeItem;
  index?: number;
}

export default function FileComponent(props: FileComponentProps) {
  const [fileName, fileExtension] = props.file.name.split(".");

  const isExtensionValid = fileExtension === "md" || fileExtension === "txt";

  return (
    <AnimatedDiv delay={props.index != undefined ? 0.07 * props.index : 0}>
      {isExtensionValid ? (
        <Link href={`/file-editor/${props.file.path}`} className="treeItem clickableItem" key={props.file.path}>
          <span>{fileName}</span>
          <span style={{color: "var(--blue)", background: "var(--white)", fontWeight: "bold", paddingRight: "0.2rem"}}>{"." + fileExtension}</span>
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
          <span>{props.file.name}</span>
        </div>
      )}
    </AnimatedDiv>
  );
}

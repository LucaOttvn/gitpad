"use client";
import {TreeItem} from "@/src/utils/models";
import "./shared-styles.scss";
import Link from "next/link";
import AnimatedDiv from "./animated/AnimatedDiv";
import {usePathname} from "next/navigation";

interface FolderComponentProps {
  folder: TreeItem;
  index?: number;
}
export default function FolderComponent(props: FolderComponentProps) {
  const pathname = usePathname();

  // Handle the root edge case to avoid "//folder"
  const parentPath = pathname === "/" ? "" : pathname;
  const href = `${parentPath}/${props.folder.name}`;
  return (
    <AnimatedDiv delay={props.index != undefined ? 0.07 * props.index : 0}>
      <Link href={href} className="treeItem clickableItem">
        {/* <Image src="/icons/folder.svg" alt="folder" width={25} height={25} /> */}
        <span>
          <span style={{color: "var(--blue)"}}>/</span>
          {props.folder.name}
        </span>
      </Link>
    </AnimatedDiv>
  );
}

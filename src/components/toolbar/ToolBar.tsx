"use client";;
import "./style.scss";
import { usePathname } from "next/navigation";
import Link from "next/link";
import ToolBarBackButton from "./ToolBarBackButton";
import { pushFile } from "@/src/server-actions/push-file";
import { itemsToPush } from "@/src/utils/signals";

/**
 * Bottom toolbar with multiple functions based on the current page.
 */
export default function ToolBar() {
  const pathName = usePathname();

  const sections = pathName.split("/").filter((x) => x);

  const editorHref = `/${sections.slice(0, -1).join("/")}`;

  const filePath = sections.slice(1, sections.length).join("/");

  const handlePush = async () => {
    const fileContent = itemsToPush.value.find((item) => item.path === filePath);
    if (!fileContent) return;
    const result = await pushFile(filePath, fileContent.content);
  };

  return (
    <div id="toolBar">
      <ToolBarBackButton sections={sections} />

      {pathName.includes("file-editor") && !pathName.includes("preview") && (
        <Link href={`${pathName}/preview`} className="mainButton">
          <span>Preview</span>
        </Link>
      )}

      {pathName.includes("file-editor") && pathName.includes("preview") && (
        <Link href={`${editorHref}`} className="mainButton">
          <span>Editor</span>
        </Link>
      )}

      {pathName.includes("file-editor") && (
        <button className="mainButton" onClick={handlePush}>
          <span>Push</span>
        </button>
      )}
    </div>
  );
}

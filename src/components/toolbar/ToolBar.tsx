"use client";;
import "./style.scss";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import ToolBarBackButton from "./ToolBarBackButton";

/**
 * Bottom toolbar with multiple functions based on the current page.
 */
export default function ToolBar() {
  const router = useRouter();
  const pathName = usePathname();

  const sections = pathName.split("/").filter((x) => x);

  const editorHref = `/${sections.splice(0, -1).join("/")}`;

  return (
    <div id="toolBar">
     
      <ToolBarBackButton sections={sections} />

      {pathName.includes("file-editor") && !pathName.includes("preview") && (
        <Link href={`${pathName}/preview`} className="mainButton">
          <span className="mx-5">Preview</span>
        </Link>
      )}

      {pathName.includes("file-editor") && pathName.includes("preview") && (
        <Link href={`${editorHref}`} className="mainButton">
          <span className="mx-5">Editor</span>
        </Link>
      )}
    </div>
  );
}

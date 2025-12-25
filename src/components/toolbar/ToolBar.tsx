"use client";
import "./toolbar.scss";
import { usePathname } from "next/navigation";
import ToolBarBackButton from "./ToolBarBackButton";
import EditorToolBarButtons from "./EditorToolBarButtons";
import { PagesEnum } from "@/src/utils/enums";
import ExplorerToolBarButtons from "./ExplorerToolBarButtons";

/**
 * Bottom toolbar with multiple functions based on the current page.
 */
export default function ToolBar() {
  const pathName = usePathname();

  const sections = pathName.split("/").filter((x) => x);

  if (pathName.includes(`/${PagesEnum.login}`)) return null;

  return (
    <div id="toolBar">
      <ToolBarBackButton sections={sections} />
      
      {sections[0] === PagesEnum.fileExplorer && <ExplorerToolBarButtons />}

      {sections[0] === PagesEnum.fileEditor && <EditorToolBarButtons sections={sections} />}
    </div>
  );
}
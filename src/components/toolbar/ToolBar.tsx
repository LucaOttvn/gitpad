"use client";
import "./toolbar.scss";
import {usePathname} from "next/navigation";
import ToolBarBackButton from "./ToolBarBackButton";
import EditorToolBarButtons from "./EditorToolBarButtons";
import {PagesEnum} from "@/src/utils/enums";
import ExplorerToolBarButtons from "./ExplorerToolBarButtons";
import Link from "next/link";
import Image from "next/image";

/**
 * Bottom toolbar with multiple functions based on the current page.
 */
export default function ToolBar() {
  const pathName = usePathname();

  const sections = pathName.split("/").filter((x) => x);

  // The toolbar doesn't have to be visible in the login page
  if (pathName.includes(`/${PagesEnum.login}`)) return null;

  return (
    <div id="toolBar">
      {sections[0] !== PagesEnum.settings && <ToolBarBackButton sections={sections} />}

      {sections[0] === PagesEnum.fileExplorer && <ExplorerToolBarButtons />}

      {sections[0] === PagesEnum.fileEditor && <EditorToolBarButtons sections={sections} />}
      {sections[0] === PagesEnum.settings && (
        <Link href="/" className="mainButton clickableItem">
          <span>
            <Image alt="home" src='/icons/home.svg'width={25} height={25}/>
          </span>
        </Link>
      )}
    </div>
  );
}

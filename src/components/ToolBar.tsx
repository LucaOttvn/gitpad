"use client";
import Image from "next/image";
import "./shared-styles.scss";
import {usePathname, useRouter} from "next/navigation";
import Link from "next/link";

/**
 * Bottom toolbar with multiple functions.
 */
export default function ToolBar() {
  const router = useRouter();
  const pathName = usePathname();

  const sections = pathName.split("/").filter((x) => x);

  const backButtonHref = `/${sections.slice(0, sections.length - 1).join("/")}`;

  let isBackDisabled = sections.length === 0 ? " disabledLink" : " clickableItem";

  return (
    <div id="toolBar">
      {/*
       When the user is navigating through pages, the back button redirects to the previous section, regardless of the actual previous page in the browser's navigation order. 
       When the user is in the file editor instead, the url includes the file's path (which contains many sections because it has "/" for each directory), so the back button performs a router.back() because otherwise the Link would redirect to the wrong page.
       
       E.g. with <Link> 
       This url: .../file-explorer/<folderName>/<folderName>
       Becomes this: .../file-explorer/<folderName>
       This is the expected behavior

       But this: .../file-editor/<folderName>/<folderName>
       Would become .../file-editor/<folderName>/
       While it should become this instead: ../file-explorer/<previousPath>
      */}
      {sections[0] !== "file-editor" ? (
        <Link href={backButtonHref} className={"mainButton" + isBackDisabled}>
          <Image src="/icons/arrow-left.svg" alt="back" width={20} height={20} />
        </Link>
      ) : (
        <button
          className={"mainButton" + isBackDisabled}
          disabled={pathName === "/"}
          onClick={() => {
            router.back();
          }}
        >
          <Image src="/icons/arrow-left.svg" alt="back" width={20} height={20} />
        </button>
      )}
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";
import {usePathname, useRouter} from "next/navigation";

interface ToolBarBackButtonProps {
  sections: string[];
}

export default function ToolBarBackButton(props: ToolBarBackButtonProps) {
  const pathName = usePathname();
  const router = useRouter();

  let isBackDisabled = props.sections.length === 1 ? " disabledLink" : " clickableItem";

  // Slice from 1 because the base url is /file-explorer
  let backButtonHref = `/file-explorer/${props.sections.slice(1, props.sections.length - 1).join("/")}`;

  // When the user clicks on the back button but it's in preview mode, they don't want to go back to the actual previous page, but to "file-editor" instead, so handle this
  if (pathName.includes("preview")) {
    console.log(backButtonHref);
    backButtonHref =
      "/" +
      backButtonHref
        .split("/")
        .slice(0, props.sections.length - 1)
        .filter((x) => x)
        .join("/");
  }

  return (
    <>
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

      {/* Normal back button behavior */}
      {props.sections[0] !== "file-editor" && (
        <Link href={backButtonHref} className={"mainButton" + isBackDisabled}>
          <Image src="/icons/arrow-left.svg" alt="back" width={20} height={20} />
        </Link>
      )}

      {/* If in file editor and preview mode */}
      {props.sections[0] === "file-editor" && props.sections.includes("preview") && (
        <Link href={backButtonHref} className={"mainButton" + isBackDisabled}>
          <Image src="/icons/arrow-left.svg" alt="back" width={20} height={20} />
        </Link>
      )}

      {/* If in file editor in editor mode */}
      {props.sections[0] === "file-editor" && !props.sections.includes("preview") && (
        <button
          className={"mainButton" + isBackDisabled}
          disabled={props.sections.length === 0}
          onClick={() => {
            router.back();
          }}
        >
          <Image src="/icons/arrow-left.svg" alt="back" width={20} height={20} />
        </button>
      )}
    </>
  );
}

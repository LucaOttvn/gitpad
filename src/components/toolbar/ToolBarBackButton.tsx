import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { PagesEnum } from "@/src/utils/enums";
import { toast } from "react-hot-toast";
import { itemToPush } from "@/src/utils/signals";

interface ToolBarBackButtonProps {
  sections: string[];
}

export default function ToolBarBackButton(props: ToolBarBackButtonProps) {
  const pathName = usePathname();
  const router = useRouter();

  let isBackDisabled = props.sections.length === 1 ? " disabledItem" : " clickableItem";

  const filePath = props.sections.slice(1).join("/");

  // Slice from 1 because the base url is /file-explorer
  let backButtonHref = `/${PagesEnum.fileExplorer}/${props.sections.slice(1, props.sections.length - 1).join("/")}`;

  // When the user clicks on the back button but it's in preview mode, they don't want to go back to the actual previous page, but to "file-editor" instead, so handle this
  if (pathName.includes("preview")) {
    backButtonHref =
      "/" +
      backButtonHref
        .split("/")
        .slice(0, props.sections.length - 1)
        .filter((x) => x)
        .join("/");
  }

  // In all the cases when the back button has to simply to a router.back() => isStandardBack = true
  let isStandardBack = false;
  switch (props.sections[0]) {
    case PagesEnum.fileEditor:
      if (!props.sections.includes("preview")) isStandardBack = true;
      break;
    case PagesEnum.settings:
      isStandardBack = true;
      break;

    default:
      break;
  }

  const handleBack = () => {
    // If there are no updates to push for this file, just go back
    if (!itemToPush.value || itemToPush.value.path != filePath) {
      router.back();
      itemToPush.value = undefined;
      return;
    }

    toast(
      (t) => (
        <div className="flex flex-col gap-3">
          <span>
            There are some updates to push. <br /> If you go back now any update will be lost
          </span>
          <div className="flex gap-2 justify-end pt-2">
            <button
              onClick={() => {
                toast.dismiss(t.id);
                router.back();
                itemToPush.value = undefined;
              }}
              className="mainButton clickableItem"
              style={{
                color: "var(--white)",
              }}
            >
              <span>Discard & Leave</span>
            </button>
            <button onClick={() => toast.dismiss(t.id)} className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
              Stay
            </button>
          </div>
        </div>
      ),
      {
        duration: Infinity,
      }
    );
  };

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
      {/* Back button behavior in file-explorer */}
      {props.sections[0] === PagesEnum.fileExplorer && (
        <Link href={backButtonHref} className={"mainButton" + isBackDisabled}>
          <Image src="/icons/back.svg" alt="back" width={25} height={25} />
        </Link>
      )}
      {/* If in file editor and preview mode */}
      {props.sections[0] === PagesEnum.fileEditor && props.sections.includes("preview") && (
        <Link href={backButtonHref} className={"mainButton" + isBackDisabled}>
          <Image src="/icons/back.svg" alt="back" width={25} height={25} />
        </Link>
      )}
      {/* If in file editor in editor mode */}
      {isStandardBack && (
        <button className="mainButton clickableItem" onClick={handleBack}>
          <Image src="/icons/back.svg" alt="back" width={25} height={25} />
        </button>
      )}
    </>
  );
}

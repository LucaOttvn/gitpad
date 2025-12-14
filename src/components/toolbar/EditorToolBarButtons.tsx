"use client";

import {deleteItem} from "@/src/server-actions/delete-item";
import {pushFile} from "@/src/server-actions/push-file";
import {itemsToPush} from "@/src/utils/signals";
import {useSignal, useSignalEffect} from "@preact/signals-react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useState} from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import {useRouter} from "next/navigation";

interface EditorToolBarButtonsProps {
  sections: string[];
}

/**
 * Buttons that are visible in the ToolBar when the user is in the file editor page.
 */
export default function EditorToolBarButtons(props: EditorToolBarButtonsProps) {
  useSignal();
  const router = useRouter();

  const pathName = usePathname();

  const [itemToUpdate, setItemToUpdate] = useState<{path: string; content: string}>();

  const editorHref = `/${props.sections.slice(0, -1).join("/")}`;

  const filePath = props.sections.slice(1).join("/");

  useSignalEffect(() => {
    // Every time that itemsToPush gets updated, update the state so that when handlePush() is triggered, it has its latest value
    const foundItemToUpdate = itemsToPush.value.find((item) => item.path === filePath);
    setItemToUpdate(foundItemToUpdate);
  });


  const handlePush = async () => {
    if (!itemToUpdate) return;
    try {
      const result = await pushFile(filePath, itemToUpdate.content);
      if (result.status == "ok") return toast.success("File pushed!");
    } catch (error) {
      console.error(error);
      toast.error("Push failed");
    }
  };

  const handleDelete = async () => {
    try {
      const result = await deleteItem(filePath);
      if (!result) throw Error("Item deletion failed");
      toast.success("Item deleted successfully");
      router.back();
    } catch (error) {
      console.error(error);
      toast.error("Item deletion failed");
    }
  };

  const isPreviewMode = props.sections[props.sections.length - 1] === "preview";

  return (
    <>
      {isPreviewMode ? (
        <Link href={`${editorHref}`} className="mainButton clickableItem">
          <span>Editor</span>
        </Link>
      ) : (
        <Link href={`${pathName}/preview`} className="mainButton clickableItem">
          <span>Preview</span>
        </Link>
      )}

      <button className="mainButton clickableItem" disabled={!itemToUpdate} onClick={handlePush}>
        <span>Push</span>
      </button>
      {/* Trash button */}
      <button
        onClick={() => {
          handleDelete();
        }}
        className="mainButton clickableItem"
      >
        <span>
          <Image src="/icons/trash.svg" alt="folder" width={20} height={20} />
        </span>
      </button>
    </>
  );
}

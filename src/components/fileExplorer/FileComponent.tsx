"use client";
import {TreeItem} from "@/src/utils/models";
import Link from "next/link";
import toast from "react-hot-toast";
import AnimatedDiv from "../animated/AnimatedDiv";
import {useSignals} from "@preact/signals-react/runtime";
import {selectedFiles} from "@/src/utils/signals";

interface FileComponentProps {
  file: TreeItem;
  index?: number;
}

export default function FileComponent(props: FileComponentProps) {
  
  useSignals();

  const [fileName, fileExtension] = props.file.name.split(".");

  const isExtensionValid = fileExtension === "md" || fileExtension === "txt";

  // In selection mode, check if the file is selected already when clicked, if it is, remove it from the list, otherwise add it.
  const handleSelectedFiles = (selectedItem: string) => {
    if (!selectedFiles.value) return;
    const isItemIncluded = selectedFiles.value.includes(selectedItem);
    // Remove the item from the list.
    if (isItemIncluded) {
      const filteredItems = selectedFiles.value.filter((item) => item !== selectedItem);
      selectedFiles.value = filteredItems;
      return;
    }
    // Add the item to the list.
    selectedFiles.value = [...selectedFiles.value, selectedItem];
  };

  return (
    <AnimatedDiv
      delay={props.index != undefined ? 0.07 * props.index : 0}
      className="w-full start"
      onClick={() => {
        if (!selectedFiles.value) return;
        handleSelectedFiles(props.file.path);
      }}
    >
      {/* Radio button for edit mode */}
      {selectedFiles.value && (
        <AnimatedDiv>
          <input type="checkbox" name="item-select" checked={selectedFiles.value.includes(props.file.path)} onChange={() => {}} className="ml-2" />
        </AnimatedDiv>
      )}
      {isExtensionValid ? (
        <Link
          href={`/file-editor/${props.file.path}`}
          className="treeItem clickableItem"
          key={props.file.path}
          onClick={(e) => {
            if (!selectedFiles.value) return;
            // Avoid redirecting if edit mode is on.
            e.preventDefault();
          }}
        >
          <span>{fileName}</span>
          <span
            style={{
              color: "var(--blue)",
              background: "var(--white)",
              fontWeight: "bold",
              paddingRight: "0.2rem",
            }}
          >
            {"." + fileExtension}
          </span>
        </Link>
      ) : (
        <div
          key={props.file.path}
          // For the files that are not .txt or .md, make them clickable if selection mode is on.
          className={`treeItem ${selectedFiles.value ? "clickableItem" : "disabledItem"}`}
          style={{
            pointerEvents: "all",
          }}
          onClick={() => {
            if (selectedFiles.value) return;
            toast.error("GitPad can only handle .md or .txt files");
          }}
        >
          <span>{props.file.name}</span>
        </div>
      )}
    </AnimatedDiv>
  );
}

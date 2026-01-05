"use client";;
import { TypesEnum } from "@/src/utils/enums";
import FileComponent from "./FileComponent";
import FolderComponent from "./FolderComponent";
import { TreeItem } from "@/src/utils/models";
import { useSignals } from "@preact/signals-react/runtime";

interface FileExplorerListProps {
  items: TreeItem[];
}

/**
 * The list container for files and folders.  
 * It renders a Folder or a File component based on the item.type.
 */
export default function FileExplorerList(props: FileExplorerListProps) {
  useSignals();

  return (
    <div className="fileExplorerList">
      {props.items.map((item, index) => {
        if (item.type === TypesEnum.tree) return <FolderComponent key={item.path} folder={item} index={index} />;
        return <FileComponent key={item.path} file={item} index={index} />;
      })}
    </div>
  );
}

import { TreeItem } from "@/src/utils/models";
import "./style.scss";
import Link from "next/link";
import Image from "next/image";

interface FolderProps {
  folder: TreeItem;
}
export default async function Folder(props: FolderProps) {
 
  return (
    <Link href={`/file-explorer/${props.folder.name}`} className="folder">
      <Image src='/icons/folder.svg' alt="folder" width={20} height={20}/>
      <span>
        {props.folder.name}
      </span>
    </Link>
  );
}

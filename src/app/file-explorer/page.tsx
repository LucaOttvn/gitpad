import FileComponent from "@/src/components/FileComponent";
import Folder from "@/src/components/FolderComponent";
import getRepoContents from "@/src/server-actions/get-repo";
import { TypesEnum } from "@/src/utils/enums";
import { TreeItem } from "@/src/utils/models";
import { buildTree } from "path-mapper-json";

export default async function FileExplorer({children}: {children: React.ReactNode}) {
  const response = await getRepoContents();

  const contents = response.tree.map((item: any) => {
    const sections = item.path.split("/");
    const name = sections[sections.length];
    return {
      name: name,
      type: item.type,
      path: item.path,
      children: [],
    };
  });

  const paths = contents.map((folder: {path: string}) => folder.path);

  console.log(contents);

  const tree: TreeItem[] = buildTree(paths);

  console.log(tree);

  return (
      <div className="fileExplorer">
        {tree.map((item) => {
          if (item.type === TypesEnum.tree) return <Folder key={item.path} folder={item} />;
          return <FileComponent file={item} />;
        })}
      </div>
  );
}

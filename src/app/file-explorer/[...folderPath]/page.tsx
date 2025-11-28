import Folder from "@/src/components/folder/Folder";
import getRepoContents from "@/src/server-actions/get-repo";
import {TypesEnum} from "@/src/utils/enums";
import {TreeItem} from "@/src/utils/models";
import {buildTree} from "path-mapper-json";

interface FolderPageProps {
  params: Promise<{folderPath: string[]}>;
}

export default async function FolderPage(props: FolderPageProps) {
  const {folderPath} = await props.params;

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

  const findByPath = (tree: TreeItem[], targetPath: string): TreeItem | null => {
    for (const node of tree) {
      if (node.path === targetPath) return node;

      if (node.type === TypesEnum.tree && node.children.length > 0) {
        const found = findByPath(node.children, targetPath);
        if (found) return found;
      }
    }
    return null;
  };

  const foundFolder = findByPath(tree, folderPath.join("/"));

  if (!foundFolder) return <span>No folders</span>;

  return (
    <div className="fileExplorer">
      {foundFolder.children.map((item) => {
        if (item.type === TypesEnum.tree) return <Folder key={item.path} folder={item} />;
        return <div className="file" key={item.path}>{item.name}</div>;
      })}
    </div>
  );
}

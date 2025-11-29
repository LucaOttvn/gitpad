import BreadCrumbs from "@/src/components/BreadCrumbs";
import FileComponent from "@/src/components/FileComponent";
import FolderComponent from "@/src/components/FolderComponent";
import ToolBar from "@/src/components/ToolBar";
import getRepoContents from "@/src/server-actions/get-repo";
import {TypesEnum} from "@/src/utils/enums";
import {TreeItem} from "@/src/utils/models";
import {buildTree, findByPath} from "path-mapper-json";

interface FolderPageProps {
  params: Promise<{folderPath: string[]}>;
}

export default async function FolderPage(props: FolderPageProps) {
  // When folderPath is undefined, you're in the /root of the tree
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

  const paths = contents.map((item: TreeItem) => item.path);

  const tree: TreeItem[] = buildTree(paths);

  let foundFolder;

  if (folderPath) foundFolder = findByPath(tree, folderPath.join("/"));

  if (folderPath && !foundFolder) return <span>Empty folder</span>;

  // If folderPath is undefined, cycle through the whole tree, otherwise cycle through the current folder's children
  const arr = !folderPath ? tree : foundFolder!.children;

  arr.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="fileExplorer">
      <BreadCrumbs />
      <div className="fileExplorerGrid">
        {/* For the rest of the tree, show the children */}
        {arr.map((item, index) => {
          if (item.type === TypesEnum.tree) return <FolderComponent key={item.path} folder={item} index={index} />;
          return <FileComponent key={item.path} file={item} index={index} />;
        })}
      </div>
      <ToolBar />
    </div>
  );
}

import FileEditor from "@/src/components/FileEditor";
import getFile from "@/src/server-actions/get-file";
import Markdown from "react-markdown";

interface FileEditorPageProps {
  params: Promise<{filePath: string[]}>;
}

export default async function FileEditorPage(props: FileEditorPageProps) {
  const {filePath} = await props.params;

  const isPreviewMode = filePath[filePath.length - 1] === "preview";

  console.log(filePath)

  const filePathToFind = isPreviewMode ? filePath.splice(filePath.length -1) : filePath

  const fileContent: string = await getFile(filePathToFind.join("/"));

  return (
    <div className="w-full h-full ">
      <FileEditor isPreviewMode={isPreviewMode} fileContent={fileContent} />
    </div>
  );
}

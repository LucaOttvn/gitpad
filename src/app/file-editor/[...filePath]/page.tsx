import getFile from "@/src/server-actions/get-file";
import Markdown from "react-markdown";

interface FileEditorProps {
  params: Promise<{filePath: string[]}>;
}

export default async function FileEditor(props: FileEditorProps) {
  const {filePath} = await props.params;

  const fileContent: string = await getFile(filePath.join("/"));

  return (
    <div
      className="w-full h-full overflow-auto prose dark:prose-invert"
      style={{
        padding: "1rem",
        paddingBottom: "6rem",
      }}
    >
      {fileContent && <Markdown>{fileContent}</Markdown>}
    </div>
  );
}

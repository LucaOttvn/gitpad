import FileEditor from "@/src/components/FileEditor";
import getFile from "@/src/server-actions/get-file";

interface FileEditorPageProps {
  params: Promise<{filePath: string[]}>;
}

/**
 * Server-side wrapper page for the FileEditor client component.
 */
export default async function FileEditorPage(props: FileEditorPageProps) {
  const {filePath} = await props.params;

  const isPreviewMode = filePath[filePath.length - 1] === "preview";

  // If preview mode => remove the last section of the url ("/preview").
  const filePathToFind = isPreviewMode ? filePath.slice(0, -1) : filePath;

  const fileContent = await getFile(filePathToFind.join("/"));

  return (
    <div className="w-full h-full">
      <FileEditor filePath={filePath.join("/")} fileContent={fileContent || ''} isPreviewMode={isPreviewMode} />
    </div>
  );
}

import getFile from "@/src/server-actions/get-file";

interface FileEditorProps {
    params: Promise<{filePath: string[]}>
}

export default async function FileEditor(props: FileEditorProps) {
  const {filePath} = await props.params

  console.log(filePath)
  const fileContent = await getFile(filePath.join('/'));
  return <div className="w-full h-full flex justify-start items-start overflow-auto" style={{
    padding: '1rem',
    paddingBottom: '6rem',
  }}>
   <span> {fileContent}</span>
  </div>;
}

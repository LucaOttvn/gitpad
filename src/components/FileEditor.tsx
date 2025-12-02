'use client'
import { useState } from "react";
import Markdown from "react-markdown";

interface FileEditorProps {
  isPreviewMode: boolean;
  fileContent: string;
}

export default function FileEditor(props: FileEditorProps) {
  const [text, setText] = useState(props.fileContent)
  return (
    <div className="w-full h-full">
      {props.isPreviewMode ? (
        <div
          className="w-full h-full flex flex-col justify-start items-start overflow-auto prose dark:prose-invert"
          style={{
            padding: "1rem",
            paddingBottom: "6rem",
          }}
        >
          {props.fileContent && <Markdown>{props.fileContent}</Markdown>}
        </div>
      ) : (
        <textarea value={text} onChange={(event) => {
          setText(event.target.value)
        }}></textarea>
      )}
    </div>
  );
}

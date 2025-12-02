"use client";
import {ChangeEvent, useState} from "react";
import Markdown from "react-markdown";
import {itemsToPush} from "../utils/signals";

interface FileEditorProps {
  filePath: string;
  fileContent: string;
  isPreviewMode: boolean;
}

export default function FileEditor(props: FileEditorProps) {
  const [text, setText] = useState(props.fileContent);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = event.target.value;
    setText(newContent);

    const foundIndex = itemsToPush.value.findIndex((item) => item.path === props.filePath);

    if (foundIndex !== -1) {
      itemsToPush.value = itemsToPush.value.map((item, index) => (index === foundIndex ? {...item, content: newContent} : item));
      return;
    }
    itemsToPush.value = [
      ...itemsToPush.value,
      {
        path: props.filePath,
        content: newContent,
      },
    ];
  };

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
        <textarea value={text} onChange={handleChange}></textarea>
      )}
    </div>
  );
}

"use client";
import {ChangeEvent, useState} from "react";
import Markdown from "react-markdown";
import {useSignal} from "@preact/signals-react";
import AnimatedDiv from "./animated/AnimatedDiv";
import { itemToPush } from "../utils/signals";

interface FileEditorProps {
  filePath: string;
  fileContent: string;
  isPreviewMode: boolean;
}

/**
 * This component handles the file updates.  
 * If props.isPreviewMode is true, it shows the formatted markdown result, otherwise it renders a plain textarea to edit the text.
 */
export default function FileEditor(props: FileEditorProps) {
  useSignal();

  const [text, setText] = useState(props.fileContent);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const updatedText = event.target.value;
    setText(updatedText);

    // If there's an update in the current text compared to the starting version
    if (text !== props.fileContent) {
      itemToPush.value = {path: props.filePath, content: updatedText}
      localStorage.setItem("itemToPush", props.filePath);
      return
    }
    localStorage.removeItem("itemToPush");
  };

  return (
    <AnimatedDiv className="w-full h-full">
      {props.isPreviewMode ? (
        <div
          className="markdown w-full h-full flex flex-col justify-start items-start overflow-auto prose dark:prose-invert"
          style={{
            padding: "1rem",
            paddingBottom: "6rem",
          }}
        >
          {props.fileContent && <Markdown>{props.fileContent}</Markdown>}
        </div>
      ) : (
        <textarea name="Textarea" value={text} onChange={handleChange}></textarea>
      )}
    </AnimatedDiv>
  );
}

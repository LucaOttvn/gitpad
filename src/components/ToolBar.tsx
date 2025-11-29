"use client";
import Image from "next/image";
import "./shared-styles.scss";
import {useRouter} from "next/navigation";

interface ToolBarProps {}

export default function ToolBar(props: ToolBarProps) {
  const router = useRouter();
  return (
    <div id="toolBar">
      <button
        className="mainButton"
        onClick={() => {
          router.back();
        }}
      >
        <Image src="/icons/arrow-left.svg" alt="back" width={20} height={20} />
      </button>
      <button
        className="mainButton"
        onClick={() => {
          router.forward();
        }}
      >
        <Image src="/icons/arrow-right.svg" alt="back" width={20} height={20} />
      </button>
    </div>
  );
}

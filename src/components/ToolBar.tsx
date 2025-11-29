"use client";;
import Image from "next/image";
import "./shared-styles.scss";
import { usePathname, useRouter } from "next/navigation";

export default function ToolBar() {
  const router = useRouter();
  const pathName = usePathname()

  return (
    <div id="toolBar">
      <button
        className="mainButton clickableItem"
        disabled={pathName === '/'}
        onClick={() => {
          router.back();
        }}
      >
        <Image src="/icons/arrow-left.svg" alt="back" width={20} height={20} />
      </button>
    </div>
  );
}

import Image from "next/image";
import {useState} from "react";
import BottomSheet from "../bottom-sheet/BottomSheet";
import { redirect } from "next/navigation"
import { PagesEnum } from "@/src/utils/enums";

export default function ExplorerToolBarButtons() {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const handleBottomSheet = (value: boolean) => {
    setIsBottomSheetOpen(value);
  };

  return (
    <div className="w-full flex items-center justify-between gap-2">
      <button onClick={() => setIsBottomSheetOpen(true)} className="mainButton clickableItem">
        <span>
          <Image src="/icons/add.svg" alt="folder" width={20} height={20} />
        </span>
      </button>
      <button className="mainButton clickableItem" onClick={()=> {
        redirect('/')
      }}>
        <span>
          <Image src="/icons/home.svg" alt="folder" width={20} height={20} />
        </span>
      </button>
      <div className="flex gap-2">
        <button className="mainButton clickableItem" disabled>
          <span>
            <Image src="/icons/search.svg" alt="folder" width={20} height={20} />
          </span>
        </button>
        <button className="mainButton clickableItem" disabled>
          <span>
            <Image src="/icons/settings.svg" alt="folder" width={20} height={20} />
          </span>
        </button>
      </div>
      <BottomSheet isOpen={isBottomSheetOpen} handleBottomSheet={handleBottomSheet} />
    </div>
  );
}

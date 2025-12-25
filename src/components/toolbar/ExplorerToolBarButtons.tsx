import Image from "next/image";
import { useState } from "react";
import BottomSheet from "../bottom-sheet/BottomSheet";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PagesEnum } from "@/src/utils/enums";

export default function ExplorerToolBarButtons() {
  const pathName = usePathname();

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const handleBottomSheet = (value: boolean) => {
    setIsBottomSheetOpen(value);
  };

  return (
    <>
      {/* Plus button */}
      <button onClick={() => setIsBottomSheetOpen(true)} className="mainButton clickableItem">
        <span>
          <Image src="/icons/add.svg" alt="folder" width={25} height={25} />
        </span>
      </button>
      {/* Settings button */}
      <Link className="mainButton clickableItem" href={`/${PagesEnum.settings}`}>
        <span>
          <Image src="/icons/settings.svg" alt="folder" width={25} height={25} />
        </span>
      </Link>
      <BottomSheet isOpen={isBottomSheetOpen} handleBottomSheet={handleBottomSheet} />
    </>
  );
}

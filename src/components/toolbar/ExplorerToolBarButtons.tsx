import Image from "next/image";
import {useState} from "react";
import BottomSheet from "../bottom-sheet/BottomSheet";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {PagesEnum} from "@/src/utils/enums";
import {deleteItem} from "@/src/server-actions/delete-item";

export default function ExplorerToolBarButtons() {
  const pathName = usePathname();

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const handleBottomSheet = (value: boolean) => {
    setIsBottomSheetOpen(value);
  };

  return (
    <div className="w-full start">
      <div className="w-full flex gap-2">
        {/* Search button */}
        <button className="mainButton clickableItem" disabled>
          <span>
            <Image src="/icons/search.svg" alt="folder" width={20} height={20} />
          </span>
        </button>
        {/* Plus button */}
        <button onClick={() => setIsBottomSheetOpen(true)} className="mainButton clickableItem">
          <span>
            <Image src="/icons/add.svg" alt="folder" width={20} height={20} />
          </span>
        </button>
      </div>
      {/* Settings button */}
      <Link className="mainButton clickableItem" href={`/${PagesEnum.settings}`}>
        <span>
          <Image src="/icons/settings.svg" alt="folder" width={20} height={20} />
        </span>
      </Link>
      <BottomSheet isOpen={isBottomSheetOpen} handleBottomSheet={handleBottomSheet} />
    </div>
  );
}

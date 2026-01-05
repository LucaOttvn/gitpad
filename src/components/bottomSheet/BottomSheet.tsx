import {BottomSheetsEnum} from "@/src/utils/enums";
import "./bottomSheet.scss";
import {Drawer, DrawerContent, DrawerHeader, DrawerBody} from "@heroui/drawer";
import {HeroUIProvider} from "@heroui/system";
import CreateItemForm from "../forms/CreateItemForm";

interface BottomSheetProps {
  currentBottomSheet: BottomSheetsEnum | null;
  handleBottomSheet: (value: BottomSheetsEnum | null) => void;
}

/**
 * The main bottomsheet component, it can conditionally render children based on props.currentBottomSheet.
 */
export default function BottomSheet(props: BottomSheetProps) {
  return (
    <HeroUIProvider>
      <Drawer
        isOpen={props.currentBottomSheet !== null}
        placement="bottom"
        className="bottomSheet"
        hideCloseButton
        backdrop="blur"
        onOpenChange={() => {
          props.handleBottomSheet(null);
        }}
        motionProps={{
          variants: {
            enter: {
              opacity: 1,
              y: 0,
            },
            exit: {
              y: 100,
              opacity: 0,
            },
          },
        }}
      >
        <DrawerContent className="bottomSheetContent">
          {(onClose) => (
            <>
              <DrawerHeader className="w-full center">{props.currentBottomSheet}</DrawerHeader>
              <DrawerBody>
                {props.currentBottomSheet === BottomSheetsEnum.createItem && <CreateItemForm handleBottomSheet={props.handleBottomSheet} />}
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </HeroUIProvider>
  );
}

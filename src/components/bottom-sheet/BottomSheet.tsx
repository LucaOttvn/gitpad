import { createItem } from "@/src/server-actions/create-item";
import { usePathname } from "next/navigation";
import { useActionState } from "react";
import TextInput from "../inputs/TextInput";
import toast from "react-hot-toast";
import "./bottomSheet.scss";
import { Drawer, DrawerContent, DrawerHeader, DrawerBody } from "@heroui/drawer";
import { HeroUIProvider } from "@heroui/system";

interface BottomSheetProps {
  isOpen: boolean;
  handleBottomSheet: (value: boolean) => void;
}

export default function BottomSheet(props: BottomSheetProps) {
  const pathName = usePathname();

  const sections = pathName
    .split("/")
    .filter((x) => x)
    .slice(1);

  const [state, handleCreateFile, isPending] = useActionState(async (prevState: any, formData: FormData) => {
    const filePathName = sections.join("/");
    const newItemName = formData.get("newItemName") as string;

    if (!newItemName || newItemName.trim() === "") {
      return {success: false, message: "Name cannot be empty"};
    }

    const trimmedName = newItemName.trim();

    // Check if it's a folder (ends with /) or a file with one of the allowed extensions
    if (trimmedName.startsWith("/") || trimmedName.endsWith(".txt") || trimmedName.endsWith(".md")) {
      try {
        // If filePathName is empty (then the user is creating a new item in the root folder), exclude the slash
        const promise = createItem(`${filePathName ? filePathName + "/" : ""}${trimmedName}`);

        await toast.promise(promise, {
          loading: "Creating item...",
          success: "Item created successfully!",
          error: "Error while creating",
        });
        props.handleBottomSheet(false);
        setTimeout(() => {
          location.reload();
        }, 500);
        return {success: true, message: "Item created successfully"};
      } catch (error) {
        console.error(error);
        props.handleBottomSheet(false);
      }
    }

    // Block other extensions
    return {
      success: false,
      message: "Only .txt, .md files or folders (prefix with /) are allowed",
    };
  }, null);

  return (
    <HeroUIProvider>
      <Drawer isOpen={props.isOpen} placement="bottom" className="bottomSheet" hideCloseButton backdrop="blur" onOpenChange={() => {
        props.handleBottomSheet(false)
      }}>
        <DrawerContent className="bottomSheetContent">
          {(onClose) => (
            <>
              <DrawerHeader className="w-full center mb-4">Create file or folder</DrawerHeader>
              <DrawerBody>
                <form action={handleCreateFile} className="flex flex-col gap-6">
                  <div className="flex flex-col gap-5">
                    <span className="instructions">Prefix with / to create a folder. <br /> Use .txt or .md for files.</span>
                    <TextInput name="newItemName" placeholder="Insert name" state={state} />
                  </div>

                  <div className="w-full center gap-4 flex">
                    <button type="button" className="mainButton clickableItem" onClick={() => props.handleBottomSheet(false)} disabled={isPending}>
                      <span>Cancel</span>
                    </button>
                    <button
                      type="submit"
                      className="mainButton clickableItem"
                      style={{
                        background: "var(--darkWhite)",
                        color: "var(--black)",
                      }}
                      disabled={isPending}
                    >
                      <span>{isPending ? "Creating..." : "Create"}</span>
                    </button>
                  </div>
                </form>
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </HeroUIProvider>
  );
}

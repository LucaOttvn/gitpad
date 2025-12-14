import { createItem } from "@/src/server-actions/create-item";
import { usePathname, useRouter } from "next/navigation";
import { useActionState } from "react";
import { Sheet } from "react-modal-sheet";
import TextInput from "../inputs/TextInput";
import toast from "react-hot-toast";

interface BottomSheetProps {
  isOpen: boolean;
  handleBottomSheet: (value: boolean) => void;
}

export default function BottomSheet(props: BottomSheetProps) {
  const router = useRouter()
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
    if (trimmedName.endsWith("/") || trimmedName.endsWith(".txt") || trimmedName.endsWith(".md")) {
      try {
        // If filePathName is empty (then the user is creating a new item in the root folder), exclude the slash
        const response = await createItem(`${filePathName ? filePathName + "/" : ""}${trimmedName}`);
        if (!response.success) throw Error(response.message);
        props.handleBottomSheet(false);
        toast.success('Item created successfully');
        location.reload()
        return {success: true, message: 'Item created successfully'}
      } catch (error) {
        console.error(error);
        toast.error((error as any).message);
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
    <Sheet
      isOpen={props.isOpen}
      onClose={() => props.handleBottomSheet(false)}
      detent="content"
      className="bottomSheet"
      tweenConfig={{
        ease: "easeInOut",
        duration: 0.25,
      }}
    >
      <Sheet.Container className="bottomSheetContainer">
        <Sheet.Header className="bottomSheetHeader">
          <Sheet.DragIndicator />
          <h2>Create new item or folder</h2>
        </Sheet.Header>
        <Sheet.Content className="bottomSheetContent">
          <form action={handleCreateFile}>
            <TextInput name="newItemName" placeholder="Prefix with / to create folder, use .txt or .md for files" state={state} />

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
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop unstyled onTap={() => props.handleBottomSheet(false)} className="bottomSheetBackdrop" />
    </Sheet>
  );
}

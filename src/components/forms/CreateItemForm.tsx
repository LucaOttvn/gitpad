import {createItem} from "@/src/server-actions/create-item";
import {validatePath, isTextFilePath} from "@/src/utils/methods";
import {useActionState} from "react";
import toast from "react-hot-toast";
import TextInput from "../inputs/TextInput";
import {usePathname} from "next/navigation";
import {BottomSheetsEnum} from "@/src/utils/enums";
import { selectedFiles } from "@/src/utils/signals";

interface CreateItemFormProps {
  handleBottomSheet: (value: BottomSheetsEnum | null) => void;
}

export default function CreateItemForm(props: CreateItemFormProps) {
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

    const validationResult = validatePath(trimmedName);
    if (validationResult !== null) {
      toast.error(validationResult);
      return;
    }

    try {
      const promise = createItem(`${filePathName ? filePathName + "/" : ""}${trimmedName}`, isTextFilePath(trimmedName));

      await toast.promise(promise, {
        loading: "Creating item...",
        success: "Item created successfully!",
        error: "Error while creating",
      });

      props.handleBottomSheet(null);
      
      if (!selectedFiles.value) location.reload();
      
      return {success: true, message: "Item created successfully"};
    } catch (error) {
      console.error(error);
      props.handleBottomSheet(null);
    }

    // Block other extensions
    return {
      success: false,
      message: "Only .txt, .md files or folder names are allowed",
    };
  }, null);

  return (
    <form action={handleCreateFile} className="flex flex-col gap-6">
      <div className="flex flex-col gap-5">
        <span className="instructions">
          Type a name to create a folder. <br /> Add .txt or .md to create a file.
        </span>
        <TextInput name="newItemName" placeholder="Insert name" state={state || null} />
      </div>

      <div className="w-full center gap-4 flex">
        <button type="button" className="mainButton" onClick={() => props.handleBottomSheet(null)} disabled={isPending}>
          <span>Cancel</span>
        </button>
        <button
          type="submit"
          className="mainButton"
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
  );
}

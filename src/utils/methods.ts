/**
 * Check if the input path respects all the requirements for a file/folder name
 * @param input 
 */
export function validatePath(input: string): string | null {
  const path = input.trim();

  if (!path) return "Path cannot be empty";
  if (path.startsWith("/")) return "Do not start with '/'";

  // only allowed chars
  if (!/^[A-Za-z0-9._\-\/]+$/.test(path)) {
    return "Use only letters, numbers, '-', '_', '.', and '/'";
  }

  if (path.includes("//")) return "Path cannot contain '//'";

  const segments = path.split("/");
  for (const seg of segments) {
    if (!seg) return "Each folder/file name must be non-empty";
    if (seg === "." || seg === "..") return "'.' and '..' are not allowed";
    if (seg.length > 100) return "Each segment must be <= 100 characters";
  }

  // Extension check: get last segment, check for .md or .txt
  const lastSegment = segments[segments.length - 1];
  const dotIndex = lastSegment.lastIndexOf(".");
  const hasExtension = dotIndex > 0 && dotIndex < lastSegment.length - 1;
  const ext = hasExtension ? lastSegment.slice(dotIndex).toLowerCase() : "";

  if (hasExtension && ext !== ".md" && ext !== ".txt") {
    return "File must be .md or .txt";
  }

  return null;
}


export function isTextFilePath(path: string): boolean {
  const trimmed = path.trim();
  if (!trimmed) return false;

  // Get last segment after /.
  const lastSegment = trimmed.split("/").pop()!;

  // Check whether the lastSegment contains an extension (.md or .txt).
  // If it does, it's a file, otherwise it's a folder.
  return /\.(md|txt)$/i.test(lastSegment);
}

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

  return null;
}

export function isTextFilePath(path: string): boolean {
  const trimmed = path.trim();
  if (!trimmed) return false;

  // get last segment after /
  const lastSegment = trimmed.split("/").pop()!;

  // case-insensitive
  return /\.(md|txt)$/i.test(lastSegment);
}

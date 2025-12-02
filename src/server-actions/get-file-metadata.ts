'use server'

export default async function getFileMetadata(filePath: string): Promise<{ sha: string; content: string }> {
  const url = `https://api.github.com/repos/LucaOttvn/DOCS/contents/${filePath}`;

  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json", 
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch file metadata: ${response.statusText}`);
  }
  
  return await response.json(); // JSON with sha and base64 content
}

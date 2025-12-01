'use server'

export default async function getFile(filePath: string): Promise<string> {
    const url = `https://api.github.com/repos/LucaOttvn/DOCS/contents/${filePath}`;

    const response = await fetch(url, {
        headers: {
            Accept: "application/vnd.github.raw+json",
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch file: ${response.statusText}`);
    }

    return await response.text();
}
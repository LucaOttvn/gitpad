'use server';
import getFileMetadata from "./get-file-metadata";

export async function pushFile(
    path: string,
    content: string,
    branch = 'main',
    message = 'Update via GitPad'
) {
    // Get current file SHA (skip for pure creates)
    let sha = '';
    try {
        const file = await getFileMetadata(path);
        sha = file.sha;
    } catch (error) {
        console.error(error)
    }

    const body = JSON.stringify({
        message,
        content: btoa(unescape(encodeURIComponent(content))),
        ...(sha && { sha }), // Only include sha for updates
        branch,
    });


    const url = `https://api.github.com/repos/LucaOttvn/DOCS/contents/${path}`;

    const res = await fetch(url, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            Accept: 'application/vnd.github+json',
            'Content-Type': 'application/json',
        },
        body,
    });

    if (!res.ok) {
        const err = await res.text();
        if (res.status === 409) {
            throw new Error('Conflict: File modified externally. Refresh and try again.');
        }
        if (res.status === 422) {
            throw new Error('Invalid data. Check file content.');
        }
        throw new Error(`Push failed: ${res.status} - ${err}`);
    }

    return { status: 'ok' }
}

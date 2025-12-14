'use server';
import { APIResponse } from '../utils/models';
import getGithubApiUrl from './get-github-api-url';
import { getServerSession } from 'next-auth';
import { authOptions } from '../app/api/auth/[...nextauth]/route';
import { revalidatePath } from 'next/cache';

export async function deleteItem(
    filePath: string
): Promise<APIResponse> {
    try {
        const baseUrl = await getGithubApiUrl()
        const url = `${baseUrl}/contents/${filePath}`

        const session = await getServerSession(authOptions) as any;
        if (!session || !session.user || !session.user.name || !session.user.email || !session.accessToken) {
            throw Error('No valid Github session')
        }

        // Get the current file SHA (required for deletion)
        const getResponse = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${session.accessToken}`,
                'Accept': 'application/vnd.github.v3+json',
            },
        });

        if (!getResponse.ok) {
            const error = await getResponse.json()
            throw new Error(`Failed to fetch file metadata: ${error.message}`)
        }

        const fileData = await getResponse.json();
        const sha = fileData.sha;

        const body = {
            message: `Delete ${filePath}`,
            committer: {
                name: session.user.name,
                email: session.user.email
            },
            sha: sha,
            branch: 'main',
        }

        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${session.accessToken}`,
                'Accept': 'application/vnd.github.v3+json',
            },
            body: JSON.stringify(body)
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(`GitHub API Error: ${error.message}`)
        }

        const result = await response.json()
        // Revalidate cache because after the deletion of an item an automatic router.back() will happen and the previous page has to show the updated list
        revalidatePath('/', 'layout')

        return {
            success: true,
            message: 'Item deleted successfully'
        }
    } catch (error) {
        console.error(error)
        return { message: (error as { message: string }).message, success: false }
    }
}

'use server';
import { APIResponse } from '../utils/models';
import getGithubApiUrl from './get-github-api-url';
import { getServerSession } from 'next-auth';
import { authOptions } from '../app/api/auth/[...nextauth]/route';

export async function createItem(
    filePath: string
): Promise<APIResponse> {
    try {

        const baseUrl = await getGithubApiUrl()
        const url = `${baseUrl}/contents/${filePath}`

        const session = await getServerSession(authOptions) as any;
        if (!session || !session.user || !session.user.name || !session.user.email) {
            throw Error('No valid Github session')
        }

        const body = {
            message: `Create ${filePath}`,
            committer: {
                name: session.user.name,
                email: session.user.email
            },
            content: '',
            branch: 'main',
        }

        const response = await fetch(url, {
            method: 'PUT',
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
        return {
            success: true,
            message: 'Item created successfully'
        }
    } catch (error) {
        console.error(error)
        return { message: (error as { message: string }).message, success: false }
    }
}

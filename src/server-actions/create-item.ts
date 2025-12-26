'use server';
import { APIResponse } from '../utils/models';
import getGithubApiUrl from './get-github-api-url';
import { getServerSession } from 'next-auth';
import { authOptions } from '../app/api/auth/[...nextauth]/route';

/**
 * Server action to create a file or a folder.
 */
export async function createItem(
    filePath: string,
    isFile: boolean
): Promise<APIResponse | ErrorConstructor> {
    try {

        const baseUrl = await getGithubApiUrl()

        let fileContent = ''

        if (!isFile) {

            const rawString = "Git doesn't support truly empty folders, so GitPad adds this gitkeep.txt file to ensure the folder exists in the repository. You can safely delete this file once the folder contains other files."
            const content = Buffer.from(rawString, "utf8").toString("base64");

            filePath += '/gitkeep.txt'
            fileContent = content
        }
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
            content: fileContent,
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
        throw new Error((error as { success: boolean, message: string }).message || 'GitHub API error')
    }
}

'use server'

import { base64encode } from 'byte-base64'
import { APIResponse } from '../utils/models'

export async function createItem(
    filePath: string,
    fileContent: string
): Promise<APIResponse> {
    try {
        const url = `https://api.github.com/repos/LucaOttvn/DOCS/contents/${filePath}`

        const body = {
            message: `Create ${filePath}`,
            committer: {
                name: 'Luca Ottaviano',
                email: 'lucatremila@gmail.com'
            },
            content: base64encode(fileContent),
            branch: 'main',
        }

        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${process.env.GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json'
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

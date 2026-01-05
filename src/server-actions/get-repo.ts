'use server';
import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/route";
import getGithubApiUrl from "./get-github-api-url";

/**
 * Get the whole repo tree from Github apis.
 */
export default async function getRepoContents() {
    try {
        const session = await getServerSession(authOptions) as any
        const baseUrl = await getGithubApiUrl()
        const response = await fetch(`${baseUrl}/git/trees/main?recursive=1`, {
            headers: {
                Authorization: `Bearer ${session.accessToken}`,
                'Accept': 'application/vnd.github+json'
            },
        })
        return await response.json()
    } catch (error) {
        console.error(error)
    }
}

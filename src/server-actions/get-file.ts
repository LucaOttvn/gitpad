'use server'

import { getServerSession } from "next-auth";
import getGithubApiUrl from "./get-github-api-url";
import { authOptions } from "../app/api/auth/[...nextauth]/route";

/**
 * Get the file's content.
 * @param filePath 
 */
export default async function getFile(filePath: string): Promise<string | null> {

    try {
        const session = await getServerSession(authOptions) as any
        const baseUrl = await getGithubApiUrl()
        const url = `${baseUrl}/contents/${filePath}`;

        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${session.accessToken}`,
                Accept: "application/vnd.github.raw+json",
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch file: ${response.statusText}`);
        }

        return await response.text();
    } catch (error) {
        console.error(error)
        return null
    }

}
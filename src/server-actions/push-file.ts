'use server'

import { authOptions } from "../app/api/auth/[...nextauth]/route"
import getFileMetadata from "./get-file-metadata"
import { getServerSession } from "next-auth"

export async function pushFile(
  path: string,
  content: string,
): Promise<{status: string, message: string}> {
  // Get user session
  const session = await getServerSession(authOptions)

  if (!session || !(session as any).accessToken) {
    throw new Error("Not authenticated with GitHub")
  }

  // This is the token returned from the user's login
  const accessToken = (session as any).accessToken as string

  // Get current file SHA (skip for pure creates)
  let sha = ""
  try {
    const file = await getFileMetadata(path)
    if (!file) throw Error('No file metadata available')
    sha = file.sha
  } catch (error) {
    console.error(error)
  }

  const body = JSON.stringify({
    message: "Update via GitPad",
    content: btoa(unescape(encodeURIComponent(content))),
    ...(sha && { sha }),
    branch: "main",
  })

  console.log(accessToken)
  const url = `https://api.github.com/repos/LucaOttvn/DOCS/contents/${path}`

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    },
    body,
  })

  if (!res.ok) {
    const err = await res.text()
    if (res.status === 409) {
      throw new Error("Conflict: File modified externally. Refresh and try again.")
    }
    if (res.status === 422) {
      throw new Error("Invalid data. Check file content.")
    }
    throw new Error(`Push failed: ${res.status} - ${err}`)
  }

  return { status: "ok", message: "File pushed successfully" }
}

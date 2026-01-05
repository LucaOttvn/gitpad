# GitPad 

Effortless note-taking on GitHub.

Try it here: https://gitpad-omega.vercel.app/

 - [About](#about)
 - [Features](#features)
 - [Why GitPad?](#why-gitpad)
 - [Authentication](#authentication)

## About

A GitHub-based web app that connects to one of your repos and allows you to handle .txt/.md files neatly and quickly. No external services or databases, your data stays only in your selected repo, and the entire flow is handled through GitHub’s APIs.

## Features

- Connect to any personal GitHub repo
- Browse folders/subfolders as a file tree
- View and edit .md / .txt notes
- Mobile-friendly UI for quick edits on the go
- No extra backend: everything via GitHub API




- Connect to any personal GitHub repo
- Browse folders/subfolders as a file tree
- View and edit .md / .txt notes
- Mobile-friendly UI for quick edits on the go
- No extra backend: everything via GitHub API


## Why GitPad?

- Prefer Git as the single source of truth.
- Didn’t want Notion/Obsidian vendor lock‑in.
- Needed proper folders/subfolders instead of flat “boards”.
- Wanted a cleaner mobile UX than GitHub’s built‑in editor.​

## Authentication

The NextAuth GitHub handler is defined in ```app/api/auth/[...nextauth]/route.ts``` (check the file for more details about how it works).

```src/proxy.ts``` handles the proxy that acts as a middleware between each api call in the app.

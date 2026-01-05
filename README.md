# GitPad 

Effortless note-taking on GitHub.

 - [About](#about)
 - [Authentication](#authentication)

## About

A GitHub-based web app that connects to one of your repos and allows you to handle .txt/.md files neatly and quickly. No external services or databases, your data stays only in your selected repo, and the entire flow is handled through GitHub’s APIs.

## Authentication

The NextAuth GitHub handler is defined in ```app/api/auth/[...nextauth]/route.ts``` (check the file for more details about how it works).

```src/proxy.ts``` handles the proxy that acts as a middleware between each api call in the app.

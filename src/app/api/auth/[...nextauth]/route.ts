import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"

/**
 * This file contains the complete NextAuth configuration for GitHub login.
 * This object defines:
 * - providers: how users can sign in (here, just GitHub).
 * - callbacks: control what happens during login/session.
 * - secret: used to encrypt cookies.
*/
export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      // clientId: The id that Github uses to identify GitPad
      // clientSecret: The key that proves the app is legitimate
      // These two variables are created from the GIthub app's owner (me) from Github (profile > settings > developer settings > OAuth apps) and prove the app is actually owed by me.
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      // THe "repo" authorization level allows to:
      // - Read/write code, commits, branches, files
      // - Manage collaborators, invitations, webhooks
      // - Access commit statuses, deployments, projects
      // - Organization resources (teams, projects if user-owned)
      authorization: { params: { scope: "repo" } }
    }),
  ],
  callbacks: {
    // The jwt callback runs on login, logout and session check (useSession() or getServerSession())
    // It returns a modified token object that NextAuth then encrypts and stores as a cookie
    async jwt({ token, account }) {
      // This condition detects the first sign-in vs regular session checks
      // In the first one in fact, the account object looks like this:
      // { access_token: "gho_...", provider: "github" }, while on subsequent session checks it's undefined
      if (account) {
        // Add to the standard JWT token the account's access token
        token.accessToken = account.access_token
      }
      // The returned token will now look like this:
      // {
      //   "sub": "github_user_id",
      //   "name": "userName",
      //   "email": "userEmail@github.com",
      //   "picture": "avatar_url",
      //   "accessToken": "gho_abc123...", (the custom addidion just made)
      //   "iat": 1734000000,
      //   "exp": 1734086400
      // }
      // This entire object gets encrypted and saved into httpOnly cookies
      return token
    },
    // This callback copies the access token from the JWT (server-side) into the session object that gets sent to the client side
    // It basically allows the client to access the session too via useSession()
    async session({ session, token }) {
      (session as any).accessToken = token.accessToken
      return session
    },
  },
  secret: process.env.AUTH_SECRET,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }

import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      authorization: { params: { scope: "repo" } }
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // First time user logs in
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token }) {
      // Expose on session
      // @ts-ignore
      session.accessToken = token.accessToken
      return session
    },
  },
  secret: process.env.AUTH_SECRET,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }

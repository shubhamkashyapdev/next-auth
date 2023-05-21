import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"

import prisma from "../../../../prisma/client"
import { PrismaAdapter } from "@next-auth/prisma-adapter"

const adapter = PrismaAdapter(prisma)

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // check if user already exists
      const userExists = await prisma.user.findFirst({
        where: {
          email: user.email,
        },
      })
      if (userExists) return true

      // create new user
      await prisma.user.create({
        data: {
          email: user.email,
          name: user.name,
          image: user.image,
          emailVerified: new Date().toISOString(),
          isVerified: true,
        },
      })
      console.log(`New user created`)
      return true
    },
  },
  secret: process.env.AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { csrfToken, email, password } = credentials as {
          email: string
          password: string
          csrfToken: string
        }
        const user = { id: "1", name: "Admin", email: "admin@admin.com" }
        return user
      },
    }),
  ],
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

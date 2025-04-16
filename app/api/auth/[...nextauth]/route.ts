import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 3600, // 1 hour in seconds
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        uname: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.uname || !credentials?.password) {
          throw new Error("Username and password are required");
        }

        const user = await prisma.user.findUnique({
          where: { uname: credentials.uname },
        });

        if (!user) throw new Error("Invalid credentials");

        const isValid = await compare(credentials.password, user.password);
        if (!isValid) throw new Error("Invalid credentials");

        console.log("✅ User authenticated successfully");

        // ✅ Generate JWT token separately (but don’t return it in user)
        const accessToken = jwt.sign(
          { id: user.uid, role: "admin", name: user.uname },
          process.env.NEXTAUTH_SECRET!,
          { expiresIn: "1h" }
        );

        console.log("✅ Generated Token:", accessToken);

        // ✅ Return only NextAuth-compatible user object
        return {
          id: String(user.uid),
          name: user.uname,
          role: "admin",
          accessToken,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.role = user.role;
        token.accessToken = user.accessToken; // ✅ Store accessToken properly
      }
      return token;
    },

    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.id ?? null,
        name: token.name ?? null,
        role: token.role ?? null,
      };

      session.accessToken = token.accessToken as string | undefined; // ✅ Explicitly cast accessToken
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

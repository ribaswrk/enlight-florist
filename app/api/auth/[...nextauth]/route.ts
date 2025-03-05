import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { JWT } from "next-auth/jwt"; // ✅ Impor tipe JWT

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
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
        console.log("User in authorize():", user);

        return { id: String(user.uid), name: user.uname, role: "admin" };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // ✅ Pastikan id tersimpan
        token.role = user.role;
      }
      console.log("Updated JWT Token:", token); // Debugging
      return token;
    },

    async session({ session, token }) {
      console.log("Session Callback Token:", token); // Debugging
      // Type assertion to ensure token.user exists
      const user = token.user as { id?: string; role?: string } | undefined;

      session.user = {
        ...session.user, // Preserve default user properties
        id: user?.id ?? null, // ✅ Ensure id is copied correctly
        role: user?.role ?? null, // ✅ Ensure role is copied correctly
      };

      console.log("Updated Session:", session); // Debugging
      return session;
    },
  },

  jwt: {
    encode: async ({ secret, token }) => {
      return jwt.sign(token as object, secret, { algorithm: "HS256" });
    },
    decode: async ({ secret, token }) => {
      try {
        return jwt.verify(token as string, secret) as JWT; // Pastikan tipe JWT dikembalikan
      } catch {
        return null; // Jika terjadi error saat decode, kembalikan null
      }
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

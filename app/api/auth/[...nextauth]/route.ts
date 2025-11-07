// app/api/auth/[...nextauth]/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

// Re-use Prisma client (hindari banyak koneksi saat dev)
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };
const prisma = globalForPrisma.prisma ?? new PrismaClient();
if (!globalForPrisma.prisma) globalForPrisma.prisma = prisma;

// v5: tidak perlu set { secret } di config jika sudah ada AUTH_SECRET di env
const config: NextAuthConfig = {
  // v5 tidak pakai session.strategy; JWT adalah default.
  // maxAge masih bisa diatur via session, tapi default sudah OK.
  session: { maxAge: 3600 }, // 1 jam

  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        uname: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.uname || !credentials?.password) {
          throw new Error("Username and password are required");
        }

        const user = await prisma.user.findUnique({
          where: { uname: String(credentials.uname) },
        });
        if (!user) throw new Error("Invalid credentials");

        const isValid = await compare(
          String(credentials.password),
          user.password
        );
        if (!isValid) throw new Error("Invalid credentials");

        // Optional: akses token custom; NextAuth sendiri sudah buat JWT,
        // tapi kalau kamu memang butuh accessToken terpisah, tetap bisa:
        const accessToken = jwt.sign(
          { id: user.uid, role: "admin", name: user.uname },
          process.env.AUTH_SECRET!, // v5: pakai AUTH_SECRET
          { expiresIn: "1h" }
        );

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
        // v5: token adalah JWT; boleh menambah properti custom
        token.id = user.id;
        token.name = user.name ?? "";
        token.role = user.role;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      // Augment session.user
      session.user = {
        ...session.user,
        id: token.id ?? "",
        name: token.name ?? null,
        role: token.role ?? "",
      };
      session.accessToken = token.accessToken as string | undefined;
      return session;
    },
  },
};

const handler = NextAuth(config);
export { handler as GET, handler as POST };

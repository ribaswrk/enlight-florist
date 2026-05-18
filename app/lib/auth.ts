import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";

// Prisma singleton (hindari terlalu banyak koneksi saat dev)
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };
export const prisma = globalForPrisma.prisma ?? new PrismaClient();
if (!globalForPrisma.prisma) globalForPrisma.prisma = prisma;

const authSecret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET;
const authUrl =
  process.env.AUTH_URL || process.env.NEXTAUTH_URL || "http://localhost:3000";
const authTrustHost =
  process.env.AUTH_TRUST_HOST === "true" || Boolean(authUrl);

const config: NextAuthConfig = {
  secret: authSecret,
  trustHost: authTrustHost,
  session: { strategy: "jwt", maxAge: 3600 }, // 1 jam; v5 default JWT
  pages: {
    signIn: "/admin/login",
  },

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
          user.password,
        );
        if (!isValid) throw new Error("Invalid credentials");

        // Optional: token kustom di samping JWT NextAuth
        if (!authSecret) {
          throw new Error("AUTH_SECRET or NEXTAUTH_SECRET is required");
        }

        const accessToken = jwt.sign(
          { id: user.uid, role: "admin", name: user.uname },
          authSecret,
          { expiresIn: "1h" },
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
        token.id = user.id;
        token.name = user.name ?? "";
        token.role = user.role;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
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

// Penting: v5 mengembalikan helpers, termasuk handlers (GET/POST)
export const { auth, handlers, signIn, signOut } = NextAuth(config);

export const { GET, POST } = handlers;

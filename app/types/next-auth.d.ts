// types/next-auth.d.ts (or somewhere in your project like `app/types/next-auth.d.ts`)
import { DefaultUser } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      id: string | null;
      name: string | null;
      role: string | null;
    };
  }

  interface User extends DefaultUser {
    id: string;
    role?: string;
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id?: string;
    role?: string;
    accessToken?: string;
    name?: string;
  }
}

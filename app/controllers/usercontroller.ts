import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";

const prisma = new PrismaClient();
interface loginParam {
  uname: string;
  password: string;
}
// Secret Key for JWT
const SECRET_KEY = process.env.NEXTAUTH_SECRET || "your-secret-key";

export async function LoginUser(data: { uname: string; password: string }) {
  console.log("🔍 Login Attempt:", data);

  const { uname, password } = data;

  if (!uname || !password) {
    console.log("❌ Missing credentials");
    return NextResponse.json(
      { error: "Username and password required" },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({ where: { uname } });
  console.log("🔍 User found:", user);

  if (!user) {
    console.log("❌ User not found");
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  console.log("🔍 Password match:", passwordMatch);

  if (!passwordMatch) {
    console.log("❌ Incorrect password");
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  console.log("✅ User authenticated successfully");

  const token = sign(
    { user: { id: user.uid, role: "admin" } },
    process.env.NEXTAUTH_SECRET!,
    {
      expiresIn: "1h",
    }
  );

  console.log("✅ Token generated:", token);

  const response = NextResponse.json({
    message: "Login successful",
    user: { id: user.uid, uname: user.uname, role: "admin" },
    token,
  });

  response.cookies.set("next-auth.session-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });

  console.log("✅ Token set in cookies");
  return response;
}

export async function GetAllUsers() {
  const users = await prisma.user.findMany();
  return users;
}

// ✅ POST: Create a new user
export async function CreateUser(req: loginParam) {
  const { uname, password } = await req;
  if (!uname || !password) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  // Hash password before storing
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: { uname, password: hashedPassword },
  });

  return newUser;
}

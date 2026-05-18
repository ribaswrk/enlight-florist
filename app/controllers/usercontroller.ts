import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
interface UserPayload {
  uname: string;
  password: string;
}

function isStrongPassword(password: string) {
  return (
    password.length >= 10 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[^A-Za-z0-9]/.test(password)
  );
}

export async function GetAllUsers() {
  const users = await prisma.user.findMany();
  return users;
}

// ✅ POST: Create a new user
export async function CreateUser(req: UserPayload) {
  try {
    const { uname, password } = req;
    if (!uname || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    if (!isStrongPassword(password)) {
      return NextResponse.json(
        {
          error:
            "Password must be at least 10 characters and include uppercase, lowercase, numbers, and symbols.",
        },
        { status: 400 },
      );
    }

    // Hash password before storing
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await prisma.user.create({
      data: { uname, password: hashedPassword },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    const errMsg =
      error instanceof Error ? error.message : "Unknown error occurred";

    return NextResponse.json(
      { error: "Something went wrong", details: errMsg },
      { status: 500 },
    );
  }
}

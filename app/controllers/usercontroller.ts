/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function GetAllUsers() {
  const users = await prisma.user.findMany();
  return users;
}

export async function GetUser() {
  const user = await prisma.user.findMany({
    where: { uname: "John Doe" },
  });
  return user;
}

export async function GetUserEmail() {
  const userEmail = await prisma.user.findMany({
    select: { uname: true },
  });
  return userEmail;
}

export async function GetUsersByDate() {
  const users = await prisma.user.findMany({
    orderBy: { uname: "desc" },
  });
  return users;
}

export async function GetUsersLimit5() {
  const users = await prisma.user.findMany({
    take: 5, // Get only the first 5 users
  });
  return users;
}

export async function Get5UsersAfter10() {
  const users = await prisma.user.findMany({
    skip: 10, // Skip the first 10 users
    take: 5, // Fetch the next 5 users
  });
  return users;
}

// ✅ POST: Create a new user
export async function CreateUser(req: Request) {
  const { uname, password } = await req.json();
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

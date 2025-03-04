import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GetAllUsers() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

export async function GetUser() {
  const user = await prisma.user.findMany({
    where: { name: "John Doe" },
  });
  return NextResponse.json(user);
}

export async function GetUserEmail() {
  const userEmail = await prisma.user.findMany({
    select: { name: true, email: true },
  });
  return NextResponse.json(userEmail);
}

export async function GetUsersByDate() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(users);
}

export async function GetUsersLimit5() {
  const users = await prisma.user.findMany({
    take: 5, // Get only the first 5 users
  });
  return NextResponse.json(users);
}

export async function Get5UsersAfter10() {
  const users = await prisma.user.findMany({
    skip: 10, // Skip the first 10 users
    take: 5, // Fetch the next 5 users
  });
  return NextResponse.json(users);
}

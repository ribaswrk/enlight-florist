import { NextRequest, NextResponse } from "next/server";
import { GetAllUsers, CreateUser } from "../../controllers/usercontroller";

// ✅ GET: Fetch all users
export async function GET() {
  try {
    const users = await GetAllUsers();
    return NextResponse.json(users);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

// ✅ POST: Create a new product
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newUser = await CreateUser(body);
    return NextResponse.json(newUser, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}

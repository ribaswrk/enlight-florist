import { NextRequest, NextResponse } from "next/server";
import {
  GetAllUsers,
  CreateUser,
  LoginUser,
} from "@/controllers/usercontroller";

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

// ✅ POST: Create a new user
export async function POST(req: NextRequest) {
  try {
		const body = await req.json();

		if (!body) {
			return NextResponse.json(
				{ error: "Invalid request body" },
				{ status: 400 }
			);
		}

		return await CreateUser(body);
	} catch (error) {
		return NextResponse.json(
			{ error: "Failed to process request", details: error.message },
			{ status: 500 }
		);
	}
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const loginResponse = await LoginUser(body);
  console.log("🔍 Login Response:", loginResponse);
  return loginResponse;
}

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

	// ✅ Generate a NextAuth-compatible JWT
	const token = sign(
		{ id: user.uid, role: "admin" }, // ✅ Remove extra "user" object
		process.env.NEXTAUTH_SECRET!,
		{
			expiresIn: "1h",
		}
	);

	console.log("✅ Token generated:", token);

	// ✅ Return the token, but don't set it manually in cookies
	return NextResponse.json({
		message: "Login successful",
		user: { id: user.uid, uname: user.uname, role: "admin" },
		token,
	});
}

export async function GetAllUsers() {
	const users = await prisma.user.findMany();
	return users;
}

// ✅ POST: Create a new user
export async function CreateUser(req: loginParam) {
	try {
		const { uname, password } = req; // No need for `await req`
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

		return NextResponse.json(newUser, { status: 201 });
	} catch (error) {
		return NextResponse.json(
			{ error: "Something went wrong", details: error.message },
			{ status: 500 }
		);
	}
}

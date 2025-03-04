import { NextRequest, NextResponse } from "next/server";
import { GetAllUsers, CreateUser } from "../../controllers/usercontroller";

// ✅ GET: Fetch all products
export async function GET() {
  try {
    const products = await GetAllUsers();
    return NextResponse.json(products);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// ✅ POST: Create a new product
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newProduct = await CreateUser(body);
    return NextResponse.json(newProduct, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}

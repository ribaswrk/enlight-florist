import { NextRequest, NextResponse } from "next/server";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../controllers/productcontroller";
import { getToken } from "next-auth/jwt";

interface UserToken {
  user: {
    id: string;
    role: string;
  };
}
// ✅ GET: Fetch all products
export async function GET(req: Request) {
  try {
    // ✅ Parse query parameters
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId");

    // ✅ Convert categoryId to a number (or use undefined if not provided)
    const products = await getProducts(
      categoryId ? parseInt(categoryId, 10) : undefined
    );

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
    const newProduct = await createProduct(body);
    return NextResponse.json(newProduct, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}

// ✅ PUT: Update a product
export async function PUT(req: NextRequest) {
  try {
    const { id, ...data } = await req.json();
    // ✅ Extract Bearer token manually
    const authHeader = req.headers.get("authorization");
    const tokenString = authHeader?.split(" ")[1]; // Get token after "Bearer "

    console.log("Extracted Token:", tokenString); // Debugging

    if (!tokenString) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    // ✅ Decode the token manually (since getToken won't work with Authorization header)
    const token = await getToken({
      req,
      raw: true,
      secret: process.env.NEXTAUTH_SECRET,
    });

    console.log("Decoded Token:", token); // Debugging

    if (!token) {
      return NextResponse.json({ error: "Unauthorized API" }, { status: 401 });
    }

    data.updateBy = token.id; // ✅ Get authenticated user ID

    // ✅ Pass userId to createProduct
    const updatedProduct = await updateProduct(Number(id), data);
    return NextResponse.json(updatedProduct);
  } catch {
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

// ✅ DELETE: Remove a product
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    await deleteProduct(Number(id));
    return NextResponse.json({ message: "Product deleted successfully" });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}

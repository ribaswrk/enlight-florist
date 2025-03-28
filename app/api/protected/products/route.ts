import { NextRequest, NextResponse } from "next/server";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../../controllers/productcontroller";
import jwt from "jsonwebtoken";

// ✅ GET: Fetch all products
export async function GET(req: Request) {
  try {
    // ✅ Parse query parameters
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId");
    const homeView = searchParams.get("homeView");

    // ✅ Convert query parameters to appropriate types
    const parsedCategoryId = categoryId ? parseInt(categoryId, 10) : undefined;
    const parsedHomeView = homeView ? parseInt(homeView, 10) : undefined;

    // ✅ Fetch events based on query params
    const products = await getProducts(parsedCategoryId, parsedHomeView);

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
    // ✅ Extract Bearer token manually
    const authHeader = req.headers.get("authorization");
    const tokenString = authHeader?.split(" ")[1]; // Get token after "Bearer "

    console.log("Extracted Token:", tokenString); // Debugging

    if (!tokenString) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    // ✅ Manually decode the token using `jsonwebtoken`
    let decodedToken;
    try {
      decodedToken = jwt.verify(tokenString, process.env.NEXTAUTH_SECRET!) as {
        id: string;
        name: string;
        role: string;
      };
      console.log("Decoded Token:", decodedToken); // Debugging
    } catch (error) {
      console.error("JWT Verification Error:", error);
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    if (!decodedToken) {
      return NextResponse.json({ error: "Unauthorized API" }, { status: 401 });
    }

    const body = await req.json();
    body.updateBy = decodedToken.name;
    body.createdBy = decodedToken.name;
    body.price = String(body.price);
    body.stock = String(body.stock);
    console.log("products", body);

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
    // ✅ Extract Bearer token manually
    const authHeader = req.headers.get("authorization");
    const tokenString = authHeader?.split(" ")[1]; // Get token after "Bearer "

    if (!tokenString) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    let decodedToken;
    try {
      decodedToken = jwt.verify(tokenString, process.env.NEXTAUTH_SECRET!) as {
        id: string;
        name: string;
        role: string;
      };
      console.log("Decoded Token:", decodedToken); // Debugging
    } catch (error) {
      console.error("JWT Verification Error:", error);
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    if (!decodedToken) {
      return NextResponse.json({ error: "Unauthorized API" }, { status: 401 });
    }

    const { id, ...body } = await req.json();
    body.updateBy = decodedToken.name;
    body.price = String(body.price);
    body.stock = String(body.stock);
    console.log("BODY", body);
    // ✅ Pass userId to createProduct
    const updatedProduct = await updateProduct(Number(id), body);
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

import { NextRequest, NextResponse } from "next/server";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsHome,
} from "../../../controllers/productcontroller";
import jwt from "jsonwebtoken";

// ✅ GET: Fetch all products
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const view = searchParams.get("view"); // e.g. 'home' or 'admin'
    const subcategoryId = searchParams.get("subcategoryId");
    const categoryId = searchParams.get("categoryId");
    const homeView = searchParams.get("homeView");
    const productId = searchParams.get("productId");

    const parsedSubcategoryId = subcategoryId
      ? parseInt(subcategoryId, 10)
      : undefined;
    const parsedCategoryId = categoryId ? parseInt(categoryId, 10) : undefined;
    const parsedHomeView = homeView ? parseInt(homeView, 10) : undefined;
    const parsedProductId = productId ? parseInt(productId, 10) : undefined;

    let result;
    console.log("view", view);
    if (view === "home") {
      result = await getProductsHome();
    } else {
      result = await getProducts(
        parsedCategoryId,
        parsedSubcategoryId,
        parsedHomeView,
        parsedProductId
      );
    }
    console.log("return", result);

    return NextResponse.json(result);
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
    const authHeader = req.headers.get("authorization");
    const tokenString = authHeader?.split(" ")[1];

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
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    if (!decodedToken) {
      return NextResponse.json({ error: "Unauthorized API" }, { status: 401 });
    }

    const formData = await req.formData();
    formData.set("createdBy", decodedToken.name);
    formData.set("updateBy", decodedToken.name);
    console.log("formdata content", formData);
    const newProduct = await createProduct(formData);
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
      console.error("JWT string :", tokenString);
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    if (!decodedToken) {
      return NextResponse.json({ error: "Unauthorized API" }, { status: 401 });
    }

    const formData = await req.formData();
    if (!formData.get("id")) {
      return NextResponse.json({ error: "Missing ID" }, { status: 401 });
    }
    formData.set("updateBy", decodedToken.name);
    console.log("formdata content", formData);
    // ✅ Pass userId to createProduct
    const updatedProduct = await updateProduct(
      Number(formData.get("id")),
      formData
    );
    return NextResponse.json(updatedProduct);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
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

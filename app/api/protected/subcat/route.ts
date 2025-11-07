export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import {
  getSubcategories,
  createSubcategory,
  updateSubcategory,
  deleteSubcategory,
} from "../../../controllers/subcatcontroller";
import jwt from "jsonwebtoken";

// ✅ GET: Fetch all subcategories
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const catId = searchParams.get("categoryId");

    const result = await getSubcategories(Number(catId));
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch subcategories" },
      { status: 500 }
    );
  }
}

// ✅ POST: Create a new subcategory
export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    const tokenString = authHeader?.split(" ")[1];

    if (!tokenString) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const decodedToken = jwt.verify(
      tokenString,
      process.env.NEXTAUTH_SECRET!
    ) as {
      id: string;
      name: string;
      role: string;
    };

    const formData = await req.formData();
    formData.set("createdBy", decodedToken.name);
    formData.set("updateBy", decodedToken.name);

    const newSubcategory = await createSubcategory(formData);
    return NextResponse.json(newSubcategory, { status: 201 });
  } catch (error) {
    console.error("Subcat Error:", error);
    return NextResponse.json(
      { error: "Failed to create subcategory" },
      { status: 500 }
    );
  }
}

// ✅ PUT: Update a subcategory
export async function PUT(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    const tokenString = authHeader?.split(" ")[1];

    if (!tokenString) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const decodedToken = jwt.verify(
      tokenString,
      process.env.NEXTAUTH_SECRET!
    ) as {
      id: string;
      name: string;
      role: string;
    };

    const formData = await req.formData();
    const id = formData.get("subcategoryId");

    if (!id) {
      return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    }

    formData.set("updateBy", decodedToken.name);

    const updatedSubcategory = await updateSubcategory(Number(id), formData);
    return NextResponse.json(updatedSubcategory);
  } catch (error) {
    console.error("Update Subcat Error:", error);
    return NextResponse.json(
      { error: "Failed to update subcategory" },
      { status: 500 }
    );
  }
}

// ✅ DELETE: Remove a subcategory
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    await deleteSubcategory(Number(id));
    return NextResponse.json({ message: "Subcategory deleted successfully" });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete subcategory" },
      { status: 500 }
    );
  }
}

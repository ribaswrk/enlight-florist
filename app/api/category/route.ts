import { NextRequest, NextResponse } from "next/server";
import {
  getcategory,
  createcategory,
  updatecategory,
  deletecategory,
} from "../../controllers/categorycontroller";
import { getToken } from "next-auth/jwt";

interface UserToken {
  user: {
    id: string;
    role: string;
  };
}
// ✅ GET: Fetch all category
export async function GET() {
  try {
    const category = await getcategory();
    return NextResponse.json(category);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch category" },
      { status: 500 }
    );
  }
}

// ✅ POST: Create a new category
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newcategory = await createcategory(body);
    return NextResponse.json(newcategory, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 }
    );
  }
}

// ✅ PUT: Update a category
export async function PUT(req: NextRequest) {
  try {
    const { id, ...data } = await req.json();
    const token = (await getToken({ req })) as UserToken | null; // ✅ Fix type

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    data.updateBy = token.user.id; // ✅ Get authenticated user ID

    // ✅ Pass userId to createcategory
    const updatedcategory = await updatecategory(Number(id), data);
    return NextResponse.json(updatedcategory);
  } catch {
    return NextResponse.json(
      { error: "Failed to update category" },
      { status: 500 }
    );
  }
}

// ✅ DELETE: Remove a category
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    await deletecategory(Number(id));
    return NextResponse.json({ message: "category deleted successfully" });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete category" },
      { status: 500 }
    );
  }
}

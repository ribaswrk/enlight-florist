import { NextRequest, NextResponse } from "next/server";
import {
  getcategory,
  createcategory,
  updatecategory,
  deletecategory,
} from "../../../controllers/categorycontroller";
import jwt, { JwtPayload } from "jsonwebtoken";

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
    const authHeader = req.headers.get("authorization");
    const tokenString = authHeader?.split(" ")[1];

    console.log("Extracted Token:", tokenString);

    if (!tokenString) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    // Deklarasi dan isi variabel di luar try agar bisa digunakan di bawah
    type MyToken = JwtPayload & {
      id: string;
      name: string;
      role: string;
    };

    let decodedToken: MyToken;
    try {
      decodedToken = jwt.verify(
        tokenString,
        process.env.NEXTAUTH_SECRET!
      ) as MyToken;

      console.log("Decoded Token:", decodedToken);
      console.log("Token exp:", decodedToken.exp);
    } catch (error) {
      console.error("JWT Verification Error:", error);
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    if (!decodedToken) {
      return NextResponse.json({ error: "Unauthorized API" }, { status: 401 });
    }

    const formData = await req.formData();
    formData.set("createdBy", decodedToken.name);
    formData.set("updateBy", decodedToken.name);

    const newcategory = await createcategory(formData);
    return NextResponse.json(newcategory, { status: 201 });
  } catch (error) {
    console.error("General Error:", error);
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 }
    );
  }
}

// ✅ PUT: Update a category
export async function PUT(req: NextRequest) {
  try {
    // ✅ Extract Bearer token manually
    const authHeader = req.headers.get("authorization");
    const tokenString = authHeader?.split(" ")[1]; // Get token after "Bearer "

    console.log("Extracted Token:", tokenString); // Debugging

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

    const formData = await req.formData();
    if (!formData.get("id")) {
      return NextResponse.json({ error: "Missing ID" }, { status: 401 });
    }
    formData.set("updateBy", decodedToken.name);
    const updatedcategory = await updatecategory(
      Number(formData.get("id")),
      formData
    );
    return NextResponse.json(updatedcategory);
  } catch (error) {
    console.error("Update Error:", error);
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

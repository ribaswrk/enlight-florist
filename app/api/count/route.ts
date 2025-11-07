export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  try {
    // Fetch the counts for each table
    const [productCount, categoryCount, eventCount, subcategoryCount] =
      await Promise.all([
        prisma.product.count(),
        prisma.category.count(),
        prisma.event.count(),
        prisma.subcategory.count(),
      ]);

    // Return JSON response
    return NextResponse.json({
      products: productCount,
      categories: categoryCount,
      events: eventCount,
      subcat: subcategoryCount,
    });
  } catch (error) {
    console.error("Failed to fetch counts:", error);
    return NextResponse.json(
      { error: "Failed to fetch counts" },
      { status: 500 }
    );
  }
}

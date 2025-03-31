import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  try {
    // Fetch the counts for each table
    const [productCount, categoryCount, eventCount] = await Promise.all([
      prisma.product.count(),
      prisma.category.count(),
      prisma.event.count(),
    ]);

    // Return JSON response
    return NextResponse.json({
      products: productCount,
      categories: categoryCount,
      events: eventCount,
    });
  } catch (error) {
    console.error("Failed to fetch counts:", error);
    return NextResponse.json(
      { error: "Failed to fetch counts" },
      { status: 500 }
    );
  }
}

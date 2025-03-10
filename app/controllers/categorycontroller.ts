import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getcategory() {
  const category = await prisma.category.findMany();
  return category;
}

// ✅ Create a new category
export async function createcategory(data: {
  name: string;
  price: string;
  stock: string;
  categoryId: number;
  createdBy: string;
  updateBy: string;
}) {
  return await prisma.category.create({ data });
}

// ✅ Update a category
export async function updatecategory(
  categoryId: number,
  data: { name: string; price: string; categoryId: number; updateBy: string }
) {
  return await prisma.category.update({
    where: { categoryId },
    data,
  });
}

// ✅ Delete a category
export async function deletecategory(categoryId: number) {
  return await prisma.category.delete({ where: { categoryId } });
}

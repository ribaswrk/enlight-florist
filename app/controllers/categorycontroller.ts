import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getcategory() {
  const category = await prisma.category.findMany();
  return category;
}

// ✅ Create a new category
export async function createcategory(data: {
  name: string;
  createdBy: string;
  updateBy: string;
}) {
  return await prisma.category.create({
    data: {
      ...data,
      createdAt: new Date(),
      updateAt: new Date(), // ✅ Correct way to set the current timestamp
    },
  });
}

// ✅ Update a category
export async function updatecategory(
  categoryId: number,
  data: { name: string; updateBy: string }
) {
  return await prisma.category.update({
    where: { categoryId },
    data: {
      ...data,
      updateAt: new Date(), // ✅ Correct way to set the current timestamp
    },
  });
}

// ✅ Delete a category
export async function deletecategory(categoryId: number) {
  return await prisma.category.delete({ where: { categoryId } });
}

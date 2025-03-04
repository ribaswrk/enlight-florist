import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ✅ Fetch all products
export async function getProducts() {
  return await prisma.product.findMany();
}

// ✅ Create a new product
export async function createProduct(data: {
  name: string;
  price: string;
  categoryId: number;
  createdBy: string;
  updateBy: string;
}) {
  return await prisma.product.create({ data });
}

// ✅ Update a product
export async function updateProduct(
  productid: number,
  data: { name: string; price: string; categoryId: number; updateBy: string }
) {
  return await prisma.product.update({
    where: { productid },
    data,
  });
}

// ✅ Delete a product
export async function deleteProduct(productid: number) {
  return await prisma.product.delete({ where: { productid } });
}

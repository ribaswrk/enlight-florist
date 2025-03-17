import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getProducts() {
  const products = await prisma.product.findMany({
    include: {
      category: {
        select: {
          name: true, // ✅ Fetch category name instead of ID
        },
      },
    },
  });

  // ✅ Transform the result to match your `productlist` interface
  return products.map(({ productid, name, price, stock, category }) => ({
    id: productid, // ✅ Rename `productid` to `id`
    name,
    price,
    stock,
    category: category.name, // ✅ Flatten category name
  }));
}

// ✅ Create a new product
export async function createProduct(data: {
  name: string;
  price: string;
  stock: string;
  categoryId: number;
  createdBy: string;
  updateBy: string;
}) {
  return await prisma.product.create({
    data: {
      ...data,
      createdAt: new Date(),
      updateAt: new Date(),
    },
  });
}

// ✅ Update a product
export async function updateProduct(
  productid: number,
  data: { name: string; price: string; categoryId: number; updateBy: string }
) {
  return await prisma.product.update({
    where: { productid },
    data: {
      ...data,
      updateAt: new Date(), // ✅ Correct way to set the current timestamp
    },
  });
}

// ✅ Delete a product
export async function deleteProduct(productid: number) {
  return await prisma.product.delete({ where: { productid } });
}

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ✅ Get Products
export async function getProducts(
  catId?: number,
  homeView?: number,
  productId?: number
) {
  const whereCondition: any = {};
  if (catId) whereCondition.categoryId = catId;
  if (homeView !== undefined) whereCondition.homeView = homeView;
  if (productId !== undefined) whereCondition.productid = productId;

  const products = await prisma.product.findMany({
    where: whereCondition,
    include: {
      category: {
        select: {
          name: true,
        },
      },
      ProductImage: {
        select: {
          id: true,
          imageUrl: true,
        },
      },
    },
  });

  return products.map(
    ({
      productid,
      name,
      price,
      promoPrice,
      soldqty,
      category,
      homeView,
      ProductImage,
    }) => ({
      id: productid,
      name,
      price,
      priceDisc: promoPrice,
      soldqty,
      homeView,
      category: category.name,
      images: ProductImage.map((img) => img.imageUrl),
    })
  );
}

// ✅ Create Product (Now Supports FormData)
export async function createProduct(data: FormData) {
  let images: string[] = [];

  try {
    const rawImages = data.get("images");
    if (rawImages) {
      images = JSON.parse(rawImages as string);
      if (!Array.isArray(images))
        throw new Error("Parsed images is not an array");
    }
  } catch (err) {
    console.error("❌ Invalid images JSON:", err);
    images = [];
  }

  try {
    return await prisma.product.create({
      data: {
        name: data.get("name") as string,
        price: String(data.get("price")),
        promoPrice: String(data.get("promoPrice")),
        soldqty: String(data.get("soldqty")),
        categoryId: Number(data.get("categoryId")),
        homeView: Number(data.get("homeView")),
        createdBy: data.get("createdBy") as string,
        updateBy: data.get("updateBy") as string,
        createdAt: new Date(),
        updateAt: new Date(),
        ProductImage:
          images && images.length > 0
            ? {
                create: images.map((image) => ({
                  imageUrl: image,
                  createdBy: data.get("createdBy") as string,
                })),
              }
            : undefined,
      },
      include: { ProductImage: true },
    });
  } catch (error: any) {
    console.error("❌ Failed to create product:", error.message || error);
    throw error;
  }
}

// ✅ Update Product (Deletes Old Image)
export async function updateProduct(productid: number, data: FormData) {
  let images: string[] = [];

  try {
    const rawImages = data.get("images");
    if (rawImages) {
      images = JSON.parse(rawImages as string);
      if (!Array.isArray(images))
        throw new Error("Parsed images is not an array");
    }
  } catch (err) {
    console.error("❌ Invalid images JSON:", err);
    images = [];
  }

  try {
    const updatedProduct = await prisma.product.update({
      where: { productid },
      data: {
        name: data.get("name") as string,
        price: String(data.get("price")),
        promoPrice: String(data.get("promoPrice")),
        soldqty: String(data.get("soldqty")),
        categoryId: Number(data.get("categoryId")),
        homeView: Number(data.get("homeView")),
        updateBy: data.get("updateBy") as string,
        updateAt: new Date(),
        ProductImage: {
          deleteMany: {},
        },
      },
    });

    if (images && images.length > 0) {
      await prisma.product.update({
        where: { productid },
        data: {
          ProductImage: {
            create: images.map((image) => ({
              imageUrl: image,
              createdBy: data.get("updateBy") as string,
            })),
          },
        },
      });
    }

    console.log("✅ Product updated:", updatedProduct);
    return updatedProduct;
  } catch (error: any) {
    console.error("❌ Failed to update product:", error.message || error);
    throw error;
  }
}

// ✅ Delete Product (Deletes Image)
export async function deleteProduct(productid: number) {
  try {
    //delete the image that related to the products
    await prisma.productImage.deleteMany({
      where: { productid },
    });

    return await prisma.product.delete({
      where: { productid },
    });
  } catch (error: any) {
    console.error("❌ Failed to delete product:", error.message || error);
    throw error;
  }
}

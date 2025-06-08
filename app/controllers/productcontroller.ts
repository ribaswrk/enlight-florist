import { PrismaClient } from "@prisma/client";
import { Prisma } from "@prisma/client";

const prisma = new PrismaClient();

// ✅ Get Products
export async function getProducts(
  catId?: number,
  homeView?: number,
  productId?: number
) {
  const whereCondition: Prisma.ProductWhereInput = {};
  if (catId) whereCondition.categoryId = catId;
  if (homeView !== undefined) whereCondition.homeView = homeView;
  if (productId !== undefined) whereCondition.productid = productId;

  const products = await prisma.product.findMany({
    where: whereCondition,
    include: {
      category: {
        select: {
          categoryId: true,
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
      categoryId: category.categoryId,
      category: category.name,
      images: ProductImage.map((img) => img.imageUrl),
    })
  );
}

export async function getProductsHome() {
  const categories = await prisma.category.findMany({
    where: {
      homeView: 1,
    },
    select: {
      categoryId: true,
      name: true,
      Product: {
        where: {
          homeView: 1,
        },
        take: 10,
        select: {
          productid: true,
          name: true,
          price: true,
          promoPrice: true,
          soldqty: true,
          ProductImage: {
            take: 1,
            select: {
              imageUrl: true,
            },
          },
        },
      },
    },
  });
  const categorySections = categories.map((cat) => ({
    name: cat.name,
    slug: cat.categoryId.toString(), // using categoryId as slug
    products: cat.Product.map((prod) => ({
      id: prod.productid.toString(),
      name: prod.name,
      price: prod.price,
      image:
        prod.ProductImage[0]?.imageUrl ||
        "/placeholder.svg?height=400&width=400",
      category: cat.categoryId.toString(),
      priceDisc: prod.promoPrice,
      soldQty: prod.soldqty,
    })),
  }));

  return categorySections;
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
  } catch (error) {
    const errMsg =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("❌ Failed to create product:", errMsg || error);
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

    return updatedProduct;
  } catch (error) {
    const errMsg =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("❌ Failed to update product:", errMsg || error);
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
  } catch (error) {
    const errMsg =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("❌ Failed to delete product:", errMsg || error);
    throw error;
  }
}

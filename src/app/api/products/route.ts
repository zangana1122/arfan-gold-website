import { NextResponse } from "next/server";
import { db } from "@/db";
import { products, type NewProduct } from "@/db/schema";
import { seedProducts } from "@/lib/seed-data";
import { isAdmin } from "@/lib/auth";
import { desc, eq } from "drizzle-orm";

// Ensure DB is seeded
async function ensureSeeded() {
  const existing = await db.select().from(products).limit(1);
  if (existing.length === 0) {
    await db.insert(products).values(seedProducts).returning();
  }
}

export async function GET(request: Request) {
  try {
    await ensureSeeded();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");

    let allProducts;

    if (category && category !== "all") {
      allProducts = await db
        .select()
        .from(products)
        .where(eq(products.category, category))
        .orderBy(products.id);
    } else if (featured === "true") {
      allProducts = await db
        .select()
        .from(products)
        .where(eq(products.featured, true))
        .orderBy(products.id);
    } else {
      allProducts = await db
        .select()
        .from(products)
        .orderBy(desc(products.featured), products.id);
    }

    return NextResponse.json({ products: allProducts });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products", products: seedProducts },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body: NewProduct = await request.json();
    const newProduct = await db
      .insert(products)
      .values({
        ...body,
        inStock: body.inStock ?? true,
        featured: body.featured ?? false,
      })
      .returning();
    return NextResponse.json({ product: newProduct[0] }, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}

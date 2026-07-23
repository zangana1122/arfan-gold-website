import { NextResponse } from "next/server";
import { db } from "@/db";
import { products, type Product } from "@/db/schema";
import { eq } from "drizzle-orm";
import { isAdmin } from "@/lib/auth";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const [product] = await db
      .select()
      .from(products)
      .where(eq(products.id, Number(id)))
      .limit(1);
    if (!product) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ product });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { id } = await params;
    const body = await request.json();
    const [updated] = await db
      .update(products)
      .set({
        name: body.name,
        nameKu: body.nameKu,
        category: body.category,
        description: body.description,
        descriptionKu: body.descriptionKu,
        price: body.price ? String(body.price) : null,
        priceNote: body.priceNote,
        pricePerGram: body.pricePerGram ? String(body.pricePerGram) : null,
        makingFee: body.makingFee ? String(body.makingFee) : null,
        makingFeeType: body.makingFeeType || "total",
        material: body.material,
        karat: body.karat,
        weight: body.weight,
        imageUrl: body.imageUrl,
        featured: body.featured,
        inStock: body.inStock,
      })
      .where(eq(products.id, Number(id)))
      .returning();
    return NextResponse.json({ product: updated });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { id } = await params;
    await db.delete(products).where(eq(products.id, Number(id)));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}

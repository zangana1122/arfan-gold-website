import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import AdminPanel from "@/components/admin/AdminPanel";
import { db } from "@/db";
import { products, type Product } from "@/db/schema";
import { desc } from "drizzle-orm";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const authed = await isAdmin();
  if (!authed) {
    redirect("/admin/login");
  }

  let allProducts: Product[] = [];
  try {
    allProducts = await db.select().from(products).orderBy(desc(products.id));
  } catch (e) {
    allProducts = [];
  }

  return (
    <div className="min-h-screen bg-[#faf7f2]">
      <AdminPanel initialProducts={allProducts} />
    </div>
  );
}

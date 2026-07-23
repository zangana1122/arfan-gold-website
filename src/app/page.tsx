import { db } from "@/db";
import { products } from "@/db/schema";
import { desc } from "drizzle-orm";
import { seedProducts } from "@/lib/seed-data";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CategoriesClient from "@/components/CategoriesClient";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export const dynamic = "force-dynamic";

async function getProducts() {
  try {
    const existing = await db.select().from(products).limit(1);
    if (existing.length === 0) {
      return seedProducts as unknown as (typeof products.$inferSelect)[];
    }
    const allProducts = await db
      .select()
      .from(products)
      .orderBy(desc(products.featured), products.id);
    return allProducts;
  } catch (e) {
    console.error("DB fetch failed, using seed data:", e);
    return seedProducts as unknown as (typeof products.$inferSelect)[];
  }
}

export default async function Home() {
  const initialProducts = await getProducts();

  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <CategoriesClient initialProducts={initialProducts} />
      <About />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}

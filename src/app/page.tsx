import { db } from "@/db";
import { products, appSettings } from "@/db/schema";
import { desc, inArray } from "drizzle-orm";
import { seedProducts } from "@/lib/seed-data";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CategoriesClient from "@/components/CategoriesClient";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export const dynamic = "force-dynamic";

const GOLD_RATE_KEYS = ["gold_rate_18", "gold_rate_21", "gold_rate_24"] as const;

async function getProducts() {
  try {
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

async function getGoldRates(): Promise<Record<string, number>> {
  try {
    const rows = await db
      .select()
      .from(appSettings)
      .where(inArray(appSettings.key, [...GOLD_RATE_KEYS]));
    const rates: Record<string, number> = {};
    for (const row of rows) {
      rates[row.key] = Number(row.value);
    }
    return rates;
  } catch (e) {
    return {};
  }
}

export default async function Home() {
  const [initialProducts, goldRates] = await Promise.all([
    getProducts(),
    getGoldRates(),
  ]);

  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <CategoriesClient initialProducts={initialProducts} goldRates={goldRates} />
      <About />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}

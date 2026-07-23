import { pgTable, serial, varchar, text, numeric, boolean, timestamp } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  nameKu: varchar("name_ku", { length: 255 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(), // ring, necklace, bracelet, earring, watch, set
  description: text("description"),
  descriptionKu: text("description_ku"),
  price: numeric("price", { precision: 12, scale: 2 }), // total final price (optional)
  priceNote: varchar("price_note", { length: 100 }), // e.g. "بە پشکنین" / "نرخی بۆ ڕۆژ"
  pricePerGram: numeric("price_per_gram", { precision: 10, scale: 2 }), // نرخی زێر لە گرامێک
  makingFee: numeric("making_fee", { precision: 10, scale: 2 }), // حەقدەست بە هەر گرامێک یان کۆی گشتی
  makingFeeType: varchar("making_fee_type", { length: 20 }).default("total"), // "per_gram" یان "total"
  material: varchar("material", { length: 100 }), // gold18, gold21, gold24, silver, diamond
  karat: varchar("karat", { length: 20 }),
  weight: varchar("weight", { length: 50 }),
  imageUrl: text("image_url"),
  featured: boolean("featured").default(false),
  inStock: boolean("in_stock").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;

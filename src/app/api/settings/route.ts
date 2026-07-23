import { NextResponse } from "next/server";
import { db } from "@/db";
import { appSettings } from "@/db/schema";
import { isAdmin } from "@/lib/auth";
import { inArray } from "drizzle-orm";

const GOLD_RATE_KEYS = ["gold_rate_18", "gold_rate_21", "gold_rate_24"] as const;

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const rows = await db
      .select()
      .from(appSettings)
      .where(inArray(appSettings.key, [...GOLD_RATE_KEYS]));

    const rates: Record<string, number> = {};
    for (const row of rows) {
      rates[row.key] = Number(row.value);
    }

    return NextResponse.json({ rates });
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json({ rates: {} }, { status: 200 });
  }
}

export async function PUT(request: Request) {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await request.json();

    for (const key of GOLD_RATE_KEYS) {
      const value = body[key];
      if (value === undefined || value === null || value === "") continue;
      await db
        .insert(appSettings)
        .values({ key, value: String(value) })
        .onConflictDoUpdate({
          target: appSettings.key,
          set: { value: String(value), updatedAt: new Date() },
        });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating settings:", error);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}

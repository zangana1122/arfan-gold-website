import { cookies } from "next/headers";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "arfan123";
const COOKIE_NAME = "arfan_gold_admin";

export async function isAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  return token === "authenticated";
}

export async function login(password: string) {
  return password === ADMIN_PASSWORD;
}

export function getCookieName() {
  return COOKIE_NAME;
}

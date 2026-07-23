"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { STORE } from "@/lib/store";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "وشەی نهێنی هەڵەیە");
      }
    } catch {
      setError("کێشەی پەیوەندی");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative bg-cover bg-center"
      style={{ backgroundImage: "url('/images/hero-jewelry.jpg')" }}
    >
      <div className="absolute inset-0 bg-[#1a1410]/90"></div>
      <div className="relative w-full max-w-md">
        <Link
          href="/"
          className="block text-center text-white/60 hover:text-white text-sm mb-6"
        >
          ← گەڕانەوە بۆ سەرەکی
        </Link>
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full gold-gradient flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="white" className="w-9 h-9">
                <path d="M12 2L15 8.5L22 9.5L17 14.5L18.5 22L12 18.5L5.5 22L7 14.5L2 9.5L9 8.5L12 2Z" />
              </svg>
            </div>
            <h1 className="text-2xl font-display font-bold gold-text">
              {STORE.nameKu}
            </h1>
            <p className="text-[#2a2119]/60 text-sm mt-2">
              چوونەژوورەوەی بەڕێوەبەر
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#2a2119] mb-2">
                وشەی نهێنی
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[#c9a961]/30 bg-[#faf7f2] focus:outline-none focus:border-[#c9a961] focus:bg-white transition-colors text-[#1a1410]"
                placeholder="وشەی نهێنی"
                dir="ltr"
                autoFocus
              />
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full gold-btn py-3 rounded-xl font-semibold shadow-lg disabled:opacity-60"
            >
              {loading ? "چاوەڕبە..." : "چوونەژوورەوە"}
            </button>
          </form>

          <p className="text-center text-xs text-[#2a2119]/50 mt-6">
            وشەی نهێنی بنەڕەت: <span className="font-mono font-semibold" dir="ltr">arfan123</span>
          </p>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Product } from "@/db/schema";
import { STORE, USD_TO_IQD } from "@/lib/store";

const CATEGORIES = [
  { id: "ring", ku: "ئەڵقە" },
  { id: "necklace", ku: "ملوانکە" },
  { id: "bracelet", ku: "دەستبەند" },
  { id: "earring", ku: "گوێوارە" },
  { id: "watch", ku: "کاتژمێر" },
  { id: "set", ku: "سێت" },
];

const MATERIALS = [
  { id: "gold18", ku: "زێری ١٨ عەیار" },
  { id: "gold21", ku: "زێری ٢١ عەیار" },
  { id: "gold24", ku: "زێری ٢٤ عەیار" },
  { id: "silver", ku: "زیو" },
  { id: "diamond", ku: "ئەڵماس" },
];

type ProductForm = {
  id?: number;
  name: string;
  nameKu: string;
  category: string;
  description: string;
  descriptionKu: string;
  price: string;
  priceNote: string;
  pricePerGram: string;
  makingFee: string;
  makingFeeType: "per_gram" | "total";
  material: string;
  karat: string;
  weight: string;
  imageUrl: string;
  featured: boolean;
  inStock: boolean;
};

const emptyForm: ProductForm = {
  name: "",
  nameKu: "",
  category: "ring",
  description: "",
  descriptionKu: "",
  price: "",
  priceNote: "بە پشکنین",
  pricePerGram: "",
  makingFee: "",
  makingFeeType: "per_gram",
  material: "gold21",
  karat: "21",
  weight: "",
  imageUrl: "",
  featured: false,
  inStock: true,
};

export default function AdminPanel({ initialProducts }: { initialProducts: Product[] }) {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [form, setForm] = useState<ProductForm>(emptyForm);
  const [editing, setEditing] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [filterCategory, setFilterCategory] = useState("all");
  const [uploadingImg, setUploadingImg] = useState(false);

  const [goldRates, setGoldRates] = useState<{ gold_rate_18: string; gold_rate_21: string; gold_rate_24: string }>({
    gold_rate_18: "",
    gold_rate_21: "",
    gold_rate_24: "",
  });
  const [savingRates, setSavingRates] = useState(false);

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        const rates = data.rates || {};
        setGoldRates({
          gold_rate_18: rates.gold_rate_18 ? String(Math.round(rates.gold_rate_18 * USD_TO_IQD)) : "",
          gold_rate_21: rates.gold_rate_21 ? String(Math.round(rates.gold_rate_21 * USD_TO_IQD)) : "",
          gold_rate_24: rates.gold_rate_24 ? String(Math.round(rates.gold_rate_24 * USD_TO_IQD)) : "",
        });
      })
      .catch(() => {});
  }, []);

  async function handleSaveRates(e: FormEvent) {
    e.preventDefault();
    setSavingRates(true);
    try {
      // Rates are entered in IQD but stored internally in USD (product prices are USD-based).
      const payload = {
        gold_rate_18: goldRates.gold_rate_18 ? Number(goldRates.gold_rate_18) / USD_TO_IQD : "",
        gold_rate_21: goldRates.gold_rate_21 ? Number(goldRates.gold_rate_21) / USD_TO_IQD : "",
        gold_rate_24: goldRates.gold_rate_24 ? Number(goldRates.gold_rate_24) / USD_TO_IQD : "",
      };
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setMessage({ type: "success", text: "نرخی زێر نوێکرایەوە بۆ هەموو بەرهەمەکان" });
        setTimeout(() => setMessage(null), 2500);
      } else {
        setMessage({ type: "error", text: "کێشە هەبوو لە نوێکردنەوەی نرخ" });
      }
    } catch {
      setMessage({ type: "error", text: "کێشە هەبوو لە نوێکردنەوەی نرخ" });
    } finally {
      setSavingRates(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  function resetForm() {
    setForm(emptyForm);
    setEditing(null);
  }

  function startEdit(p: Product) {
    setForm({
      id: p.id,
      name: p.name || "",
      nameKu: p.nameKu || "",
      category: p.category || "ring",
      description: p.description || "",
      descriptionKu: p.descriptionKu || "",
      price: p.price ? String(p.price) : "",
      priceNote: p.priceNote || "",
      pricePerGram: (p as any).pricePerGram ? String((p as any).pricePerGram) : "",
      makingFee: (p as any).makingFee ? String((p as any).makingFee) : "",
      makingFeeType: ((p as any).makingFeeType as "per_gram" | "total") || "per_gram",
      material: p.material || "",
      karat: p.karat || "",
      weight: p.weight || "",
      imageUrl: p.imageUrl || "",
      featured: !!p.featured,
      inStock: !!p.inStock,
    });
    setEditing(p.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleDelete(id: number) {
    if (!confirm("دڵنیایت لە سڕینەوە؟")) return;
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    if (res.ok) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      setMessage({ type: "success", text: "بەرهەم سڕایەوە" });
      setTimeout(() => setMessage(null), 2500);
    } else {
      setMessage({ type: "error", text: "کێشە هەبوو لە سڕینەوە" });
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const payload = {
        ...form,
        price: form.price ? Number(form.price) : null,
        pricePerGram: form.pricePerGram ? Number(form.pricePerGram) : null,
        makingFee: form.makingFee ? Number(form.makingFee) : null,
      };

      if (editing) {
        const res = await fetch(`/api/products/${editing}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          const data = await res.json();
          setProducts((prev) =>
            prev.map((p) => (p.id === editing ? data.product : p))
          );
          setMessage({ type: "success", text: "نوێکرایەوە ✅" });
        } else {
          setMessage({ type: "error", text: "کێشە هەبوو لە نوێکردنەوە" });
        }
      } else {
        const res = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          const data = await res.json();
          setProducts((prev) => [data.product, ...prev]);
          setMessage({ type: "success", text: "زیادکرا ✅" });
        } else {
          setMessage({ type: "error", text: "کێشە هەبوو لە زیادکردن" });
        }
      }
      resetForm();
      setTimeout(() => setMessage(null), 2500);
    } catch (err) {
      setMessage({ type: "error", text: "هەڵەیەک ڕوویدا" });
    } finally {
      setSaving(false);
    }
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImg(true);
    try {
      // Convert to base64 and store as data URL (simple, no external service needed)
      const reader = new FileReader();
      reader.onload = () => {
        setForm((prev) => ({ ...prev, imageUrl: reader.result as string }));
        setUploadingImg(false);
      };
      reader.onerror = () => setUploadingImg(false);
      reader.readAsDataURL(file);
    } catch {
      setUploadingImg(false);
    }
  }

  const filteredProducts =
    filterCategory === "all"
      ? products
      : products.filter((p) => p.category === filterCategory);

  return (
    <div>
      {/* Admin Header */}
      <div className="bg-[#1a1410] text-white shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                <path d="M12 2L15 8.5L22 9.5L17 14.5L18.5 22L12 18.5L5.5 22L7 14.5L2 9.5L9 8.5L12 2Z" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold gold-text leading-none">
                {STORE.nameKu}
              </h1>
              <p className="text-white/60 text-xs mt-0.5">پانێڵی بەڕێوەبەر</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="px-4 py-2 rounded-lg border border-white/20 text-white/80 hover:bg-white/10 text-sm transition-colors"
            >
              ← گەڕانەوە بۆ سەرەکی
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-red-500/20 border border-red-500/40 text-red-200 hover:bg-red-500 hover:text-white text-sm transition-colors"
            >
              چونەدەرەوە
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {message && (
          <div
            className={`mb-6 p-4 rounded-xl font-medium text-center ${
              message.type === "success"
                ? "bg-green-100 text-green-800 border border-green-200"
                : "bg-red-100 text-red-800 border border-red-200"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Live Gold Rate Panel */}
        <div className="bg-white rounded-2xl shadow-lg border border-[#c9a961]/30 p-6 md:p-8 mb-8">
          <h2 className="text-xl font-display font-bold text-[#1a1410] mb-2 flex items-center gap-2">
            <span className="gold-text">💰</span> نرخی ئەمڕۆی زێر بۆ گرام (دینار)
          </h2>
          <p className="text-sm text-[#2a2119]/60 mb-5">
            ئەم نرخانە بە شێوەیەکی خۆکار بۆ هەموو ئەو بەرهەمانە بەکاردێت کە هەمان عەیاریان هەیە. تەنها ئەمانە نوێ بکەرەوە هەموو ڕۆژێک بەپێی نرخی بازاڕ.
          </p>
          <form onSubmit={handleSaveRates} className="grid sm:grid-cols-3 gap-4">
            <Field label="١٨ عەیار (دینار)">
              <input
                type="number"
                step="1"
                value={goldRates.gold_rate_18}
                onChange={(e) => setGoldRates((r) => ({ ...r, gold_rate_18: e.target.value }))}
                placeholder="بۆ نموونە 105000"
                className="w-full px-4 py-2.5 rounded-xl border border-[#c9a961]/30 focus:border-[#c9a961] outline-none"
              />
            </Field>
            <Field label="٢١ عەیار (دینار)">
              <input
                type="number"
                step="1"
                value={goldRates.gold_rate_21}
                onChange={(e) => setGoldRates((r) => ({ ...r, gold_rate_21: e.target.value }))}
                placeholder="بۆ نموونە 120500"
                className="w-full px-4 py-2.5 rounded-xl border border-[#c9a961]/30 focus:border-[#c9a961] outline-none"
              />
            </Field>
            <Field label="٢٤ عەیار (دینار)">
              <input
                type="number"
                step="1"
                value={goldRates.gold_rate_24}
                onChange={(e) => setGoldRates((r) => ({ ...r, gold_rate_24: e.target.value }))}
                placeholder="بۆ نموونە 144100"
                className="w-full px-4 py-2.5 rounded-xl border border-[#c9a961]/30 focus:border-[#c9a961] outline-none"
              />
            </Field>
            <button
              type="submit"
              disabled={savingRates}
              className="sm:col-span-3 gold-btn py-3 rounded-xl font-semibold disabled:opacity-60"
            >
              {savingRates ? "نوێکردنەوە..." : "نوێکردنەوەی نرخی زێر بۆ هەموو بەرهەمەکان"}
            </button>
          </form>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-[#c9a961]/20 p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-display font-bold text-[#1a1410] mb-6 flex items-center gap-2">
            {editing ? (
              <>
                <span className="gold-text">✎</span> دەستکاری بەرهەم
              </>
            ) : (
              <>
                <span className="gold-text">+</span> زیادکردنی بەرهەمی نوێ
              </>
            )}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <Field label="ناو بە کوردی *">
                <input
                  type="text"
                  required
                  value={form.nameKu}
                  onChange={(e) => setForm({ ...form, nameKu: e.target.value })}
                  className={inputCls}
                  placeholder="ئەڵقەی زێری شاهانە"
                />
              </Field>

              <Field label="ناو بە ئینگلیزی">
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputCls}
                  placeholder="Royal Gold Ring"
                  dir="ltr"
                />
              </Field>

              <Field label="جۆر *">
                <select
                  required
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className={inputCls}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.ku}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="مادە / عەیار">
                <select
                  value={form.material}
                  onChange={(e) => setForm({ ...form, material: e.target.value })}
                  className={inputCls}
                >
                  {MATERIALS.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.ku}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="عەیار (بە تەنها ژمارە)">
                <input
                  type="text"
                  value={form.karat}
                  onChange={(e) => setForm({ ...form, karat: e.target.value })}
                  className={inputCls}
                  placeholder="21"
                  dir="ltr"
                />
              </Field>

              <Field label="کێش">
                <input
                  type="text"
                  value={form.weight}
                  onChange={(e) => setForm({ ...form, weight: e.target.value })}
                  className={inputCls}
                  placeholder="٦ گرام"
                />
              </Field>

              <Field label="نرخی کۆتایی (بە دۆلار - ئارەزوومەندانە)">
                <input
                  type="number"
                  step="0.01"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className={inputCls}
                  placeholder="1500"
                  dir="ltr"
                />
              </Field>

              <Field label="تێبینی نرخ">
                <input
                  type="text"
                  value={form.priceNote}
                  onChange={(e) => setForm({ ...form, priceNote: e.target.value })}
                  className={inputCls}
                  placeholder="بە پشکنین"
                />
              </Field>

              <Field label="نرخی زێر (هەر گرامێک بە دۆلار)">
                <input
                  type="number"
                  step="0.01"
                  value={form.pricePerGram}
                  onChange={(e) => setForm({ ...form, pricePerGram: e.target.value })}
                  className={inputCls}
                  placeholder="92"
                  dir="ltr"
                />
              </Field>

              <Field label="جۆری حەقدەست">
                <select
                  value={form.makingFeeType}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      makingFeeType: e.target.value as "per_gram" | "total",
                    })
                  }
                  className={inputCls}
                >
                  <option value="per_gram">بە هەر گرامێک</option>
                  <option value="total">کۆی گشتی (بۆ هەموو بەرهەم)</option>
                </select>
              </Field>

              <Field label={`حەقدەست (بە دۆلار ${form.makingFeeType === "per_gram" ? "لە گرامێک" : "کۆی گشتی"})`}>
                <input
                  type="number"
                  step="0.01"
                  value={form.makingFee}
                  onChange={(e) => setForm({ ...form, makingFee: e.target.value })}
                  className={inputCls}
                  placeholder="25"
                  dir="ltr"
                />
              </Field>

              <div className="md:col-span-2">
                <EstimatedTotal form={form} />
              </div>
            </div>

            <Field label="وەسف بە کوردی">
              <textarea
                rows={2}
                value={form.descriptionKu}
                onChange={(e) => setForm({ ...form, descriptionKu: e.target.value })}
                className={inputCls}
                placeholder="وەسفی بەرهەم بە کوردی..."
              />
            </Field>

            <Field label="وەسف بە ئینگلیزی">
              <textarea
                rows={2}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className={inputCls}
                placeholder="Description in English..."
                dir="ltr"
              />
            </Field>

            <Field label="وێنە (بە URL یان باربکە)">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={
                    form.imageUrl && form.imageUrl.startsWith("data:")
                      ? "(وێنەی بارکراو - دەتوانی بەجێی بهێڵی)"
                      : form.imageUrl
                  }
                  onChange={(e) =>
                    setForm({ ...form, imageUrl: e.target.value })
                  }
                  className={inputCls + " flex-1"}
                  placeholder="https://... یان فایل هەڵبژێرە"
                  dir="ltr"
                  disabled={form.imageUrl?.startsWith("data:")}
                />
                <label className="shrink-0 px-4 py-2.5 rounded-xl border border-[#c9a961]/40 text-[#a8893e] hover:bg-[#c9a961] hover:text-white cursor-pointer text-sm font-medium transition-colors flex items-center gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  {uploadingImg ? "بارکردن..." : "📁 هەڵبژاردنی فایل"}
                </label>
              </div>
              {form.imageUrl && (
                <div className="mt-3">
                  <img
                    src={form.imageUrl}
                    alt="پێشبینین"
                    className="w-28 h-28 object-cover rounded-xl border border-[#c9a961]/30"
                  />
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, imageUrl: "" })}
                    className="text-red-500 text-xs mt-2 hover:underline"
                  >
                    سڕینەوەی وێنە
                  </button>
                </div>
              )}
            </Field>

            <div className="flex flex-wrap gap-6 pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  className="w-5 h-5 accent-[#c9a961]"
                />
                <span className="text-sm font-medium text-[#1a1410]">
                  ⭐ بەرهەمی تایبەت (لە سەرەوە پیشان بدە)
                </span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.inStock}
                  onChange={(e) => setForm({ ...form, inStock: e.target.checked })}
                  className="w-5 h-5 accent-[#c9a961]"
                />
                <span className="text-sm font-medium text-[#1a1410]">
                  ✅ لە کۆگادا هەیە
                </span>
              </label>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="gold-btn px-8 py-3 rounded-xl font-semibold shadow-lg disabled:opacity-60"
              >
                {saving
                  ? "تکایە چاوەڕبە..."
                  : editing
                  ? "نوێکردنەوە"
                  : "زیادکردن"}
              </button>
              {editing && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-8 py-3 rounded-xl border border-[#c9a961]/40 text-[#a8893e] hover:bg-[#faf7f2] font-semibold"
                >
                  هەڵوەشاندنەوە
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Products List */}
        <div className="bg-white rounded-2xl shadow-lg border border-[#c9a961]/20 p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h2 className="text-2xl font-display font-bold text-[#1a1410]">
              بەرهەمەکان ({products.length})
            </h2>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 rounded-xl border border-[#c9a961]/30 bg-white text-sm"
            >
              <option value="all">هەموو جۆرەکان</option>
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.ku}
                </option>
              ))}
            </select>
          </div>

          {filteredProducts.length === 0 ? (
            <p className="text-center py-12 text-[#2a2119]/50">
              هیچ بەرهەمێک نییە. سەرەتا بەرهەمێک زیاد بکە.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#c9a961]/20 text-right">
                    <th className="py-3 px-2 font-semibold text-[#1a1410]">وێنە</th>
                    <th className="py-3 px-2 font-semibold text-[#1a1410]">ناو</th>
                    <th className="py-3 px-2 font-semibold text-[#1a1410] hidden md:table-cell">جۆر</th>
                    <th className="py-3 px-2 font-semibold text-[#1a1410] hidden lg:table-cell">عەیار</th>
                    <th className="py-3 px-2 font-semibold text-[#1a1410] hidden md:table-cell">نرخ</th>
                    <th className="py-3 px-2 font-semibold text-[#1a1410]">دۆخ</th>
                    <th className="py-3 px-2 font-semibold text-[#1a1410]">کردار</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((p) => (
                    <tr
                      key={p.id}
                      className="border-b border-[#c9a961]/10 hover:bg-[#faf7f2] transition-colors"
                    >
                      <td className="py-3 px-2">
                        {p.imageUrl ? (
                          <img
                            src={p.imageUrl}
                            alt={p.nameKu}
                            className="w-14 h-14 object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-14 h-14 bg-[#faf7f2] rounded-lg flex items-center justify-center text-[#c9a961]/40 text-xl">
                            💎
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-2 font-medium text-[#1a1410] max-w-[200px]">
                        <div className="truncate">{p.nameKu}</div>
                        {p.featured && (
                          <span className="text-[10px] gold-text font-bold">⭐ تایبەت</span>
                        )}
                      </td>
                      <td className="py-3 px-2 hidden md:table-cell text-[#2a2119]/70">
                        {CATEGORIES.find((c) => c.id === p.category)?.ku || p.category}
                      </td>
                      <td className="py-3 px-2 hidden lg:table-cell text-[#2a2119]/70">
                        {p.karat ? `${p.karat}K` : "-"}
                      </td>
                      <td className="py-3 px-2 hidden lg:table-cell text-[#2a2119]/70 text-xs">
                        {(p as any).pricePerGram ? (
                          <span dir="ltr">${Number((p as any).pricePerGram)}/گرام</span>
                        ) : (
                          "—"
                        )}
                        {(p as any).makingFee ? (
                          <div className="text-[#a8893e] font-semibold">
                            + حەقدەست ${Number((p as any).makingFee)}
                            {(p as any).makingFeeType === "per_gram" ? "/گرام" : ""}
                          </div>
                        ) : null}
                      </td>
                      <td className="py-3 px-2 hidden md:table-cell">
                        {p.price ? (
                          <span className="gold-text font-bold" dir="ltr">
                            ${Number(p.price).toLocaleString()}
                          </span>
                        ) : (p as any).pricePerGram && (p as any).makingFee ? (
                          <span className="gold-text font-bold text-xs">
                            بە پشکنین
                          </span>
                        ) : (
                          <span className="text-[#2a2119]/60 text-xs">{p.priceNote || "بە پشکنین"}</span>
                        )}
                      </td>
                      <td className="py-3 px-2">
                        {p.inStock ? (
                          <span className="inline-block text-[10px] px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-semibold">
                            هەیە
                          </span>
                        ) : (
                          <span className="inline-block text-[10px] px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-semibold">
                            نامەوجود
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex gap-2">
                          <button
                            onClick={() => startEdit(p)}
                            className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 text-xs font-semibold"
                            title="دەستکاری"
                          >
                            ✎
                          </button>
                          <button
                            onClick={() => handleDelete(p.id)}
                            className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 text-xs font-semibold"
                            title="سڕینەوە"
                          >
                            🗑
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function toEnglishDigits(input: string): string {
  const map: Record<string, string> = {
    "٠": "0", "١": "1", "٢": "2", "٣": "3", "٤": "4",
    "٥": "5", "٦": "6", "٧": "7", "٨": "8", "٩": "9",
    "۰": "0", "۱": "1", "۲": "2", "۳": "3", "۴": "4",
    "۵": "5", "۶": "6", "۷": "7", "۸": "8", "۹": "9",
    "٫": ".", "،": ".",
  };
  return input.split("").map((c) => map[c] ?? c).join("");
}

function EstimatedTotal({ form }: { form: ProductForm }) {
  const asciiWeight = toEnglishDigits(form.weight);
  const weightMatch = asciiWeight.match(/[\d.]+/);
  const weightNum = weightMatch ? parseFloat(weightMatch[0]) : 0;
  const ppGram = parseFloat(form.pricePerGram) || 0;
  const mFee = parseFloat(form.makingFee) || 0;
  const fixedPrice = parseFloat(form.price) || 0;

  let goldTotal = 0;
  let makingTotal = 0;
  let note = "";

  if (ppGram && weightNum) {
    goldTotal = ppGram * weightNum;
    if (form.makingFeeType === "per_gram") {
      makingTotal = mFee * weightNum;
      note = `(${ppGram} + ${mFee} حەقدەست) × ${weightNum} گرام`;
    } else {
      makingTotal = mFee;
      note = `${ppGram} × ${weightNum} گرام + ${mFee} حەقدەست`;
    }
  }

  const totalCalc = goldTotal + makingTotal;
  const displayTotal = fixedPrice > 0 ? fixedPrice : totalCalc;

  if (displayTotal <= 0) return null;

  return (
    <div className="bg-gradient-to-l from-[#faf7f2] to-white border border-[#c9a961]/30 rounded-xl p-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs text-[#2a2119]/60 mb-1">
            {fixedPrice > 0 ? "نرخی کۆتایی (دەستی)" : "نرخی مەزەندەکراو"}
          </div>
          {note && <div className="text-[11px] text-[#a8893e]">{note}</div>}
        </div>
        <div className="text-2xl font-bold gold-text font-display">
          ${displayTotal.toLocaleString("en-US", { maximumFractionDigits: 2 })}
        </div>
      </div>
    </div>
  );
}

const inputCls =
  "w-full px-4 py-2.5 rounded-xl border border-[#c9a961]/30 bg-[#faf7f2] focus:outline-none focus:border-[#c9a961] focus:bg-white transition-colors text-[#1a1410] text-sm";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#2a2119] mb-2">{label}</label>
      {children}
    </div>
  );
}

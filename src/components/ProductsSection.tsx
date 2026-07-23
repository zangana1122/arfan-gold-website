"use client";

import { useState, useMemo } from "react";
import type { Product } from "@/db/schema";
import { productWhatsappUrl } from "@/lib/store";

const materialLabels: Record<string, { ku: string; color: string }> = {
  gold18: { ku: "زێری ١٨ عەیار", color: "bg-amber-100 text-amber-800" },
  gold21: { ku: "زێری ٢١ عەیار", color: "bg-yellow-100 text-yellow-900" },
  gold24: { ku: "زێری ٢٤ عەیار", color: "bg-yellow-200 text-yellow-900" },
  silver: { ku: "زیو", color: "bg-gray-100 text-gray-700" },
  diamond: { ku: "ئەڵماس", color: "bg-blue-50 text-blue-800" },
};

const FILTERS = [
  { id: "all", ku: "هەموو" },
  { id: "featured", ku: "تایبەت" },
  { id: "ring", ku: "ئەڵقە" },
  { id: "necklace", ku: "ملوانکە" },
  { id: "bracelet", ku: "دەستبەند" },
  { id: "earring", ku: "گوێوارە" },
  { id: "watch", ku: "کاتژمێر" },
  { id: "set", ku: "سێت" },
];

// Extend Product type locally for new columns (until Drizzle typegen picks them up)
type ProductWithPrice = Product & {
  pricePerGram?: string | number | null;
  makingFee?: string | number | null;
  makingFeeType?: string | null;
};

// Map Eastern-Arabic (Arabic-Indic) numerals and Persian/Urdu variants to ASCII
function toEnglishDigits(input: string): string {
  const map: Record<string, string> = {
    "٠": "0", "١": "1", "٢": "2", "٣": "3", "٤": "4",
    "٥": "5", "٦": "6", "٧": "7", "٨": "8", "٩": "9",
    "۰": "0", "۱": "1", "۲": "2", "۳": "3", "۴": "4",
    "۵": "5", "۶": "6", "۷": "7", "۸": "8", "۹": "9",
    "٫": ".", "،": ".",
  };
  return input
    .split("")
    .map((ch) => map[ch] ?? ch)
    .join("");
}

function parseWeight(weight?: string | null): number {
  if (!weight) return 0;
  const ascii = toEnglishDigits(weight);
  const m = ascii.match(/[\d.]+/);
  return m ? parseFloat(m[0]) : 0;
}

function toNum(v: any): number {
  const n = parseFloat(v);
  return isNaN(n) ? 0 : n;
}

function getPriceBreakdown(p: ProductWithPrice) {
  const weight = parseWeight(p.weight);
  const ppGram = toNum(p.pricePerGram);
  const mFee = toNum(p.makingFee);
  const fixed = toNum(p.price);
  const feeType = p.makingFeeType || "per_gram";

  const goldTotal = ppGram && weight ? ppGram * weight : 0;
  const makingTotal =
    ppGram && weight
      ? feeType === "per_gram"
        ? mFee * weight
        : mFee
      : !ppGram && feeType === "total"
      ? mFee
      : 0;
  const totalCalc = goldTotal + makingTotal;
  const total = fixed > 0 ? fixed : totalCalc;

  return {
    total,
    fixed: fixed > 0,
    ppGram,
    mFee,
    feeType,
    weight,
    goldTotal,
    makingTotal,
    hasPerGram: ppGram > 0,
    hasMaking: mFee > 0,
  };
}



export default function ProductsSection({
  initialProducts,
  controlledCategory,
  onCategoryChange,
}: {
  initialProducts: Product[];
  controlledCategory?: string;
  onCategoryChange?: (c: string) => void;
}) {
  const [internalFilter, setInternalFilter] = useState<string>("all");
  const activeFilter = controlledCategory ?? internalFilter;
  const setActiveFilter = (c: string) => {
    if (onCategoryChange) onCategoryChange(c);
    else setInternalFilter(c);
  };
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filtered = useMemo(() => {
    if (activeFilter === "all") return initialProducts;
    if (activeFilter === "featured") return initialProducts.filter((p) => p.featured);
    return initialProducts.filter((p) => p.category === activeFilter);
  }, [activeFilter, initialProducts]);

  return (
    <>
      <section id="products" className="py-24 bg-gradient-to-b from-[#faf7f2] to-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-12 gold-gradient"></div>
              <span className="text-[#a8893e] tracking-[0.3em] text-xs uppercase font-medium">
                Our Collection
              </span>
              <div className="h-px w-12 gold-gradient"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-[#1a1410] mb-4">
              کۆمەڵێک لە <span className="gold-text">بەرهەمەکانمان</span>
            </h2>
            <p className="text-[#2a2119]/60 max-w-xl mx-auto">
              جوانترین و نایابترین زێرەکان بۆ هەموو بۆنە و یادەوەرییەکانت
            </p>
          </div>

          {/* Pricing info banner */}
          <div className="max-w-3xl mx-auto mb-10 bg-gradient-to-l from-[#faf7f2] via-white to-[#f5eedd] border border-[#c9a961]/30 rounded-2xl p-5 text-center shadow-sm">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-2xl">💰</span>
              <h4 className="font-bold text-[#1a1410] text-base">
                نرخەکان چۆن حیساب دەکرێن؟
              </h4>
            </div>
            <p className="text-[#2a2119]/70 text-sm leading-relaxed">
              نرخ = <span className="gold-text font-bold">(نرخی ڕۆژانەی زێر × کێش)</span> + <span className="gold-text font-bold">حەقدەست</span>
              <br />
              <span className="text-xs text-[#2a2119]/50">
                * نرخەکان بە نرخی ئەمڕۆی زێر حیساب دەکرێن. بۆ نرخی ڕاستەقینە پەیوەندی بکە.
              </span>
            </p>
          </div>

          {/* Filter pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilter === f.id
                    ? "gold-btn shadow-lg"
                    : "bg-white text-[#2a2119] border border-[#c9a961]/30 hover:border-[#c9a961]"
                }`}
              >
                {f.ku}
              </button>
            ))}
          </div>

          {/* Products grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-[#2a2119]/50">
              <p className="text-lg">هیچ بەرهەمێک نەدۆزرایەوە</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filtered.map((product) => (
                <div
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                  className="product-card group bg-white rounded-2xl overflow-hidden shadow-sm card-hover cursor-pointer border border-[#c9a961]/10"
                >
                  <div className="relative aspect-square overflow-hidden bg-[#faf7f2]">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.nameKu}
                        className="product-img w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#c9a961]/40">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-20 h-20">
                          <path d="M12 2L15 8.5L22 9.5L17 14.5L18.5 22L12 18.5L5.5 22L7 14.5L2 9.5L9 8.5L12 2Z" />
                        </svg>
                      </div>
                    )}
                    {product.featured && (
                      <div className="absolute top-4 right-4 gold-gradient text-white text-xs px-3 py-1 rounded-full font-semibold shadow-md">
                        ⭐ تایبەت
                      </div>
                    )}
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">نامەوجود</span>
                      </div>
                    )}
                    {/* Quick overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100">
                      <div className="gold-btn px-5 py-2 rounded-full text-sm font-semibold shadow-xl">
                        بینینی وردەکاری
                      </div>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-[#1a1410] text-lg group-hover:text-[#a8893e] transition-colors">
                        {product.nameKu}
                      </h3>
                    </div>
                    {product.karat && (
                      <span
                        className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full mb-3 ${
                          materialLabels[product.material || ""]?.color ||
                          "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {materialLabels[product.material || ""]?.ku || `زێری ${product.karat} عەیار`}
                      </span>
                    )}
                    <p className="text-sm text-[#2a2119]/60 mb-3 line-clamp-2 leading-relaxed">
                      {product.descriptionKu}
                    </p>

                    {/* Price block - prominent */}
                    {(() => {
                      const b = getPriceBreakdown(product as ProductWithPrice);
                      if (b.total > 0) {
                        return (
                          <div className="bg-gradient-to-l from-[#faf7f2] to-[#f5eedd] border border-[#c9a961]/30 rounded-xl px-3 py-2.5 mb-3">
                            <div className="flex items-baseline justify-between gap-2">
                              <div>
                                <div className="text-[10px] text-[#a8893e] font-medium">
                                  نرخی کۆتایی
                                </div>
                                {b.weight > 0 && b.hasPerGram && (
                                  <div className="text-[10px] text-[#2a2119]/50 mt-0.5">
                                    {b.weight} گرام + حەقدەست
                                  </div>
                                )}
                              </div>
                              <div className="text-left">
                                <div className="gold-text font-extrabold text-xl font-display leading-none">
                                  ${b.total.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                                </div>
                                <div className="text-[9px] text-[#2a2119]/50 mt-0.5">
                                  بە دۆلار
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return (
                        <div className="bg-[#faf7f2] border border-[#c9a961]/20 rounded-xl px-3 py-2 mb-3 text-center">
                          <div className="gold-text font-bold text-sm">
                            {product.priceNote || "بە پشکنین"}
                          </div>
                        </div>
                      );
                    })()}

                    <div className="flex items-center justify-between pt-2 border-t border-[#c9a961]/10">
                      {product.weight && (
                        <span className="text-xs text-[#2a2119]/50 flex items-center gap-1">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6h18M3 12h18M3 18h18" />
                          </svg>
                          {product.weight}
                        </span>
                      )}
                      {(product as ProductWithPrice).makingFee ? (
                        <span className="text-[10px] text-[#a8893e] font-medium">
                          ✦ نرخی ڕۆژ + حەقدەست
                        </span>
                      ) : (
                        <span className="text-[10px] text-[#2a2119]/50">
                          بۆ زانیاری پەیوەندی بکە
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Product Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col md:flex-row animate-[fadeInUp_0.3s_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="md:w-1/2 aspect-square md:aspect-auto bg-[#faf7f2] relative">
              {selectedProduct.imageUrl && (
                <img
                  src={selectedProduct.imageUrl}
                  alt={selectedProduct.nameKu}
                  className="w-full h-full object-cover"
                />
              )}
              <button
                onClick={() => setSelectedProduct(null)}
                className="md:hidden absolute top-4 left-4 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg"
              >
                ✕
              </button>
            </div>
            <div className="md:w-1/2 p-8 overflow-y-auto relative">
              <button
                onClick={() => setSelectedProduct(null)}
                className="hidden md:flex absolute top-4 left-4 w-9 h-9 rounded-full bg-[#faf7f2] items-center justify-center hover:bg-[#c9a961] hover:text-white transition-colors"
              >
                ✕
              </button>

              {selectedProduct.featured && (
                <span className="inline-block gold-gradient text-white text-xs px-3 py-1 rounded-full font-semibold mb-4">
                  ⭐ بەرهەمی تایبەت
                </span>
              )}
              <h3 className="text-3xl font-display font-bold text-[#1a1410] mb-3">
                {selectedProduct.nameKu}
              </h3>
              <p className="text-[#2a2119]/70 leading-relaxed mb-6">
                {selectedProduct.descriptionKu}
              </p>

              <div className="space-y-3 mb-6">
                {selectedProduct.karat && (
                  <div className="flex justify-between items-center py-2 border-b border-[#c9a961]/10">
                    <span className="text-[#2a2119]/60 text-sm">عەیار:</span>
                    <span className="font-semibold text-[#a8893e]">{selectedProduct.karat}</span>
                  </div>
                )}
                {selectedProduct.weight && (
                  <div className="flex justify-between items-center py-2 border-b border-[#c9a961]/10">
                    <span className="text-[#2a2119]/60 text-sm">کێش:</span>
                    <span className="font-semibold text-[#1a1410]">{selectedProduct.weight}</span>
                  </div>
                )}
                {(() => {
                  const b = getPriceBreakdown(selectedProduct as ProductWithPrice);
                  return (
                    <>
                      {b.hasPerGram && (
                        <div className="flex justify-between items-center py-2 border-b border-[#c9a961]/10">
                          <span className="text-[#2a2119]/60 text-sm">نرخی زێر لە گرام:</span>
                          <span className="font-semibold text-[#1a1410]" dir="ltr">
                            ${b.ppGram.toFixed(2)}
                          </span>
                        </div>
                      )}
                      {b.hasMaking && (
                        <div className="flex justify-between items-center py-2 border-b border-[#c9a961]/10">
                          <span className="text-[#2a2119]/60 text-sm">
                            حەقدەست {b.feeType === "per_gram" ? "(لە گرام)" : "(کۆی گشتی)"}:
                          </span>
                          <span className="font-semibold text-[#a8893e]" dir="ltr">
                            ${b.mFee.toFixed(2)}
                            {b.feeType === "per_gram" ? " / گرام" : ""}
                          </span>
                        </div>
                      )}
                      {b.goldTotal > 0 && b.hasPerGram && (
                        <div className="flex justify-between items-center py-2 border-b border-[#c9a961]/10 text-sm">
                          <span className="text-[#2a2119]/60">نرخی زێر بە کێش:</span>
                          <span className="text-[#1a1410]" dir="ltr">
                            ${b.goldTotal.toFixed(2)}
                          </span>
                        </div>
                      )}
                      {b.makingTotal > 0 && b.hasMaking && (
                        <div className="flex justify-between items-center py-2 border-b border-[#c9a961]/10 text-sm">
                          <span className="text-[#2a2119]/60">کۆی حەقدەست:</span>
                          <span className="text-[#a8893e]" dir="ltr">
                            ${b.makingTotal.toFixed(2)}
                          </span>
                        </div>
                      )}
                      {b.total > 0 && (
                        <div className="mt-3 gold-gradient rounded-2xl p-4 shadow-lg -mx-1">
                          <div className="flex items-center justify-between text-white">
                            <div>
                              <div className="text-xs opacity-80">نرخی کۆتایی مەزەندەکراو</div>
                              <div className="text-[10px] opacity-70 mt-0.5">
                                بە دۆلار • بە نرخی ئەمڕۆ
                              </div>
                            </div>
                            <div className="text-3xl font-extrabold font-display leading-none" dir="ltr">
                              ${b.total.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                            </div>
                          </div>
                        </div>
                      )}
                      {b.total === 0 && !selectedProduct.price && (
                        <div className="py-3 text-center text-[#2a2119]/70">
                          {selectedProduct.priceNote || "بە پشکنین / بۆ زانیاری پەیوەندی بکە"}
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>

              <a
                href={productWhatsappUrl(selectedProduct.nameKu)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setSelectedProduct(null)}
                className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white px-6 py-3.5 rounded-full font-semibold shadow-lg transition-all"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.693.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                </svg>
                پرسیار بە واتسئاپ
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

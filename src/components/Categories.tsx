"use client";

const categories = [
  {
    id: "ring",
    nameKu: "ئەڵقە",
    nameEn: "Rings",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
        <circle cx="12" cy="15" r="6" />
        <path d="M8 15l2-7h4l2 7" />
        <circle cx="12" cy="7" r="2" />
      </svg>
    ),
  },
  {
    id: "necklace",
    nameKu: "ملوانکە",
    nameEn: "Necklaces",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
        <path d="M12 3v18" strokeDasharray="2 2" />
        <path d="M6 8c0 0 3-2 6-2s6 2 6 2" />
        <path d="M8 9c0 3 2 6 4 6s4-3 4-6" />
        <circle cx="12" cy="17" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "bracelet",
    nameKu: "دەستبەند",
    nameEn: "Bracelets",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
        <ellipse cx="12" cy="12" rx="8" ry="6" />
        <circle cx="4" cy="12" r="1.5" fill="currentColor" />
        <circle cx="20" cy="12" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "earring",
    nameKu: "گوێوارە",
    nameEn: "Earrings",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
        <path d="M8 3v8" />
        <circle cx="8" cy="15" r="4" />
        <path d="M16 3v8" />
        <circle cx="16" cy="15" r="4" />
      </svg>
    ),
  },
  {
    id: "watch",
    nameKu: "کاتژمێر",
    nameEn: "Watches",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
        <circle cx="12" cy="12" r="6" />
        <path d="M9 3h6M12 3v3M12 18v3M9 21h6" />
        <path d="M12 9v3l2 2" />
      </svg>
    ),
  },
  {
    id: "set",
    nameKu: "سێتی تەواو",
    nameEn: "Full Sets",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
        <path d="M12 2l2 4h-4l2-4z" fill="currentColor" />
        <circle cx="6" cy="14" r="3" />
        <circle cx="18" cy="14" r="3" />
        <path d="M12 8v4" />
        <rect x="8" y="16" width="8" height="6" rx="1" />
      </svg>
    ),
  },
];

export default function Categories({
  activeCategory,
  onSelect,
}: {
  activeCategory: string;
  onSelect: (c: string) => void;
}) {
  return (
    <section id="categories" className="py-24 bg-[#faf7f2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12 gold-gradient"></div>
            <span className="text-[#a8893e] tracking-[0.3em] text-xs uppercase font-medium">
              Categories
            </span>
            <div className="h-px w-12 gold-gradient"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-[#1a1410] mb-4">
            جۆرەکانی <span className="gold-text">زێر</span>
          </h2>
          <p className="text-[#2a2119]/60 max-w-xl mx-auto">
            هەموو جۆرەکانی زێر و زیو و ئەڵماس بۆ هەموو بۆنەکان
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          <button
            onClick={() => onSelect("all")}
            className={`group p-6 rounded-2xl transition-all duration-300 text-center ${
              activeCategory === "all"
                ? "bg-[#1a1410] text-white shadow-xl"
                : "bg-white text-[#1a1410] hover:shadow-lg hover:bg-[#1a1410] hover:text-white"
            }`}
          >
            <div
              className={`mx-auto mb-3 flex items-center justify-center w-16 h-16 rounded-full transition-colors ${
                activeCategory === "all"
                  ? "gold-gradient text-white"
                  : "bg-[#faf7f2] text-[#a8893e] group-hover:gold-gradient group-hover:text-white"
              }`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
            </div>
            <h3 className="font-bold text-base">هەمووی</h3>
            <p className="text-xs opacity-60 mt-1">All</p>
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              className={`group p-6 rounded-2xl transition-all duration-300 text-center card-hover ${
                activeCategory === cat.id
                  ? "bg-[#1a1410] text-white shadow-xl"
                  : "bg-white text-[#1a1410] hover:shadow-lg hover:bg-[#1a1410] hover:text-white"
              }`}
            >
              <div
                className={`mx-auto mb-3 flex items-center justify-center w-16 h-16 rounded-full transition-colors ${
                  activeCategory === cat.id
                    ? "gold-gradient text-white"
                    : "bg-[#faf7f2] text-[#a8893e] group-hover:gold-gradient group-hover:text-white"
                }`}
              >
                {cat.icon}
              </div>
              <h3 className="font-bold text-base">{cat.nameKu}</h3>
              <p className="text-xs opacity-60 mt-1">{cat.nameEn}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

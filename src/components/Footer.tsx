import { STORE, whatsappUrl } from "@/lib/store";

export default function Footer() {
  return (
    <footer className="bg-[#0f0b08] text-white pt-16 pb-8 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-full gold-gradient flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7">
                  <path d="M12 2L15 8.5L22 9.5L17 14.5L18.5 22L12 18.5L5.5 22L7 14.5L2 9.5L9 8.5L12 2Z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold gold-text font-display leading-none">
                  {STORE.nameKu}
                </h3>
                <p className="text-[9px] md:text-[10px] text-white/50 tracking-widest uppercase mt-0.5">
                  {STORE.nameEn}
                </p>
              </div>
            </div>
            <p className="text-white/60 leading-relaxed max-w-md mb-6">
              دوکانی {STORE.nameKu} بۆ جوانترین زێر و زیو و ئەڵماس. زیاتر لە ٢٠ ساڵ لە خزمەتی ئێوە بە کوالێتی و دڵسۆزیەوە.
            </p>
            <div className="flex gap-3">
              {[
                { label: "WhatsApp", initials: "WA", href: whatsappUrl() },
                { label: "Instagram", initials: "IG", href: "#" },
                { label: "Facebook", initials: "FB", href: "#" },
                { label: "TikTok", initials: "TK", href: "#" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-10 h-10 rounded-full border border-[#c9a961]/30 flex items-center justify-center text-sm font-bold text-[#c9a961] hover:gold-gradient hover:text-white hover:border-transparent transition-all"
                >
                  {s.initials}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-5 gold-text">بەستەرەکان</h4>
            <ul className="space-y-3 text-white/60 text-sm">
              <li><a href="#home" className="hover:text-[#e5c989] transition-colors">سەرەکی</a></li>
              <li><a href="#categories" className="hover:text-[#e5c989] transition-colors">جۆرەکان</a></li>
              <li><a href="#products" className="hover:text-[#e5c989] transition-colors">بەرهەمەکان</a></li>
              <li><a href="#about" className="hover:text-[#e5c989] transition-colors">دەربارە</a></li>
              <li><a href="#contact" className="hover:text-[#e5c989] transition-colors">پەیوەندی</a></li>
              <li><a href="/admin" className="hover:text-[#e5c989] transition-colors">🔐 بەڕێوەبەر</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-5 gold-text">پەیوەندی</h4>
            <ul className="space-y-3 text-white/60 text-sm">
              <li>{STORE.address}</li>
              <li>
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors" dir="ltr">
                  {STORE.phone}
                </a>
              </li>
              <li dir="ltr" className="text-right">{STORE.email}</li>
              <li>{STORE.hours}</li>
            </ul>
          </div>
        </div>

        <div className="divider-gold mb-8"></div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/50">
          <p>© {new Date().getFullYear()} دوکانی {STORE.nameKu}. هەموو مافەکان پارێزراون.</p>
          <p className="flex items-center gap-2">
            دروستکراوە بە <span className="gold-text">❤</span> لە کوردستان
          </p>
        </div>
      </div>
    </footer>
  );
}

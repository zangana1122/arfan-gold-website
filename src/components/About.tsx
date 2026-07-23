import { STORE } from "@/lib/store";

export default function About() {
  const features = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
          <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "دڵنیایی کوالێتی",
      desc: "هەموو بەرهەمەکانمان بە کوالێتی بەرز و بە دڵنیایی پشکنران",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
          <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "کاری دەست",
      desc: "بەرهەمەکانمان بە دەست دروست دەکرێن و کاری هونەرمەندانی ئێمەن",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
          <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      ),
      title: "نرخی گونجاو",
      desc: "نرخەکانمان بە گونجاوی و بەرپەرچی بە کوالێتی و ڕاستیەوە دەبەخشرێن",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
          <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: "خزمەتگوزاری کڕیار",
      desc: "پشتگیری و خزمەتگوزاری تایبەت بە کڕیارەکانمان پێشکەش دەکەین",
    },
  ];

  return (
    <section id="about" className="py-24 bg-[#1a1410] text-white relative overflow-hidden noise-bg">
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-[#c9a961]/5 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#c9a961]/5 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl border border-[#c9a961]/20">
              <img
                src="/images/store-interior.jpg"
                alt={`دوکانی ${STORE.nameKu}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1410]/60 to-transparent"></div>
            </div>
            <div className="absolute -bottom-6 -left-6 md:-left-8 gold-gradient rounded-2xl p-6 shadow-2xl max-w-[220px]">
              <div className="text-4xl font-bold font-display text-white mb-1">{STORE.yearsExperience}</div>
              <div className="text-white/90 text-sm">ساڵ لە خزمەت کردن بە ئێوە</div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 gold-gradient"></div>
              <span className="text-[#c9a961] tracking-[0.3em] text-xs uppercase font-medium">
                About Us
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">
              دەربارەی <span className="gold-text">{STORE.nameKu}</span>
            </h2>
            <p className="text-white/70 leading-relaxed mb-5 text-lg">
              دوکانی {STORE.nameKu} زیاتر لە ٢٠ ساڵە لە بواری زێر و جوانکاری لە کوردستان کار دەکات.
              ئێمە بە کوالێتی بەرزترین زێر و زیو و ئەڵماس پێشکەش دەکەین.
            </p>
            <p className="text-white/70 leading-relaxed mb-8">
              هەموو بەرهەمەکانمان بە دەست و بە وردی دروست دەکرێن، بەکارهێنانی باشترین
              مادەکان و کاری هونەرمەندانی ئێمە. ئامانجمان ئەوەیە جوانترین و
              نایابترین زێرەکان بە دەست بهێنن بۆ یادەوەرییە نەمرەکانتان.
            </p>

            <div className="flex flex-wrap gap-6 pt-6 border-t border-[#c9a961]/20">
              <div>
                <div className="text-3xl font-bold gold-text font-display">+٥٠٠</div>
                <div className="text-white/60 text-sm">کڕیاری دڵخۆش</div>
              </div>
              <div>
                <div className="text-3xl font-bold gold-text font-display">+١٠٠٠</div>
                <div className="text-white/60 text-sm">بەرهەمی ناوازە</div>
              </div>
              <div>
                <div className="text-3xl font-bold gold-text font-display">١٠٠٪</div>
                <div className="text-white/60 text-sm">ڕەسەنایەتی</div>
              </div>
            </div>
          </div>
        </div>

        <div className="divider-gold mb-16"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="text-center p-6 rounded-2xl border border-[#c9a961]/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-[#c9a961]/30 transition-all group"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-full gold-gradient flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h3 className="font-bold text-lg mb-2 text-white">{f.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

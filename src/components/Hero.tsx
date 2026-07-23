import { STORE, whatsappUrl } from "@/lib/store";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden noise-bg"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero-jewelry.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/60 to-black/80" />
      <div className="absolute inset-0 hero-pattern" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <div className="fade-in-up">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-16 gold-gradient"></div>
            <div className="text-[#c9a961] text-sm tracking-[0.3em] font-light uppercase">
              {STORE.nameEn}
            </div>
            <div className="h-px w-16 gold-gradient"></div>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-6 leading-tight">
            <span className="block">زێر و جوانی</span>
            <span className="block gold-text mt-2">لە ئاستی شاهانە</span>
          </h1>

          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            جوانترین زێری دەستکرد، ئەڵماس و مرواری، بە کوالێتی بەرز و کاری دەستی ناوازە.
            <br />
            <span className="text-[#e5c989]">لە {STORE.nameKu} بۆ جوانترین ساتەکانت.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#products"
              className="gold-btn px-10 py-4 rounded-full text-base font-semibold shadow-2xl flex items-center gap-2"
            >
              <span>بینینی بەرهەمەکان</span>
              <svg className="w-5 h-5 -scale-x-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-400 text-white px-10 py-4 rounded-full text-base font-semibold shadow-2xl flex items-center gap-2 transition-all hover:shadow-green-500/40"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.693.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              </svg>
              پەیوەندی بە واتسئاپ
            </a>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-3 gap-6 max-w-2xl mx-auto">
            {[
              { num: "٢٠+", label: "ساڵ ئەزموون" },
              { num: "+٥٠٠", label: "بەرهەمی ناوازە" },
              { num: "١٠٠٪", label: "دڵنیایی کوالێتی" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold gold-text font-display">
                  {stat.num}
                </div>
                <div className="text-white/60 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 float">
        <div className="w-6 h-10 border-2 border-[#c9a961]/50 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 gold-gradient rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}

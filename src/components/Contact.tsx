"use client";

import { useState } from "react";
import { STORE, whatsappUrl } from "@/lib/store";

export default function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Send via WhatsApp
    const text = `سڵاو ${STORE.nameKu}%0A%0Aناو: ${form.name}%0Aمۆبایل: ${form.phone}%0A%0A${form.message}`;
    const url = `https://wa.me/${STORE.phoneIntl}?text=${text}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setSubmitted(true);
    setTimeout(() => {
      setForm({ name: "", phone: "", message: "" });
      setSubmitted(false);
    }, 4000);
  };

  return (
    <section id="contact" className="py-24 bg-[#faf7f2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12 gold-gradient"></div>
            <span className="text-[#a8893e] tracking-[0.3em] text-xs uppercase font-medium">
              Contact Us
            </span>
            <div className="h-px w-12 gold-gradient"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-[#1a1410] mb-4">
            پەیوەندی <span className="gold-text">بکە</span>
          </h2>
          <p className="text-[#2a2119]/60 max-w-xl mx-auto">
            بۆ پرسیارکردن یان داواکارییەکانت پەیوەندی بە ئێمەوە بکە
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="bg-[#1a1410] text-white rounded-3xl p-8 md:p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#c9a961]/10 rounded-full blur-3xl"></div>
            <div className="relative">
              <h3 className="text-2xl font-display font-bold mb-8 gold-text">
                زانیاری پەیوەندی
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full gold-gradient flex items-center justify-center text-white shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-white/60 mb-1">ناونیشان</div>
                    <div className="font-medium">
                      {STORE.address}
                      <br />
                      {STORE.addressDetail}
                    </div>
                  </div>
                </div>

                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white shrink-0 group-hover:bg-green-400 transition-colors">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.693.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-white/60 mb-1">ژمارەی مۆبایل / واتسئاپ</div>
                    <div className="font-medium text-white group-hover:text-green-400 transition-colors" dir="ltr">
                      {STORE.phone}
                    </div>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full gold-gradient flex items-center justify-center text-white shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-white/60 mb-1">ئیمەیڵ</div>
                    <div className="font-medium" dir="ltr">
                      {STORE.email}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full gold-gradient flex items-center justify-center text-white shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-white/60 mb-1">کاتی کرانەوە</div>
                    <div className="font-medium">
                      {STORE.hours}
                      {STORE.hoursShort && (
                        <>
                          <br />
                          {STORE.hoursShort}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating WhatsApp CTA */}
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 flex items-center justify-center gap-3 w-full bg-green-500 hover:bg-green-400 text-white py-4 rounded-2xl font-bold shadow-xl transition-all"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.693.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                </svg>
                پەیوەندی ڕاستەوخۆ بە واتسئاپ
              </a>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 md:p-10 shadow-lg border border-[#c9a961]/10">
            <h3 className="text-2xl font-display font-bold text-[#1a1410] mb-2">
              نامە بنێرە
            </h3>
            <p className="text-[#2a2119]/60 text-sm mb-8">
              نامەکەت بە ڕێگەی واتسئاپ دەنێردرێت
            </p>

            {submitted ? (
              <div className="bg-green-50 border border-green-200 text-green-800 rounded-2xl p-8 text-center">
                <div className="text-5xl mb-4">✅</div>
                <div className="font-bold text-lg mb-2">سوپاس!</div>
                <p className="text-sm">لە واتسئاپ بەردەوام بە لە گفتوگۆی ڕاستەوخۆ.</p>
              </div>
            ) : (
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-[#2a2119] mb-2">ناو</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#c9a961]/30 bg-[#faf7f2] focus:outline-none focus:border-[#c9a961] focus:bg-white transition-colors text-[#1a1410]"
                    placeholder="ناوی تەواو"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2a2119] mb-2">ژمارەی مۆبایل</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#c9a961]/30 bg-[#faf7f2] focus:outline-none focus:border-[#c9a961] focus:bg-white transition-colors text-[#1a1410]"
                    placeholder="0750 xxxx xxx"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2a2119] mb-2">نامەکەت</label>
                  <textarea
                    rows={4}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#c9a961]/30 bg-[#faf7f2] focus:outline-none focus:border-[#c9a961] focus:bg-white transition-colors text-[#1a1410] resize-none"
                    placeholder="لەبارەی چی دەتەوێت؟"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white py-4 rounded-xl font-semibold text-base shadow-lg transition-all"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.693.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  </svg>
                  ناردن بە واتسئاپ
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState, useEffect } from "react";
import { whatsappUrl } from "@/lib/store";

export default function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {open && (
        <div className="mb-3 bg-white rounded-2xl shadow-2xl p-4 max-w-xs border border-green-200 animate-[fadeInUp_0.3s_ease-out]">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-sm">
              AG
            </div>
            <div>
              <div className="font-bold text-sm text-[#1a1410]">عارفان گۆڵد</div>
              <div className="text-[10px] text-green-600 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500 inline-block animate-pulse"></span>
                ئامادەین
              </div>
            </div>
          </div>
          <p className="text-sm text-[#2a2119]/70 mb-3 leading-relaxed">
            سڵاو! پرسیارێکت هەیە؟ بە واتسئاپ پەیوەندی بکە ✨
          </p>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center bg-green-500 hover:bg-green-400 text-white py-2 rounded-xl text-sm font-semibold transition-colors"
          >
            دەستپێکردنی گفتوگۆ
          </a>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        aria-label="WhatsApp"
        className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 text-white shadow-2xl hover:shadow-green-500/50 flex items-center justify-center transition-all hover:scale-110 relative"
      >
        {!open && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
        )}
        {open ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.693.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          </svg>
        )}
      </button>
    </div>
  );
}

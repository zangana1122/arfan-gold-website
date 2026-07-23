// Currency conversion — update this number whenever the USD/IQD exchange rate changes
export const USD_TO_IQD = 1500;

export function formatIQD(usdAmount: number): string {
  return Math.round(usdAmount * USD_TO_IQD).toLocaleString("en-US");
}

// Store configuration
export const STORE = {
  nameKu: "عرفان گۆڵد",
  nameEn: "ARFAN GOLD",
  tagline: "ARFAN GOLD",
  phone: "07504510505",
  phoneIntl: "9647504510505", // For wa.me (no +, no leading 0, country code 964 for Iraq/Kurdistan)
  whatsappMessage: "سڵاو، لە وێبسایتەکەتەوە پەیوەندیت پێوە دەکەم.",
  email: "info@arfangold.krd",
  address: "هەولێر",
  addressDetail: "بازاڕی قەیسەری، ناوچەی زێرینگەران",
  hours: "هەموو ڕۆژێک (هەینیش): ٩:٠٠ بەیانی - ٧:٠٠ ئێوارە",
  hoursShort: "",
  yearsExperience: "+٥٠",
};

export function whatsappUrl(customMessage?: string) {
  const msg = encodeURIComponent(customMessage ?? STORE.whatsappMessage);
  return `https://wa.me/${STORE.phoneIntl}?text=${msg}`;
}

export function productWhatsappUrl(productName?: string) {
  const msg = productName
    ? `سڵاو، دەمەوێت زانیاری زیاتر لەسەر "${productName}" بزانم.`
    : STORE.whatsappMessage;
  return whatsappUrl(msg);
}

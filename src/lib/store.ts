// Store configuration
export const STORE = {
  nameKu: "عارفان گۆڵد",
  nameEn: "ARFAN GOLD",
  tagline: "ARFAN GOLD",
  phone: "07504510505",
  phoneIntl: "9647504510505", // For wa.me (no +, no leading 0, country code 964 for Iraq/Kurdistan)
  whatsappMessage: "سڵاو، لە وێبسایتەکەتەوە پەیوەندیت پێوە دەکەم.",
  email: "info@arfangold.krd",
  address: "کوردستان، هەولێر",
  addressDetail: "شەقامی ٦٠ مەتری، بازاڕی زێران",
  hours: "شەممە - پێنجشەممە: ٩:٠٠ - ٢١:٠٠",
  hoursShort: "هەینی: ١٤:٠٠ - ٢١:٠٠",
  yearsExperience: "+٢٠",
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

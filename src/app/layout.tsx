import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "زێرمە | دوکانی زێر و جوانکاری",
  description: "دوکانی زێرمە - جوانترین زێر و زیو و ئەڵماس لە کوردستان",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ku" dir="rtl">
      <body className="antialiased">{children}</body>
    </html>
  );
}

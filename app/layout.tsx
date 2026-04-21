import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Dropraise — 室內設計 × 製造浪漫",
  description: "Wang Yao-rong（Arong）的室內設計工作室與家具品牌「製造浪漫」官方網站。幫你解決生活問題的設計顧問。",
  keywords: "室內設計, 製造浪漫, Made by Romance, 台北室內設計, 家具設計, Arong",
  openGraph: {
    title: "Dropraise — 室內設計 × 製造浪漫",
    description: "幫你解決生活問題的設計顧問",
    url: "https://dropraise.co",
    siteName: "Dropraise",
    locale: "zh_TW",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[#FAFAF8] text-[#1A1A1A]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

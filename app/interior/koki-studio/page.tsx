import Image from "next/image";
import Link from "next/link";

const blue = "text-[#0000ff]";
const blueMuted = "text-[#0000ff]/60";
const blueHover = "hover:text-[#0000ff]";

const portraitPhotos = new Set(["8.jpg", "9.jpg", "10.jpg", "14.jpg"]);

const photos = [
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg",
  "7.jpg",
  "8.jpg",
  "9.jpg",
  "10.jpg",
  "11.JPG",
  "12.JPG",
  "13.jpg",
  "14.jpg",
  "15.jpg",
  "16.jpg",
  "17.jpg",
  "18.jpg",
];

export default function KokiStudioPage() {
  return (
    <div className="pt-20">

      {/* Header */}
      <section className="px-6 md:px-10 pt-20 pb-16">
        <Link href="/interior" className={`label ${blueMuted} ${blueHover} transition-colors mb-8 inline-block`}>
          ← Interior
        </Link>
        <div className="mt-4">
          <p className={`label ${blueMuted}`}>商業空間 · 美容護理</p>
        </div>
      </section>

      {/* Cover */}
      <section className="px-6 md:px-10">
        <Image
          src="/works/koki-studio/1.jpg"
          alt="KOKI STUDIO 封面"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto"
          priority
        />
      </section>

      {/* Info bar */}
      <section className="border-b border-[#0000ff]/20">
        <div className="px-6 md:px-10 xl:px-16 2xl:px-24 py-10">
          <div className="grid grid-cols-4 gap-8">
            <div>
              <p className={`label ${blueMuted} mb-2`}>Project</p>
              <p className={`heading-lg ${blue}`}>KOKI STUDIO</p>
            </div>
            <div>
              <p className={`label ${blueMuted} mb-2`}>Location</p>
              <p className={`text-[14px] ${blue}`}>台北市大安區</p>
            </div>
            <div>
              <p className={`label ${blueMuted} mb-2`}>Type</p>
              <p className={`text-[14px] ${blue}`}>商業空間</p>
            </div>
            <div>
              <p className={`label ${blueMuted} mb-2`}>Size</p>
              <p className={`text-[14px] ${blue}`}>27 ping</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 設計圖 1 & 2 並排 ── */}
      <section className="px-6 md:px-10 pt-10 pb-4">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-6 h-px bg-[#0000ff]/60" />
          <p className={`label ${blueMuted}`}>設計提案</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["1", "2"].map((n) => (
            <div key={n} className="relative overflow-hidden">
              <Image
                src={`/works/koki-studio/slides/${n}.png`}
                alt={`設計提案 ${n}`}
                width={1200}
                height={849}
                className="w-full h-auto"
              />
              <div className="px-4 py-2 border-t border-[#0000ff]/20">
                <p className={`text-[14px] ${blueMuted}`}>P.{n} — 等角透視圖</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 設計圖 3 全寬 + 專案說明 ── */}
      <section className="px-6 md:px-10 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8 items-end">

          {/* 左：設計圖 3 */}
          <div className="overflow-hidden bg-[#f8f6f5]">
            <Image
              src="/works/koki-studio/slides/3.png"
              alt="設計圖 3"
              width={1920}
              height={769}
              className="w-full h-auto"
            />
            <div className="px-4 py-2 border-t border-[#0000ff]/20">
              <p className={`text-[14px] ${blueMuted}`}>P.3 — 平面圖</p>
            </div>
          </div>

          {/* 右：專案說明 */}
          <div className="lg:sticky lg:top-24 flex flex-col gap-8">
            <div>
              <p className={`label ${blueMuted} mb-4`}>設計說明</p>
              <p className={`text-[14px] leading-relaxed ${blue}`}>
                KOKI STUDIO 是一家專注於粉刺淨痘護理的品牌，深耕台北市六年。本案位於忠孝敦化的狹長型空間，規劃把採光最好的位置留給接待區，以柔和的自然光及低重心照明，搭配弧線及大地色系的牆面，希望能提供顧客高質感的放鬆體驗。
              </p>
            </div>

            <div className="border-t border-[#0000ff]/20 pt-8 grid grid-cols-2 gap-y-6">
              <div>
                <p className={`label ${blueMuted} mb-1`}>地點</p>
                <p className={`text-[14px] ${blue}`}>台北市大安區</p>
              </div>
              <div>
                <p className={`label ${blueMuted} mb-1`}>坪數</p>
                <p className={`text-[14px] ${blue}`}>27 坪</p>
              </div>
              <div>
                <p className={`label ${blueMuted} mb-1`}>類型</p>
                <p className={`text-[14px] ${blue}`}>商業空間</p>
              </div>
              <div>
                <p className={`label ${blueMuted} mb-1`}>屋況</p>
                <p className={`text-[14px] ${blue}`}>商業裝修</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── 完工照 ── */}
      <section className="px-10 pb-20">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-6 h-px bg-[#0000ff]/60" />
          <p className={`label ${blueMuted}`}>完工實景</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {photos.map((photo, i) => (
            <div key={photo} className="overflow-hidden">
              <Image
                src={`/works/koki-studio/${photo}`}
                alt={`KOKI STUDIO 完工照 ${i + 1}`}
                width={0}
                height={0}
                sizes="(max-width: 768px) 100vw, 50vw"
                className={`w-full h-auto max-h-screen object-contain object-center hover:scale-[1.02] transition-transform duration-500`}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Navigation */}
      <section className="border-t border-[#0000ff]/20">
        <div className="px-6 md:px-10 xl:px-16 2xl:px-24 py-12">
          <div className="flex justify-between items-center">
            <Link href="/interior" className={`text-[1.375rem] tracking-[0.06em] uppercase ${blueMuted} ${blueHover} transition-colors`}>
              ← 所有作品
            </Link>
            <Link href="/contact" className="text-[1.375rem] tracking-[0.06em] uppercase px-8 py-5 bg-[#0000ff]/60 text-white hover:bg-[#0000ff] transition-colors duration-300">
              預約諮詢
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

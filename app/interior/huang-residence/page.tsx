import Image from "next/image";
import Link from "next/link";

const blue = "text-[#0000ff]";
const blueMuted = "text-[#0000ff]/60";
const blueHover = "hover:text-[#0000ff]";

const photos = [
  "1.jpg",
  "2.JPG",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg",
  "7.jpg",
  "8.jpg",
  "9.jpg",
  "10.jpg",
  "11.jpg",
  "12.JPG",
  "13.JPG",
];

export default function HuangResidencePage() {
  return (
    <div className="pt-20">

      {/* Header */}
      <section className="px-6 md:px-10 pt-20 pb-16">
        <Link href="/interior" className={`label ${blueMuted} ${blueHover} transition-colors mb-8 inline-block`}>
          ← Interior
        </Link>
        <div className="mt-4">
          <p className={`label ${blueMuted}`}>住宅 · 新成屋</p>
        </div>
      </section>

      {/* Cover */}
      <section className="px-6 md:px-10">
        <div className="relative w-full aspect-[16/9] overflow-hidden">
          <Image
            src="/works/huang-residence/1.jpg"
            alt="花園新城黃宅 封面"
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* Info bar */}
      <section className="border-b border-[#0000ff]/20">
        <div className="px-6 md:px-10 xl:px-16 2xl:px-24 py-10">
          <div className="grid grid-cols-4 gap-8">
            <div>
              <p className={`label ${blueMuted} mb-2`}>Project</p>
              <p className={`heading-lg ${blue}`}>花園新城黃宅</p>
            </div>
            <div>
              <p className={`label ${blueMuted} mb-2`}>Location</p>
              <p className={`text-[14px] ${blue}`}>新北市新店區</p>
            </div>
            <div>
              <p className={`label ${blueMuted} mb-2`}>Type</p>
              <p className={`text-[14px] ${blue}`}>住宅設計</p>
            </div>
            <div>
              <p className={`label ${blueMuted} mb-2`}>Size</p>
              <p className={`text-[14px] ${blue}`}>43 ping</p>
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
                src={`/works/huang-residence/slides/${n}.png`}
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

      {/* ── 平面圖 + 專案說明 左右並排 ── */}
      <section className="px-6 md:px-10 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8 items-end">

          {/* 左：平面圖 */}
          <div className="relative overflow-hidden bg-[#f8f6f5]">
            <Image
              src="/works/huang-residence/slides/3v2.png"
              alt="平面圖"
              width={2400}
              height={1697}
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
                位於新店山區的黃宅擁有大面積開窗及無限的山景，本案透過低矮的硬裝及軟裝規劃使視線最大化擁抱無限的綠色視野，顏色與材質選擇低飽和度的自然材質，以不干涉自然為最大目的。
              </p>
            </div>

            <div className="border-t border-[#0000ff]/20 pt-8 grid grid-cols-2 gap-y-6">
              <div>
                <p className={`label ${blueMuted} mb-1`}>地點</p>
                <p className={`text-[14px] ${blue}`}>新北市新店區</p>
              </div>
              <div>
                <p className={`label ${blueMuted} mb-1`}>坪數</p>
                <p className={`text-[14px] ${blue}`}>43 坪</p>
              </div>
              <div>
                <p className={`label ${blueMuted} mb-1`}>類型</p>
                <p className={`text-[14px] ${blue}`}>住宅設計</p>
              </div>
              <div>
                <p className={`label ${blueMuted} mb-1`}>屋況</p>
                <p className={`text-[14px] ${blue}`}>新成屋</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── 完工照 ── */}
      <section className="px-6 md:px-10 pb-20">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-6 h-px bg-[#0000ff]/60" />
          <p className={`label ${blueMuted}`}>完工實景</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {photos.map((photo, i) => (
            <div key={photo} className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={`/works/huang-residence/${photo}`}
                alt={`花園新城黃宅 完工照 ${i + 1}`}
                fill
                className="object-cover hover:scale-[1.02] transition-transform duration-500"
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

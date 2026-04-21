import Image from "next/image";
import Link from "next/link";

const blue = "text-[#0000ff]";
const blueMuted = "text-[#0000ff]/60";
const blueHover = "hover:text-[#0000ff]";

const photos = [
  "2.JPG",
  "3.JPG",
  "4.JPG",
  "5.JPG",
  "6.JPG",
  "7.JPG",
  "8.JPG",
  "9.JPG",
  "10.JPG",
  "11.JPG",
  "12.JPG",
  "13.JPG",
  "14.JPG",
  "16-17.gif",
  "18-20.gif",
  "21.png",
];

export default function LinResidencePage() {
  return (
    <div className="pt-20">

      {/* Header */}
      <section className="px-6 md:px-10 pt-20 pb-16">
        <Link href="/interior" className={`label ${blueMuted} ${blueHover} transition-colors mb-8 inline-block`}>
          ← Interior
        </Link>
        <div className="mt-4">
          <p className={`label ${blueMuted}`}>住宅 · 老屋翻修</p>
        </div>
      </section>

      {/* Cover */}
      <section className="px-6 md:px-10">
        <Image
          src="/works/lin-residence/封面照.JPG"
          alt="林宅室內裝修案 封面"
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
              <p className={`heading-lg ${blue}`}>林宅室內裝修案</p>
            </div>
            <div>
              <p className={`label ${blueMuted} mb-2`}>Location</p>
              <p className={`text-[14px] ${blue}`}>新北市三重區</p>
            </div>
            <div>
              <p className={`label ${blueMuted} mb-2`}>Type</p>
              <p className={`text-[14px] ${blue}`}>住宅設計</p>
            </div>
            <div>
              <p className={`label ${blueMuted} mb-2`}>Size</p>
              <p className={`text-[14px] ${blue}`}>12 ping</p>
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
                src={`/works/lin-residence/slides/${n}.png`}
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

      {/* ── 照片 + 專案說明 左右並排 ── */}
      <section className="px-6 md:px-10 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8 items-end">

          {/* 左：照片 */}
          <div className="overflow-hidden">
            <Image
              src="/works/lin-residence/1.JPG"
              alt="林宅室內裝修案"
              width={0}
              height={0}
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="w-full h-auto max-h-screen object-contain object-left translate-x-10"
            />
          </div>

          {/* 右：專案說明 */}
          <div className="lg:sticky lg:top-24 flex flex-col gap-8 -translate-x-10">
            <div>
              <p className={`label ${blueMuted} mb-4`}>設計說明</p>
              <p className={`text-[14px] leading-relaxed ${blue}`}>
                本案基地為狹長型的 12 坪空間，業主預計規劃兩房及一更衣室空間，在有限的坪數中將所有走道與置物空間放置一起規劃，並以一 60×140 的桌面串聯起廚房及客廳空間的整體軸線，是本案因應 12 坪兩房空間維持動線順暢、收納合理的解決辦法。
              </p>
            </div>

            <div className="border-t border-[#0000ff]/20 pt-8 grid grid-cols-2 gap-y-6">
              <div>
                <p className={`label ${blueMuted} mb-1`}>地點</p>
                <p className={`text-[14px] ${blue}`}>新北市三重區</p>
              </div>
              <div>
                <p className={`label ${blueMuted} mb-1`}>坪數</p>
                <p className={`text-[14px] ${blue}`}>12 坪</p>
              </div>
              <div>
                <p className={`label ${blueMuted} mb-1`}>類型</p>
                <p className={`text-[14px] ${blue}`}>住宅設計</p>
              </div>
              <div>
                <p className={`label ${blueMuted} mb-1`}>屋況</p>
                <p className={`text-[14px] ${blue}`}>老屋翻修</p>
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
                src={`/works/lin-residence/${photo}`}
                alt={`林宅室內裝修案 完工照 ${i + 1}`}
                width={0}
                height={0}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="w-full h-auto max-h-screen object-contain object-center hover:scale-[1.02] transition-transform duration-500"
                unoptimized={photo.endsWith(".gif")}
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

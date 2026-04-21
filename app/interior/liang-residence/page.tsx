import Image from "next/image";
import Link from "next/link";

const blue = "text-[#0000ff]";
const blueMuted = "text-[#0000ff]/60";
const blueHover = "hover:text-[#0000ff]";

const portraitPhotos = new Set(["7.PNG", "8.PNG"]);

const photos = [
  "1.PNG",
  "2.PNG",
  "3.PNG",
  "4.PNG",
  "5.PNG",
  "6.PNG",
  "7.PNG",
  "8.PNG",
];

export default function LiangResidencePage() {
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
        <Image
          src="/works/liang-resedence/3.PNG"
          alt="梁宅室內裝修案 封面"
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
              <p className={`heading-lg ${blue}`}>梁宅室內裝修案</p>
            </div>
            <div>
              <p className={`label ${blueMuted} mb-2`}>Location</p>
              <p className={`text-[14px] ${blue}`}>台北市內湖區</p>
            </div>
            <div>
              <p className={`label ${blueMuted} mb-2`}>Type</p>
              <p className={`text-[14px] ${blue}`}>住宅設計</p>
            </div>
            <div>
              <p className={`label ${blueMuted} mb-2`}>Size</p>
              <p className={`text-[14px] ${blue}`}>45 ping</p>
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
          {[
            "Gemini_Generated_Image_xyoqqtxyoqqtxyoq.png",
            "Gemini_Generated_Image_w9j71bw9j71bw9j7.png",
          ].map((file, i) => (
            <div key={file} className="relative overflow-hidden">
              <Image
                src={`/works/liang-resedence/slides/${file}`}
                alt={`設計提案 ${i + 1}`}
                width={1200}
                height={849}
                className="w-full h-auto"
              />
              <div className="px-4 py-2 border-t border-[#0000ff]/20">
                <p className={`text-[14px] ${blueMuted}`}>P.{i + 1} — 設計渲染圖</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 平面圖 + 專案說明 ── */}
      <section className="px-6 md:px-10 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8 items-end">

          {/* 左：平面圖 */}
          <div className="overflow-hidden bg-[#f8f6f5]">
            <Image
              src="/works/liang-resedence/slides/3.png"
              alt="平面圖"
              width={1920}
              height={1502}
              className="w-full h-auto"
            />
            <div className="px-4 py-2 border-t border-[#0000ff]/20">
              <p className={`text-[14px] ${blueMuted}`}>平面圖</p>
            </div>
          </div>

          {/* 右：專案說明 */}
          <div className="lg:sticky lg:top-24 flex flex-col gap-8">
            <div>
              <p className={`label ${blueMuted} mb-4`}>設計說明</p>
              <p className={`text-[14px] leading-relaxed ${blue}`}>
                本案在維持原始格局的優勢下，將設計核心聚焦於材質語彙、光影層次與收納系統的深度解構。透過規劃開放式與封閉式櫃體，虛實交錯的幾何比例，為空間建立起一種安定且井然有序的律動感。
              </p>
              <p className={`text-[14px] leading-relaxed ${blue} mt-4`}>
                針對現代生活需求，將智慧家居系統無縫整合於櫃體之中，使科技設備隱於無形，維持立面的簡潔純粹。空間界定上，捨棄沉重隔閡，僅以一座 L 型矮牆作為領域轉換的介質，將客廳劃分為「高效工作區」與「靜謐休憩區」。
              </p>
            </div>

            <div className="border-t border-[#0000ff]/20 pt-8 grid grid-cols-2 gap-y-6">
              <div>
                <p className={`label ${blueMuted} mb-1`}>地點</p>
                <p className={`text-[14px] ${blue}`}>台北市內湖區</p>
              </div>
              <div>
                <p className={`label ${blueMuted} mb-1`}>坪數</p>
                <p className={`text-[14px] ${blue}`}>45 坪</p>
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
      <section className="px-10 pb-20">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-6 h-px bg-[#0000ff]/60" />
          <p className={`label ${blueMuted}`}>完工實景</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {photos.map((photo, i) => (
            <div key={photo} className="overflow-hidden">
              <Image
                src={`/works/liang-resedence/${photo}`}
                alt={`梁宅室內裝修案 完工照 ${i + 1}`}
                width={0}
                height={0}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="w-full h-auto max-h-screen object-contain object-center hover:scale-[1.02] transition-transform duration-500"
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

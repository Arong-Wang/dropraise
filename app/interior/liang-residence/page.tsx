import Image from "next/image";
import Link from "next/link";
import { getProject } from "@/lib/data";

const blue = "text-[#0000ff]";
const blueMuted = "text-[#0000ff]/60";
const blueHover = "hover:text-[#0000ff]";

export default function LiangResidencePage() {
  const p = getProject("liang-residence");

  return (
    <div className="pt-20">

      <section className="blog-px pt-20 pb-16">
        <Link href="/interior" className={`label ${blueMuted} ${blueHover} transition-colors mb-8 inline-block`}>
          ← Interior
        </Link>
        <div className="mt-4">
          <p className={`label ${blueMuted}`}>{p.subtitle}</p>
        </div>
      </section>

      <section>
        <Image src={p.cover} alt={`${p.title} 封面`} width={0} height={0} sizes="100vw" className="w-full h-auto" priority />
      </section>

      <section className="border-b border-[#0000ff]/20">
        <div className="blog-px py-10">
          <div className="grid grid-cols-4 gap-8">
            <div>
              <p className={`label ${blueMuted} mb-2`}>Project</p>
              <p className={`text-[14px] md:text-[clamp(1.5rem,2.2vw,2.2rem)] md:font-light ${blue}`}>{p.title}</p>
            </div>
            <div>
              <p className={`label ${blueMuted} mb-2`}>Location</p>
              <p className={`text-[14px] ${blue}`}>{p.location}</p>
            </div>
            <div>
              <p className={`label ${blueMuted} mb-2`}>Type</p>
              <p className={`text-[14px] ${blue}`}>{p.type}</p>
            </div>
            <div>
              <p className={`label ${blueMuted} mb-2`}>Size</p>
              <p className={`text-[14px] ${blue}`}>{p.size}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="blog-px pt-10 pb-4">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-6 h-px bg-[#0000ff]/60" />
          <p className={`label ${blueMuted}`}>設計提案</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {p.designSlides.map((slide, i) => (
            <div key={slide.src} className="flex flex-col">
              <div className="flex-1 flex items-center">
                <Image src={slide.src} alt={`設計提案 ${i + 1}`} width={1200} height={849} className="w-full h-auto" />
              </div>
              <div className="px-4 py-2 border-t border-[#0000ff]/20 mt-auto">
                <p className={`text-[14px] ${blueMuted}`}>{slide.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="blog-px pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8 items-end">
          <div className="overflow-hidden bg-[#f8f6f5]">
            <Image src={p.floorPlan.src} alt="平面圖" width={1920} height={1502} className="w-full h-auto" />
            {p.floorPlan.caption && (
              <div className="px-4 py-2 border-t border-[#0000ff]/20">
                <p className={`text-[14px] ${blueMuted}`}>{p.floorPlan.caption}</p>
              </div>
            )}
          </div>

          <div className="lg:sticky lg:top-24 flex flex-col gap-8">
            <div>
              <p className={`label ${blueMuted} mb-4`}>設計說明</p>
              {p.description.map((para, i) => (
                <p key={i} className={`text-[14px] leading-relaxed ${blue} ${i > 0 ? "mt-4" : ""}`}>{para}</p>
              ))}
            </div>
            <div className="border-t border-[#0000ff]/20 pt-8 grid grid-cols-2 gap-y-6">
              <div><p className={`label ${blueMuted} mb-1`}>地點</p><p className={`text-[14px] ${blue}`}>{p.location}</p></div>
              <div><p className={`label ${blueMuted} mb-1`}>坪數</p><p className={`text-[14px] ${blue}`}>{p.size}</p></div>
              <div><p className={`label ${blueMuted} mb-1`}>類型</p><p className={`text-[14px] ${blue}`}>{p.type}</p></div>
              <div><p className={`label ${blueMuted} mb-1`}>屋況</p><p className={`text-[14px] ${blue}`}>{p.condition}</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="blog-px pb-20">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-6 h-px bg-[#0000ff]/60" />
          <p className={`label ${blueMuted}`}>完工實景</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {p.photos.map((photo, i) => (
            <div key={photo} className="overflow-hidden">
              <Image
                src={photo}
                alt={`${p.title} 完工照 ${i + 1}`}
                width={0}
                height={0}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="w-full h-auto max-h-screen object-contain object-center hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-[#0000ff]/20">
        <div className="blog-px py-12">
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

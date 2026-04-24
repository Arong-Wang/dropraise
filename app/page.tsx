import Link from "next/link";
import Image from "next/image";
import HeroCarousel from "@/components/HeroCarousel";
import { getHeroSlides, getWorks } from "@/lib/data";

export default function Home() {
  const slides = getHeroSlides();
  const works = getWorks();
  const firstSlide = slides[0];

  return (
    <div>

      {/* ── Hero Carousel ── */}
      <HeroCarousel slides={slides} />

      {/* Caption */}
      {firstSlide && (
        <div className="px-6 md:px-10 xl:px-16 2xl:px-24 mt-3 mb-2 flex justify-between items-center">
          <p className="label text-[#0000ff]/60">{firstSlide.label}</p>
          <Link href={firstSlide.href} className="label text-[#0000ff]/60 hover:text-[#0000ff] transition-colors">
            查看完整作品 →
          </Link>
        </div>
      )}

      {/* ── Latest Work ── */}
      <section className="border-t-2 border-[#E2E2DC]">
        <div className="px-6 md:px-10 xl:px-16 2xl:px-24 py-40">
          <div className="flex items-end justify-between mb-12">
            <h2 className="heading-lg text-[#0000ff]">近期作品</h2>
            <Link href="/interior" className="label text-[#0000ff]/60 hover:text-[#0000ff] transition-colors">
              全部作品 →
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {works.map((w) => (
              <Link key={w.id} href={w.href} className="group block">
                <div
                  className="aspect-[16/10] mb-4 overflow-hidden relative"
                  style={{ backgroundColor: w.bg }}
                >
                  {w.cover ? (
                    <Image
                      src={w.cover}
                      alt={w.title}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="label text-[#0000ff]/60">作品圖片</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/[0.04] transition-colors duration-300" />
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-[#0000ff]/10 pt-6">
                  <div className="pl-4">
                    <p className="label text-[#0000ff]/40 mb-1">Name</p>
                    <p className="text-[18px] font-medium leading-snug text-[#0000ff]">{w.title}</p>
                  </div>
                  <div className="flex gap-6">
                    {w.location && (
                      <div>
                        <p className="label text-[#0000ff]/40 mb-1">Location</p>
                        <p className="text-[12px] text-[#0000ff]/60">{w.location}</p>
                      </div>
                    )}
                    {w.type && (
                      <div>
                        <p className="label text-[#0000ff]/40 mb-1">Type</p>
                        <p className="text-[12px] text-[#0000ff]/60">{w.type}</p>
                      </div>
                    )}
                    {w.size && (
                      <div>
                        <p className="label text-[#0000ff]/40 mb-1">Size</p>
                        <p className="text-[12px] text-[#0000ff]/60">{w.size}</p>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Two Brands ── */}
      <section className="border-t border-[#E2E2DC]">
        <div className="grid md:grid-cols-2">
          <Link
            href="/about"
            className="group px-6 md:px-10 xl:px-16 2xl:px-24 py-20 border-b md:border-b-0 md:border-r border-[#E2E2DC] flex flex-col justify-between min-h-[360px] hover:bg-[#0000ff] transition-colors duration-500"
          >
            <div className="w-1 h-1 rounded-full bg-[#C8372D]" />
            <div>
              <p className="label text-[#0000ff]/60 group-hover:text-white/60 mb-4 transition-colors duration-500">關於我們</p>
              <h3 className="heading-lg text-[#0000ff] group-hover:text-white transition-colors duration-500 mb-4">
                About<br />Dropraise
              </h3>
              <p className="text-[13px] text-[#0000ff]/60 group-hover:text-white/60 leading-relaxed max-w-xs transition-colors duration-500">
                從生活困擾出發的設計顧問——了解我們的設計理念與品牌故事。
              </p>
            </div>
            <span className="label text-[#0000ff]/60 group-hover:text-white transition-colors duration-300">
              了解更多 →
            </span>
          </Link>

          <Link
            href="/mbr"
            className="group px-6 md:px-10 xl:px-16 2xl:px-24 py-20 flex flex-col justify-between min-h-[360px] hover:bg-[#0000ff] transition-colors duration-500"
          >
            <div className="w-1 h-1 rounded-full bg-[#0000ff]" />
            <div>
              <p className="label text-[#0000ff]/60 group-hover:text-white/60 mb-4 transition-colors duration-500">家具品牌</p>
              <h3 className="heading-lg text-[#0000ff] group-hover:text-white transition-colors duration-500 mb-4">
                Made by<br />Romance
              </h3>
              <p className="text-[13px] text-[#0000ff]/60 group-hover:text-white/60 leading-relaxed max-w-xs transition-colors duration-500">
                製造浪漫——用設計語言解決你說不出口的生活問題。
              </p>
            </div>
            <span className="label text-[#0000ff]/60 group-hover:text-white transition-colors duration-300">
              探索 →
            </span>
          </Link>
        </div>
      </section>

    </div>
  );
}

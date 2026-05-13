import Link from "next/link";
import HeroCarousel from "@/components/HeroCarousel";
import WorkCard from "@/components/WorkCard";
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
        <div className="px-6 md:px-10 xl:px-16 2xl:px-24 py-16 md:py-40">
          <div className="flex items-end justify-between mb-12">
            <h2 className="heading-lg text-[#0000ff]">近期作品</h2>
            <Link href="/interior" className="label text-[#0000ff]/60 hover:text-[#0000ff] transition-colors">
              全部作品 →
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {works.map((w) => (
              <WorkCard key={w.id} w={w} />
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
            </div>
            <span className="label text-[#0000ff]/60 group-hover:text-white transition-colors duration-300">
              了解更多 →
            </span>
          </Link>

          <Link
            href="/mbr"
            className="group px-6 md:px-10 xl:px-16 2xl:px-24 py-20 flex flex-col justify-between min-h-[360px] hover:bg-[#cc0000] transition-colors duration-500"
          >
            <div className="w-1 h-1 rounded-full bg-[#0000ff]" />
            <div>
              <p className="label text-[#0000ff]/60 group-hover:text-white/60 mb-4 transition-colors duration-500">家具品牌</p>
              <h3 className="heading-lg text-[#0000ff] group-hover:text-white transition-colors duration-500 mb-4">
                Made by<br />Romance
              </h3>
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

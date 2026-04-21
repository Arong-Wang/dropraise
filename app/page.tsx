import Link from "next/link";
import Image from "next/image";
import HeroCarousel from "@/components/HeroCarousel";

const works = [
  {
    id: 1,
    title: "花園新城黃宅",
    year: "2024",
    href: "/interior/huang-residence",
    cover: "/works/huang-residence/1.jpg",
    bg: "#EDECEA",
    location: "新北市新店區",
    type: "住宅設計",
    size: "43 ping",
  },
  {
    id: 2,
    title: "林宅室內裝修案",
    year: "2025",
    href: "/interior/lin-residence",
    cover: "/works/lin-residence/封面照.JPG",
    bg: "#EDECEA",
    location: "新北市三重區",
    type: "住宅設計",
    size: "12 ping",
  },
  {
    id: 6,
    title: "KOKI STUDIO",
    year: "2025",
    href: "/interior/koki-studio",
    cover: "/works/koki-studio/1.jpg",
    bg: "#EAE8E5",
    location: "台北市大安區",
    type: "商業空間",
    size: "27 ping",
  },
  {
    id: 7,
    title: "梁宅室內裝修案",
    year: "2025",
    href: "/interior/liang-residence",
    cover: "/works/liang-resedence/3.PNG",
    bg: "#EDECEA",
    location: "台北市內湖區",
    type: "住宅設計",
    size: "45 ping",
  },
];

export default function Home() {
  return (
    <div>

      {/* ── Hero Carousel ── */}
      <HeroCarousel />

      {/* Caption */}
      <div className="px-6 md:px-10 mt-3 mb-2 flex justify-between items-center">
        <p className="label text-[#0000ff]/60">花園新城黃宅 — 住宅設計</p>
        <Link href="/interior/huang-residence" className="label text-[#0000ff]/60 hover:text-[#0000ff] transition-colors">
          查看完整作品 →
        </Link>
      </div>

      {/* ── Latest Work ── */}
      <section className="border-t-2 border-[#E2E2DC]">
        <div className="px-6 md:px-10 xl:px-16 2xl:px-24 py-40">
          <div className="flex items-end justify-between mb-12">
            <h2 className="heading-lg text-[#0000ff]">近期作品</h2>
            <Link href="/interior" className="label text-[#0000ff]/60 hover:text-[#0000ff] transition-colors">
              全部作品 →
            </Link>
          </div>

          {/* Work grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {works.map((w) => (
              <Link key={w.id} href={w.href} className="group block">
                {/* Image */}
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
                {/* Meta */}
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
          {/* About */}
          <Link
            href="/about"
            className="group px-6 md:px-10 py-20 border-b md:border-b-0 md:border-r border-[#E2E2DC] flex flex-col justify-between min-h-[360px] hover:bg-[#0000ff] transition-colors duration-500"
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

          {/* MBR */}
          <Link
            href="/mbr"
            className="group px-6 md:px-10 py-20 flex flex-col justify-between min-h-[360px] hover:bg-[#0000ff] transition-colors duration-500"
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

      {/* ── Philosophy strip ── */}
      <section className="border-t border-[#E2E2DC]">
        <div className="px-6 md:px-10 xl:px-16 2xl:px-24 py-20">
          <div className="grid md:grid-cols-3 gap-10 md:gap-16">
            {[
              { accent: "#C8372D", title: "問題導向設計", body: "每個設計決策都從「解決什麼問題」出發，而不是從「看起來好不好看」出發。" },
              { accent: "#0000ff", title: "材質誠實", body: "碳化木皮、金屬、清水感。讓材質本身說話，不過度裝飾。" },
              { accent: "#0000ff", title: "長期思維", body: "設計不是一次性消費，而是陪你生活十年以上的決定。" },
            ].map((item) => (
              <div key={item.title}>
                <div className="w-6 h-px mb-8" style={{ backgroundColor: item.accent }} />
                <h3 className="text-[15px] font-medium mb-3 text-[#0000ff]">{item.title}</h3>
                <p className="text-[13px] text-[#0000ff]/60 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

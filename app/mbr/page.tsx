import Image from "next/image";
import Link from "next/link";

const products = [
  {
    id: 1,
    slug: "LC_01",
    name: "LC_01 — Lunar Vacation",
    categories: ["休閒椅", "鑄鋁", "PVC 氣囊"],
    year: "2025",
    images: [
      "/works/mbr/LC_01/1.JPG",
      "/works/mbr/LC_01/2.JPG",
      "/works/mbr/LC_01/3.JPG",
      "/works/mbr/LC_01/4.JPG",
      "/works/mbr/LC_01/5.JPG",
    ],
    desc: "構築了一個關於未來棲居的科幻寓言。椅子主體採用鑄鋁打造，流線型骨架呈現如外星生物般的有機律動感；座墊與靠背選用透明 PVC 空氣氣囊，消融了家具的體積感，在視覺上營造出低重力漂浮的輕盈錯覺。",
    concept: "在冷酷的未來世界中，運用工業製造的邏輯，重新定義一種專屬於太空時代的浪漫舒適感。",
    accent: "#2B4C8C",
  },
];

export default function MBRPage() {
  return (
    <div className="pt-20">

      {/* Header */}
      <section className="border-b border-[#E2E2DC]">
        <div className="px-6 md:px-10 xl:px-16 2xl:px-24 pt-20 pb-16">
          <p className="label text-[#7A7A74] mb-6">Made by Romance</p>
          <h1 className="heading-lg mb-8 max-w-xl">
            Romance is Made,<br />Not Found
          </h1>
          <p className="text-[15px] text-[#7A7A74] leading-relaxed max-w-md">
            浪漫不是偶然，而是被設計出來的。
          </p>
        </div>
      </section>

      {/* Brand Story */}
      <section className="border-b border-[#E2E2DC]">
        <div className="px-6 md:px-10 xl:px-16 2xl:px-24 py-20">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="w-6 h-px bg-[#C8372D] mb-10" />
              <p className="text-[15px] text-[#7A7A74] leading-loose mb-5">
                在快速生產與大量複製的時代，多數物件只追求功能與成本，而忽略了與人之間的情感連結。
              </p>
              <p className="text-[15px] text-[#7A7A74] leading-loose mb-5">
                製造浪漫選擇回到設計的本質：從歷史、建築與文化中汲取靈感，重新詮釋那些曾經代表「美」與「秩序」的符號，並透過當代材料與製造技術，轉化為屬於今天的物件。
              </p>
              <p className="text-[15px] text-[#7A7A74] leading-loose">
                每一件作品，都是理性與情感的交會點。既精準，也溫柔。
              </p>
            </div>
            <div className="relative aspect-square overflow-hidden">
              <Image
                src="/works/mbr/LC_01/品牌形象照.png"
                alt="製造浪漫品牌形象"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products list */}
      <section className="px-6 md:px-10 py-16">
        
        <h2 className="label text-[#7A7A74] mb-12">產品系列</h2>

        <div className="flex flex-col">
          {products.map((p, i) => (
            <div
              key={p.id}
              className={`group py-10 flex flex-col gap-8 ${
                i < products.length - 1 ? "border-b border-[#E2E2DC]" : ""
              }`}
            >
              {/* Main image + info */}
              <div className="flex flex-col md:flex-row gap-8 md:gap-16 md:items-center">
                <div className="relative w-full md:w-[640px] aspect-square shrink-0 overflow-hidden bg-[#E5E8EE]">
                  <Image
                    src={p.images[0]}
                    alt={p.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 640px"
                  />
                </div>
                <div className="flex flex-col gap-4 flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-[22px] font-light leading-snug tracking-tight">{p.name}</h3>
                    <span className="label text-[#7A7A74] shrink-0 mt-1">{p.year}</span>
                  </div>
                  <div className="flex gap-3 flex-wrap">
                    {p.categories.map((cat) => (
                      <span key={cat} className="label text-[#7A7A74]">{cat}</span>
                    ))}
                  </div>
                  <p className="text-[13px] text-[#7A7A74] leading-relaxed max-w-md">{p.desc}</p>
                  <p
                    className="text-[12px] pl-3 border-l"
                    style={{ borderColor: p.accent, color: p.accent }}
                  >
                    {p.concept}
                  </p>
                </div>
              </div>
              {/* Photo gallery */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {p.images.slice(1).map((src, idx) => (
                  <div key={idx} className="relative aspect-square overflow-hidden bg-[#E5E8EE]">
                    <Image
                      src={src}
                      alt={`${p.name} ${idx + 2}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[#E2E2DC] bg-[#111110] text-white px-6 md:px-10 py-16">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h2 className="text-[22px] font-light mb-2">追蹤製造浪漫的誕生過程</h2>
            <p className="text-[13px] text-[#7A7A74]">從設計草圖到成品，Instagram 全紀錄</p>
          </div>
          <div className="flex gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="label px-6 py-3.5 border border-white/20 hover:border-white transition-colors duration-300"
            >
              Instagram →
            </a>
            <Link
              href="/contact"
              className="label px-6 py-3.5 bg-[#2B4C8C] hover:bg-[#1e3570] transition-colors duration-300"
            >
              詢問訂購
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

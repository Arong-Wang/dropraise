import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    id: "huang-residence",
    title: "花園新城黃宅",
    location: "新北市新店區",
    type: "住宅設計",
    size: "43 ping",
    desc: "位於新店山區的黃宅擁有大面積開窗及無限的山景，本案透過低矮的硬裝及軟裝規劃使視線最大化擁抱無限的綠色視野，\n顏色與材質選擇低飽和度的自然材質，以不干涉自然為最大目的。",
    cover: "/works/huang-residence/1.jpg",
    href: "/interior/huang-residence",
  },
  {
    id: "lin-residence",
    title: "林宅室內裝修案",
    location: "新北市三重區",
    type: "住宅設計",
    size: "12 ping",
    desc: "狹長型 12 坪空間的最大化利用。兩房加更衣室，走道與收納整合規劃，以 60×140 桌面串聯廚房與客廳軸線。",
    cover: "/works/lin-residence/封面照.JPG",
    href: "/interior/lin-residence",
  },
  {
    id: "koki-studio",
    title: "KOKI STUDIO",
    location: "台北市大安區",
    type: "商業空間",
    size: "27 ping",
    desc: "忠孝敦化狹長型空間的品牌體驗設計。採光留給接待區，弧線與大地色系牆面，打造高質感的放鬆護膚環境。",
    cover: "/works/koki-studio/1.jpg",
    href: "/interior/koki-studio",
  },
  {
    id: "liang-residence",
    title: "梁宅室內裝修案",
    location: "台北市內湖區",
    type: "住宅設計",
    size: "45 ping",
    desc: "維持原始格局優勢，設計聚焦於材質語彙、光影層次與收納系統。智慧家居整合於櫃體，L 型矮牆劃分工作區與休憩區。",
    cover: "/works/liang-resedence/3.PNG",
    href: "/interior/liang-residence",
  },
];

export default function InteriorPage() {
  return (
    <div>
      <div className="h-28" />

      {/* Projects list */}
      <section className="px-6 md:px-10 xl:px-16 2xl:px-24 py-16 border-t border-[#E2E2DC]">
        <div className="flex flex-col gap-0">
          {projects.map((p, i) => (
            <Link
              key={p.id}
              href={p.href}
              className={`group py-10 flex flex-col md:flex-row gap-8 md:gap-16 md:items-center ${
                i < projects.length - 1 ? "border-b border-[#E2E2DC]" : ""
              }`}
            >
              {/* Image */}
              <div className="w-full md:w-[480px] aspect-[4/3] shrink-0 overflow-hidden relative bg-[#EDECEA]">
                {p.cover ? (
                  <Image
                    src={p.cover}
                    alt={p.title}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="label text-[#7A7A74]">照片準備中</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex flex-col gap-6 flex-1">
                <h2 className="text-[22px] font-light leading-snug tracking-tight text-[#0000ff]/60 group-hover:text-[#0000ff] transition-colors duration-300">
                  {p.title}
                </h2>
                <div className="flex gap-8">
                  {p.location && (
                    <div>
                      <p className="label text-[#0000ff]/40 mb-1">Location</p>
                      <p className="text-[13px] text-[#0000ff]/60">{p.location}</p>
                    </div>
                  )}
                  {p.type && (
                    <div>
                      <p className="label text-[#0000ff]/40 mb-1">Type</p>
                      <p className="text-[13px] text-[#0000ff]/60">{p.type}</p>
                    </div>
                  )}
                  {p.size && (
                    <div>
                      <p className="label text-[#0000ff]/40 mb-1">Size</p>
                      <p className="text-[13px] text-[#0000ff]/60">{p.size}</p>
                    </div>
                  )}
                </div>
                <p className="text-[15px] text-[#0000ff]/60 leading-relaxed whitespace-pre-line">{p.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[#E2E2DC] px-6 md:px-10 py-16">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h2 className="text-[22px] font-light mb-2">你也有想改造的空間？</h2>
            <p className="text-[13px] text-[#7A7A74]">免費諮詢 30 分鐘，先聊聊你遇到的問題</p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 label px-8 py-4 bg-[#111110] text-white hover:bg-[#C8372D] transition-colors duration-300"
          >
            預約諮詢
          </Link>
        </div>
      </section>
    </div>
  );
}

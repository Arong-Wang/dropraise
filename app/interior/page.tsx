import Image from "next/image";
import Link from "next/link";
import { getWorks, getLayout } from "@/lib/data";

export default function InteriorPage() {
  const projects = getWorks();
  const layout = getLayout();

  return (
    <div>
      <div className="h-28" />

      <section className="blog-px py-16 border-t border-[#E2E2DC]">
        <div className="flex flex-col gap-0">
          {projects.map((p, i) => (
            <Link
              key={p.id}
              href={p.href}
              className={`group flex flex-col md:flex-row gap-8 md:gap-16 md:items-center ${
                i < projects.length - 1 ? "border-b border-[#E2E2DC]" : ""
              }`}
              style={{ paddingTop: layout.interiorCardGap, paddingBottom: layout.interiorCardGap }}
            >
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

              <div className="flex flex-col gap-6 flex-1">
                <h2 className="text-[22px] font-normal leading-snug tracking-tight text-[#0000ff]/60 group-hover:text-[#0000ff] transition-colors duration-300">
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
                {p.desc && (
                  <p className="text-[15px] text-[#0000ff]/60 leading-relaxed whitespace-pre-line">{p.desc}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="blog-px py-24 border-t border-[#E2E2DC]">
        <p className="text-[20px] text-[#0000ff] mb-10 max-w-md leading-relaxed">
          有想改造的空間嗎？歡迎預約免費諮詢，我們先聊聊你的需求。
        </p>
        <div className="flex justify-end">
          <Link
            href="https://www.instagram.com/dropraise.co"
            target="_blank"
            rel="noopener noreferrer"
            className="label px-8 py-4 bg-[#111110] text-white hover:bg-[#C8372D] transition-colors duration-300 inline-block"
            style={{ fontSize: "20px" }}
          >
            預約免費諮詢
          </Link>
        </div>
      </section>
    </div>
  );
}

"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";

const slides = [
  { src: "/works/huang-residence/1.jpg", alt: "花園新城黃宅", href: "/interior/huang-residence", label: "花園新城黃宅 — 住宅設計" },
  { src: "/works/lin-residence/封面照.JPG", alt: "林宅室內裝修案", href: "/interior/lin-residence", label: "林宅室內裝修案 — 住宅設計" },
  { src: "/works/koki-studio/1.jpg", alt: "KOKI STUDIO", href: "/interior/koki-studio", label: "KOKI STUDIO — 商業空間" },
  { src: "/works/liang-resedence/3.PNG", alt: "梁宅室內裝修案", href: "/interior/liang-residence", label: "梁宅室內裝修案 — 住宅設計" },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  const next = useCallback(() => {
    setFading(true);
    setTimeout(() => {
      setCurrent((c) => (c + 1) % slides.length);
      setFading(false);
    }, 600);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 10000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className="mt-20 md:mt-0">
      <section className="relative w-full h-[calc(100dvh-80px)] md:h-auto md:aspect-video overflow-hidden bg-[#111110]">

        {/* Slides */}
        {slides.map((slide, i) => (
          <Link
            key={slide.src}
            href={slide.href}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: i === current ? (fading ? 0 : 1) : 0 }}
            tabIndex={i === current ? 0 : -1}
          >
            <Image
              key={i === current ? `active-${current}` : slide.src}
              src={slide.src}
              alt={slide.alt}
              fill
              className={`object-cover ${i === current ? "hero-zoom" : ""}`}
              priority={i === 0}
            />
          </Link>
        ))}

        {/* Overlay — 桌面版顯示，手機版隱藏 */}
        <div className="absolute inset-0 bg-black/35 pointer-events-none hidden md:block" />

        {/* Bottom content — 桌面版顯示，手機版隱藏 */}
        <div className="absolute inset-x-0 bottom-0 z-10 hidden md:flex flex-col items-center pb-14 gap-4 text-center px-6 pointer-events-none">
          <h1 className="text-[16px] font-light tracking-[0.05em] text-white">
            讓未來的生活，在此具現。
          </h1>
          <p className="text-[16px] text-white/70 leading-relaxed max-w-md tracking-wide">
            ── 室內設計不只是裝修，更是探索生活可能性的過程。
          </p>

          {/* Slide dots */}
          <div className="flex gap-2 mt-2 pointer-events-auto">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="transition-all duration-300"
                aria-label={`第 ${i + 1} 張`}
              >
                <span
                  className="block rounded-full transition-all duration-300"
                  style={{
                    width: i === current ? "20px" : "6px",
                    height: "6px",
                    backgroundColor: i === current ? "white" : "rgba(255,255,255,0.4)",
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 opacity-30 pointer-events-none">
          <div className="w-px h-8 bg-white" />
        </div>
      </section>

      {/* 手機版文字區（輪播圖下方，桌面版隱藏） */}
      <div className="md:hidden flex flex-col items-center gap-4 text-center px-6 py-8 bg-[#F8F7F5] border-b border-[#E2E2DC]">
        <h1 className="text-[16px] font-light tracking-[0.05em] text-[#111110]">
          讓未來的生活，在此具現。
        </h1>
        <p className="text-[16px] text-[#111110]/60 leading-relaxed max-w-md tracking-wide">
          ── 室內設計不只是裝修，更是探索生活可能性的過程。
        </p>
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="transition-all duration-300"
              aria-label={`第 ${i + 1} 張`}
            >
              <span
                className="block rounded-full transition-all duration-300"
                style={{
                  width: i === current ? "20px" : "6px",
                  height: "6px",
                  backgroundColor: i === current ? "#111110" : "rgba(0,0,0,0.25)",
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

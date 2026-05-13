"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import type { HeroSlide } from "@/lib/data";

export default function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  const next = useCallback(() => {
    setFading(true);
    setTimeout(() => {
      setCurrent((c) => (c + 1) % slides.length);
      setFading(false);
    }, 600);
  }, [slides.length]);

  useEffect(() => {
    const timer = setInterval(next, 10000);
    return () => clearInterval(timer);
  }, [next]);

  if (slides.length === 0) return null;

  return (
    <div>
      <section className="relative w-full h-[100dvh] md:h-auto md:aspect-video overflow-hidden bg-[#111110]">

        {slides.map((slide, i) => (
          <Link
            key={slide.src}
            href={slide.href}
            className={`absolute inset-0 transition-opacity duration-700 ${i === current && !fading ? "pointer-events-auto" : "pointer-events-none"}`}
            style={{ opacity: i === current ? (fading ? 0 : 1) : 0 }}
            tabIndex={i === current ? 0 : -1}
          >
            {/* 桌機圖 16:9 */}
            <div className="absolute inset-0 hidden md:block">
              <Image
                key={i === current ? `active-desktop-${current}` : `desktop-${slide.src}`}
                src={slide.src}
                alt={slide.alt}
                fill
                className={`object-cover ${i === current ? "hero-zoom" : ""}`}
                priority={i === 0}
              />
            </div>
            {/* 手機圖 9:16 */}
            <div className="absolute inset-0 block md:hidden">
              <Image
                key={i === current ? `active-mobile-${current}` : `mobile-${slide.srcMobile ?? slide.src}`}
                src={slide.srcMobile ?? slide.src}
                alt={slide.alt}
                fill
                className={`object-cover object-center ${i === current ? "hero-zoom" : ""}`}
                priority={i === 0}
              />
            </div>
          </Link>
        ))}

        <div className="absolute inset-0 bg-black/35 pointer-events-none" />

        <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center pb-10 md:pb-14 gap-4 text-center px-6 pointer-events-none">
          <h1 className="text-[17px] font-light tracking-[0.12em] text-white">
            讓未來的生活，在此具現。
          </h1>
          <p className="hidden md:block text-[16px] text-white/70 leading-relaxed max-w-md tracking-wide">
            ── 室內設計不只是裝修，更是探索生活可能性的過程。
          </p>

          <div className="hidden md:flex gap-2 mt-2 pointer-events-auto">
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

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 opacity-30 pointer-events-none">
          <div className="w-px h-8 bg-white" />
        </div>
      </section>
    </div>
  );
}

"use client";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Work } from "@/lib/data";

export default function WorkCard({ w }: { w: Work }) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setRevealed(true); },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <Link href={w.href} className="group block">
        <div
          className="aspect-[4/3] md:aspect-[16/10] overflow-hidden relative"
          style={{ backgroundColor: w.bg }}
        >
          {w.cover ? (
            <Image
              src={w.cover}
              alt={w.title}
              fill
              className="object-cover md:grayscale group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="label text-[#0000ff]/60">作品圖片</span>
            </div>
          )}

          <div
            className={`absolute inset-x-0 bottom-0 bg-[#0000ff] px-6 py-5 transition-transform duration-500 ease-out md:translate-y-full group-hover:translate-y-0 ${revealed ? "translate-y-0" : "translate-y-full"}`}
          >
            <p className="label text-white/50 mb-2">Project</p>
            <p className="text-[17px] font-medium text-white leading-snug mb-3">{w.title}</p>
            <div className="flex gap-5">
              {w.location && <p className="label text-white/60">{w.location}</p>}
              {w.type && <p className="label text-white/60">{w.type}</p>}
              {w.size && <p className="label text-white/60">{w.size}</p>}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

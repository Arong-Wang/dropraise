"use client";

import Image from "next/image";
import { useRef, useState, useCallback } from "react";

interface Props {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeLabel = "改造前",
  afterLabel = "完工後",
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = Math.min(Math.max(((clientX - rect.left) / rect.width) * 100, 0), 100);
    setPosition(pct);
  }, []);

  const onMouseDown = () => { isDragging.current = true; };
  const onMouseUp = () => { isDragging.current = false; };
  const onMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) updatePosition(e.clientX);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    updatePosition(e.touches[0].clientX);
  };

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden select-none cursor-col-resize aspect-[4/3]"
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onMouseMove={onMouseMove}
      onTouchMove={onTouchMove}
    >
      {/* After image — base layer */}
      <Image
        src={afterSrc}
        alt={afterLabel}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
        draggable={false}
      />

      {/* Before image — clipped layer */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={beforeSrc}
          alt={beforeLabel}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          draggable={false}
        />
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-px bg-white pointer-events-none"
        style={{ left: `${position}%` }}
      >
        {/* Handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#0000ff] flex items-center justify-center shadow-lg">
          <span className="text-white text-xs font-light tracking-tight select-none">‹ ›</span>
        </div>
      </div>

      {/* Labels */}
      <span className="absolute top-3 left-3 label bg-black/40 text-white px-2 py-1 pointer-events-none">
        {beforeLabel}
      </span>
      <span className="absolute top-3 right-3 label bg-black/40 text-white px-2 py-1 pointer-events-none">
        {afterLabel}
      </span>
    </div>
  );
}

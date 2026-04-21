"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const links = [
  { href: "/interior", label: "Interior" },
  { href: "/mbr", label: "Made by Romance" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHome = pathname === "/";

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  // 首頁未捲動：透明；其他頁或捲動後：白底
  const transparent = isHome && !scrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        transparent
          ? "bg-transparent border-b border-white/10"
          : "bg-[#F8F7F5]/95 backdrop-blur-sm border-b border-[#E2E2DC]"
      }`}
    >
      <div className="relative h-28 flex items-center px-6 md:px-10">

        {/* Logo */}
        <Link href="/" className="absolute left-6 md:left-10 flex items-center group">
          <Image
            src="/logo.png"
            alt="Dropraise"
            width={120}
            height={40}
            className="h-[77px] w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Nav — 置中 */}
        <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-[12px] tracking-[0.1em] uppercase font-normal transition-colors duration-300 ${
                transparent
                  ? pathname === href ? "text-white" : "text-white/60 hover:text-white"
                  : pathname === href ? "text-[#0000ff]" : "text-[#0000ff]/60 hover:text-[#0000ff]"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          className={`md:hidden absolute right-6 label transition-colors duration-300 ${transparent ? "text-white/70" : "text-[#7A7A74]"}`}
          onClick={() => setOpen(!open)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-[#F8F7F5] border-b border-[#E2E2DC] px-6 py-6 flex flex-col gap-5 items-center">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`label transition-colors ${pathname === href ? "text-[#111110]" : "text-[#7A7A74]"}`}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

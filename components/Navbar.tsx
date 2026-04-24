"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const links = [
  { href: "/about", label: "About" },
  { href: "/interior", label: "Interior" },
  { href: "/mbr", label: "Made by Romance" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isAdmin = pathname.startsWith("/admin");
  const isHome = pathname === "/";

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const transparent = isHome && !scrolled;

  if (isAdmin) return null;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          transparent
            ? "bg-transparent backdrop-blur-none border-white/10"
            : "bg-[#F8F7F5]/95 backdrop-blur-sm border-b border-[#E2E2DC]"
        }`}
      >
        <div className="relative h-20 md:h-28 flex items-center px-6 md:px-10 xl:px-16 2xl:px-24">

          {/* Logo */}
          <Link href="/" className="absolute left-6 md:left-10 xl:left-16 2xl:left-24 flex items-center group">
            <Image
              src="/logo.png"
              alt="Dropraise"
              width={120}
              height={40}
              className="h-[48px] md:h-[76px] w-auto object-contain"
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
      </header>

      {/* Mobile Menu — 移到 header 外避免 backdrop-blur 干擾 fixed 定位 */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-40 flex flex-col items-center justify-center"
          style={{ backgroundImage: "url('/works/huang-residence/1.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
        >
          <div className="absolute inset-0 bg-black/60" />
          <nav className="relative z-10 flex flex-col gap-8 items-center">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`text-[15px] tracking-[0.15em] uppercase font-light transition-colors duration-300 ${pathname === href ? "text-white" : "text-white/50 hover:text-white"}`}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}

import Link from "next/link";

const navItems = [
  { href: "/admin", label: "總覽" },
  { href: "/admin/hero", label: "首頁輪播" },
  { href: "/admin/works", label: "作品列表" },
  { label: "── 專案詳細頁", disabled: true },
  { href: "/admin/project/huang-residence", label: "花園新城黃宅" },
  { href: "/admin/project/lin-residence", label: "林宅" },
  { href: "/admin/project/koki-studio", label: "KOKI STUDIO" },
  { href: "/admin/project/liang-residence", label: "梁宅" },
  { label: "──────", disabled: true },
  { href: "/admin/contact", label: "聯絡資訊" },
  { href: "/admin/blog", label: "Blog 文章" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 flex bg-[#F8F7F5] z-[100]">
      {/* Sidebar */}
      <aside className="w-52 shrink-0 bg-[#111110] flex flex-col overflow-y-auto">
        <div className="px-5 py-7 border-b border-white/10">
          <p className="text-[9px] tracking-[0.2em] uppercase text-white/30 mb-1">Dropraise</p>
          <p className="text-[14px] font-light text-white tracking-wide">管理後台</p>
        </div>

        <nav className="flex-1 px-3 py-5 flex flex-col gap-0.5">
          {navItems.map((item, i) =>
            item.disabled ? (
              <p key={i} className="px-3 pt-4 pb-1 text-[10px] text-white/20 tracking-[0.12em]">
                {item.label}
              </p>
            ) : (
              <Link
                key={item.href}
                href={item.href!}
                className="px-3 py-2 text-[12px] text-white/50 hover:text-white hover:bg-white/6 rounded-sm transition-colors"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="px-3 py-5 border-t border-white/10">
          <Link
            href="/"
            className="px-3 py-2 text-[11px] text-white/30 hover:text-white/60 block transition-colors"
          >
            ← 返回網站
          </Link>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}

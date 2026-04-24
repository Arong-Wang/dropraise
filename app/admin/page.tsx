import Link from "next/link";

const sections = [
  { href: "/admin/hero", title: "首頁輪播", desc: "管理首頁大圖的圖片、順序與連結" },
  { href: "/admin/works", title: "作品列表", desc: "新增、編輯、排序作品卡片" },
  { href: "/admin/contact", title: "聯絡資訊", desc: "更新 Email、地址、服務時間" },
  { href: "/admin/blog", title: "Blog 文章", desc: "新增、編輯、刪除部落格文章" },
];

const projects = [
  { slug: "huang-residence", title: "花園新城黃宅" },
  { slug: "lin-residence", title: "林宅室內裝修案" },
  { slug: "koki-studio", title: "KOKI STUDIO" },
  { slug: "liang-residence", title: "梁宅室內裝修案" },
];

export default function AdminDashboard() {
  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-[26px] font-light text-[#111110] mb-1">網站管理後台</h1>
      <p className="text-[12px] text-[#7A7A74] mb-10">
        儲存後在本機開發模式立即生效。部署至 Vercel 後讀取新資料。
      </p>

      <div className="grid sm:grid-cols-2 gap-3 mb-10">
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="block border border-[#E2E2DC] p-5 hover:border-[#0000ff] transition-colors group"
          >
            <p className="text-[14px] font-medium text-[#111110] group-hover:text-[#0000ff] mb-1">
              {s.title}
            </p>
            <p className="text-[11px] text-[#7A7A74] leading-relaxed">{s.desc}</p>
          </Link>
        ))}
      </div>

      <h2 className="text-[10px] uppercase tracking-[0.12em] text-[#7A7A74] mb-3">專案詳細頁</h2>
      <div className="flex flex-col gap-2">
        {projects.map((p) => (
          <Link
            key={p.slug}
            href={`/admin/project/${p.slug}`}
            className="flex items-center justify-between border border-[#E2E2DC] px-5 py-4 hover:border-[#0000ff] transition-colors group"
          >
            <span className="text-[13px] text-[#111110] group-hover:text-[#0000ff]">{p.title}</span>
            <span className="text-[11px] text-[#7A7A74]">編輯 →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

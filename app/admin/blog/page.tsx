"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

interface PostMeta {
  slug: string; filename: string; title: string; date: string;
  category: string; excerpt: string; coverImage: string;
}

export default function BlogAdminPage() {
  const [posts, setPosts] = useState<PostMeta[]>([]);
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);

  const load = () => fetch("/api/admin/blog").then((r) => r.json()).then(setPosts);
  useEffect(() => { load(); }, []);

  const del = async (slug: string) => {
    if (!confirm(`確定刪除「${slug}」？此操作無法復原。`)) return;
    setDeletingSlug(slug);
    await fetch(`/api/admin/blog/${slug}`, { method: "DELETE" });
    setDeletingSlug(null);
    load();
  };

  return (
    <div className="p-8 max-w-2xl">
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-[20px] font-light text-[#111110] mb-1">Blog 文章</h1>
          <p className="text-[11px] text-[#7A7A74]">新增、編輯、刪除部落格文章（Markdown）</p>
        </div>
        <Link href="/admin/blog/new" className="px-4 py-2 bg-[#0000ff] text-white text-[12px] hover:bg-[#0000cc] transition-colors">
          + 新文章
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="text-[13px] text-[#7A7A74]">尚無文章</p>
      ) : (
        <div className="flex flex-col gap-2">
          {posts.map((p) => (
            <div key={p.slug} className="border border-[#E2E2DC] px-4 py-4 flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-[13px] text-[#111110] font-medium truncate">{p.title}</p>
                <p className="text-[10px] text-[#7A7A74] mt-0.5">{p.date} · {p.category}</p>
                {p.excerpt && <p className="text-[11px] text-[#7A7A74] mt-1 line-clamp-2">{p.excerpt}</p>}
              </div>
              <div className="flex gap-2 shrink-0">
                <Link href={`/admin/blog/${p.slug}`} className="px-3 py-1.5 text-[11px] border border-[#E2E2DC] text-[#111110] hover:border-[#0000ff] hover:text-[#0000ff] transition-colors">
                  編輯
                </Link>
                <button
                  onClick={() => del(p.slug)}
                  disabled={deletingSlug === p.slug}
                  className="px-3 py-1.5 text-[11px] border border-red-200 text-red-500 hover:border-red-400 disabled:opacity-50"
                >
                  {deletingSlug === p.slug ? "刪除中..." : "刪除"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

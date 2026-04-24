"use client";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import BlogEditor from "../_editor";

interface PostData {
  slug: string; title: string; date: string; category: string;
  coverImage: string; excerpt: string; content: string;
}

export default function EditBlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();
  const [data, setData] = useState<PostData | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch(`/api/admin/blog/${slug}`).then((r) => r.json()).then(setData);
  }, [slug]);

  const save = async (updated: PostData) => {
    setSaving(true);
    const res = await fetch(`/api/admin/blog/${slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    setSaving(false);
    if (res.ok) {
      setMsg("儲存成功 ✓");
      setTimeout(() => setMsg(""), 4000);
    } else {
      setMsg("儲存失敗 — 請在本機 npm run dev 執行");
    }
  };

  if (!data) return <div className="p-8 text-[13px] text-[#7A7A74]">載入中...</div>;

  return (
    <div className="p-8 max-w-2xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[20px] font-light text-[#111110] mb-1">編輯文章</h1>
          <p className="text-[11px] text-[#7A7A74]">{data.title}</p>
        </div>
        <button onClick={() => router.push("/admin/blog")} className="text-[11px] text-[#7A7A74] hover:text-[#111110]">← 返回列表</button>
      </div>
      {msg && <p className={`text-[11px] mb-4 ${msg.includes("成功") ? "text-green-600" : "text-red-500"}`}>{msg}</p>}
      <BlogEditor initial={data} saving={saving} onSave={save} />
    </div>
  );
}

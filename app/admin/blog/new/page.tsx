"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import BlogEditor from "../_editor";

export default function NewBlogPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const save = async (data: {
    slug: string; title: string; date: string; category: string;
    coverImage: string; excerpt: string; content: string;
  }) => {
    if (!data.slug || !data.date || !data.title) {
      setMsg("Slug、日期、標題為必填");
      return;
    }
    setSaving(true);
    const res = await fetch("/api/admin/blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
    if (res.ok) {
      router.push("/admin/blog");
    } else {
      setMsg("建立失敗 — 請在本機 npm run dev 執行");
    }
  };

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-[20px] font-light text-[#111110] mb-1">新增文章</h1>
      <p className="text-[11px] text-[#7A7A74] mb-8">填寫後按儲存，將建立 Markdown 檔案於 content/blog/</p>
      {msg && <p className="text-[11px] text-red-500 mb-4">{msg}</p>}
      <BlogEditor
        initial={{ slug: "", title: "", date: new Date().toISOString().split("T")[0], category: "", coverImage: "", excerpt: "", content: "" }}
        saving={saving}
        onSave={save}
        isNew
      />
    </div>
  );
}

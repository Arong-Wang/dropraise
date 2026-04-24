"use client";
import { useState } from "react";

interface PostData {
  slug: string; title: string; date: string; category: string;
  coverImage: string; excerpt: string; content: string;
}

export default function BlogEditor({
  initial, saving, onSave, isNew,
}: {
  initial: PostData;
  saving: boolean;
  onSave: (data: PostData) => void;
  isNew?: boolean;
}) {
  const [form, setForm] = useState<PostData>(initial);

  const set = (field: keyof PostData, val: string) =>
    setForm((f) => ({ ...f, [field]: val }));

  return (
    <div className="flex flex-col gap-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <F label={`Slug（URL 用）${isNew ? " *" : ""}`} value={form.slug} onChange={(v) => set("slug", v)} placeholder="wood-floor-vs-tile" disabled={!isNew} />
        <F label="日期 *" value={form.date} onChange={(v) => set("date", v)} placeholder="2026-04-23" />
        <F label="標題 *" value={form.title} onChange={(v) => set("title", v)} />
        <F label="分類" value={form.category} onChange={(v) => set("category", v)} placeholder="設計觀點" />
        <F label="封面圖路徑" value={form.coverImage} onChange={(v) => set("coverImage", v)} placeholder="/blog/cover.jpg" />
      </div>
      <F label="摘要" value={form.excerpt} onChange={(v) => set("excerpt", v)} multiline rows={2} />
      <div>
        <label className="block text-[10px] uppercase tracking-[0.1em] text-[#7A7A74] mb-2">內文（Markdown）</label>
        <textarea
          value={form.content}
          onChange={(e) => set("content", e.target.value)}
          rows={20}
          className="w-full border border-[#E2E2DC] bg-transparent p-3 text-[12px] font-mono text-[#111110] focus:outline-none focus:border-[#0000ff] resize-y"
          placeholder="## 標題&#10;&#10;文章內容..."
        />
      </div>
      <div className="flex justify-end">
        <button
          onClick={() => onSave(form)}
          disabled={saving}
          className="px-6 py-2.5 bg-[#0000ff] text-white text-[12px] hover:bg-[#0000cc] disabled:opacity-50 transition-colors"
        >
          {saving ? "儲存中..." : isNew ? "建立文章" : "儲存"}
        </button>
      </div>
    </div>
  );
}

function F({ label, value, onChange, placeholder, multiline, rows, disabled }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; multiline?: boolean; rows?: number; disabled?: boolean;
}) {
  const base = `w-full border-b border-[#E2E2DC] bg-transparent pb-2 text-[13px] text-[#111110] focus:outline-none focus:border-[#0000ff] transition-colors ${disabled ? "opacity-40 cursor-not-allowed" : ""}`;
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-[0.1em] text-[#7A7A74] mb-1">{label}</label>
      {multiline ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={rows ?? 3} className={`${base} resize-none`} />
      ) : (
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} disabled={disabled} className={base} />
      )}
    </div>
  );
}

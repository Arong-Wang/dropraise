"use client";
import { useState, useEffect } from "react";
import ImagePicker from "../_components/ImagePicker";

interface Work {
  id: number;
  slug: string;
  title: string;
  year: string;
  href: string;
  cover: string;
  bg: string;
  location: string;
  type: string;
  size: string;
  desc: string;
}

interface Layout {
  interiorCardGap: number;
}

const empty: Work = {
  id: Date.now(),
  slug: "",
  title: "",
  year: "",
  href: "",
  cover: "",
  bg: "#EDECEA",
  location: "",
  type: "",
  size: "",
  desc: "",
};

export default function WorksAdminPage() {
  const [works, setWorks] = useState<Work[]>([]);
  const [layout, setLayout] = useState<Layout>({ interiorCardGap: 40 });
  const [open, setOpen] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/api/admin/works").then((r) => r.json()).then(setWorks);
    fetch("/api/admin/layout").then((r) => r.json()).then(setLayout);
  }, []);

  const update = (i: number, field: keyof Work, val: string | number) =>
    setWorks((prev) => prev.map((w, idx) => (idx === i ? { ...w, [field]: val } : w)));

  const remove = (i: number) => {
    setWorks((prev) => prev.filter((_, idx) => idx !== i));
    setOpen(null);
  };

  const add = () => {
    const newWork = { ...empty, id: Date.now() };
    setWorks((prev) => [...prev, newWork]);
    setOpen(works.length);
  };

  const move = (i: number, dir: -1 | 1) => {
    const next = [...works];
    [next[i], next[i + dir]] = [next[i + dir], next[i]];
    setWorks(next);
  };

  const save = async () => {
    setSaving(true);
    const [r1, r2] = await Promise.all([
      fetch("/api/admin/works", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(works),
      }),
      fetch("/api/admin/layout", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(layout),
      }),
    ]);
    setSaving(false);
    setMsg(r1.ok && r2.ok ? "儲存成功 ✓" : "儲存失敗 — 請在本機 npm run dev 執行");
    setTimeout(() => setMsg(""), 4000);
  };

  return (
    <div className="p-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-10">
        <div>
          <h1 className="text-[24px] font-light text-[#111110] mb-1">作品列表</h1>
          <p className="text-[12px] text-[#7A7A74]">管理首頁與 Interior 頁的作品卡片</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {msg && (
            <span className={`text-[12px] ${msg.includes("成功") ? "text-green-600" : "text-red-500"}`}>
              {msg}
            </span>
          )}
          <button
            onClick={save}
            disabled={saving}
            className="px-8 py-3 bg-[#0000ff] text-white text-[13px] hover:bg-[#0000cc] disabled:opacity-50 transition-colors"
          >
            {saving ? "儲存中..." : "儲存全部"}
          </button>
        </div>
      </div>

      {/* Works */}
      <div className="flex flex-col gap-4 mb-10">
        {works.map((w, i) => (
          <div key={w.id} className="border border-[#E2E2DC]">
            {/* Card row */}
            <div
              className="flex items-center gap-4 p-4 cursor-pointer hover:bg-[#F0EFED] transition-colors"
              onClick={() => setOpen(open === i ? null : i)}
            >
              <div className="w-20 h-14 bg-[#EDECEA] shrink-0 overflow-hidden">
                {w.cover && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={w.cover} alt={w.title} className="w-full h-full object-cover" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-light text-[#111110] truncate">
                  {w.title || "(未命名)"}
                </p>
                <p className="text-[11px] text-[#7A7A74] mt-0.5">
                  {[w.year, w.location, w.type].filter(Boolean).join(" · ")}
                </p>
              </div>
              <div className="flex gap-1.5 shrink-0">
                <button
                  onClick={(e) => { e.stopPropagation(); move(i, -1); }}
                  disabled={i === 0}
                  className="w-8 h-8 flex items-center justify-center text-[12px] border border-[#E2E2DC] hover:border-[#0000ff] disabled:opacity-30"
                >
                  ↑
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); move(i, 1); }}
                  disabled={i === works.length - 1}
                  className="w-8 h-8 flex items-center justify-center text-[12px] border border-[#E2E2DC] hover:border-[#0000ff] disabled:opacity-30"
                >
                  ↓
                </button>
              </div>
              <span className="text-[11px] text-[#7A7A74] w-4 text-center">
                {open === i ? "▲" : "▼"}
              </span>
            </div>

            {/* Expanded form */}
            {open === i && (
              <div className="border-t border-[#E2E2DC] p-6">
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-1">
                    <ImagePicker
                      label="封面照片"
                      value={w.cover}
                      onChange={(v) => update(i, "cover", v)}
                      folder={`works/${w.slug || "uploads"}`}
                      aspect="4/3"
                    />
                  </div>
                  <div className="col-span-2 grid sm:grid-cols-2 gap-4 content-start">
                    <F label="名稱" value={w.title} onChange={(v) => update(i, "title", v)} />
                    <F label="年份" value={w.year} onChange={(v) => update(i, "year", v)} placeholder="2025" />
                    <F label="Slug (URL)" value={w.slug} onChange={(v) => update(i, "slug", v)} placeholder="huang-residence" />
                    <F label="連結 (href)" value={w.href} onChange={(v) => update(i, "href", v)} placeholder="/interior/slug" />
                    <F label="地點" value={w.location} onChange={(v) => update(i, "location", v)} />
                    <F label="類型" value={w.type} onChange={(v) => update(i, "type", v)} />
                    <F label="坪數" value={w.size} onChange={(v) => update(i, "size", v)} />
                    <F label="背景色" value={w.bg} onChange={(v) => update(i, "bg", v)} placeholder="#EDECEA" />
                    <div className="sm:col-span-2">
                      <F label="說明" value={w.desc} onChange={(v) => update(i, "desc", v)} multiline />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-5 pt-4 border-t border-[#E2E2DC]">
                  <button
                    onClick={() => remove(i)}
                    className="px-4 py-2 text-[12px] text-red-500 border border-red-200 hover:border-red-400 hover:text-red-700 transition-colors"
                  >
                    刪除此作品
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={add}
        className="w-full py-4 border border-dashed border-[#E2E2DC] text-[13px] text-[#7A7A74] hover:border-[#0000ff] hover:text-[#0000ff] transition-colors mb-14"
      >
        + 新增作品
      </button>

      {/* Layout settings */}
      <div className="border-t border-[#E2E2DC] pt-10">
        <h2 className="text-[11px] uppercase tracking-[0.14em] text-[#7A7A74] mb-8">版面設定</h2>
        <div className="max-w-sm">
          <label className="block text-[10px] uppercase tracking-[0.12em] text-[#7A7A74] mb-3">
            Interior 頁卡片間距 —{" "}
            <span className="text-[#0000ff]">{layout.interiorCardGap}px</span>
          </label>
          <input
            type="range"
            min={16}
            max={120}
            step={4}
            value={layout.interiorCardGap}
            onChange={(e) => setLayout({ ...layout, interiorCardGap: Number(e.target.value) })}
            className="w-full accent-[#0000ff] mb-2"
          />
          <div className="flex justify-between mb-6">
            <span className="text-[10px] text-[#7A7A74]">緊湊 16px</span>
            <span className="text-[10px] text-[#7A7A74]">寬鬆 120px</span>
          </div>

          {/* Visual preview */}
          <div className="bg-[#F0EFED] p-4">
            <p className="text-[9px] uppercase tracking-[0.14em] text-[#7A7A74] mb-3">間距預覽</p>
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-8 bg-white border border-[#E2E2DC]"
                style={{ marginBottom: n < 3 ? layout.interiorCardGap / 3 : 0 }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function F({
  label,
  value,
  onChange,
  placeholder,
  multiline,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  multiline?: boolean;
}) {
  const base =
    "w-full border-b border-[#E2E2DC] bg-transparent pb-2 text-[13px] text-[#111110] focus:outline-none focus:border-[#0000ff] transition-colors";
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-[0.1em] text-[#7A7A74] mb-1">
        {label}
      </label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          className={`${base} resize-none`}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={base}
        />
      )}
    </div>
  );
}

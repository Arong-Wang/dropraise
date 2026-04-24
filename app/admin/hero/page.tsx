"use client";
import { useState, useEffect } from "react";
import ImagePicker from "../_components/ImagePicker";

interface Slide {
  src: string;
  alt: string;
  href: string;
  label: string;
}

export default function HeroAdminPage() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/api/admin/hero").then((r) => r.json()).then(setSlides);
  }, []);

  const update = (i: number, field: keyof Slide, val: string) =>
    setSlides((prev) => prev.map((s, idx) => (idx === i ? { ...s, [field]: val } : s)));

  const remove = (i: number) =>
    setSlides((prev) => prev.filter((_, idx) => idx !== i));

  const add = () =>
    setSlides((prev) => [...prev, { src: "", alt: "", href: "", label: "" }]);

  const move = (i: number, dir: -1 | 1) => {
    const next = [...slides];
    [next[i], next[i + dir]] = [next[i + dir], next[i]];
    setSlides(next);
  };

  const save = async () => {
    setSaving(true);
    const res = await fetch("/api/admin/hero", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(slides),
    });
    setSaving(false);
    setMsg(res.ok ? "儲存成功 ✓" : "儲存失敗 — 請在本機 npm run dev 執行");
    setTimeout(() => setMsg(""), 4000);
  };

  return (
    <div className="p-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-10">
        <div>
          <h1 className="text-[24px] font-light text-[#111110] mb-1">首頁輪播</h1>
          <p className="text-[12px] text-[#7A7A74]">調整輪播圖的順序、圖片與標籤</p>
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
            {saving ? "儲存中..." : "儲存"}
          </button>
        </div>
      </div>

      {/* Slides grid */}
      <div className="grid sm:grid-cols-2 gap-6 mb-8">
        {slides.map((slide, i) => (
          <div key={i} className="border border-[#E2E2DC] p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] uppercase tracking-[0.14em] text-[#7A7A74]">
                Slide {i + 1}
              </span>
              <div className="flex gap-1.5">
                <button
                  onClick={() => move(i, -1)}
                  disabled={i === 0}
                  className="w-8 h-8 flex items-center justify-center text-[12px] border border-[#E2E2DC] hover:border-[#0000ff] disabled:opacity-30"
                >
                  ←
                </button>
                <button
                  onClick={() => move(i, 1)}
                  disabled={i === slides.length - 1}
                  className="w-8 h-8 flex items-center justify-center text-[12px] border border-[#E2E2DC] hover:border-[#0000ff] disabled:opacity-30"
                >
                  →
                </button>
                <button
                  onClick={() => remove(i)}
                  className="w-8 h-8 flex items-center justify-center text-[11px] border border-red-200 text-red-400 hover:border-red-400 hover:text-red-600"
                >
                  ✕
                </button>
              </div>
            </div>

            <ImagePicker
              label="輪播圖片"
              value={slide.src}
              onChange={(v) => update(i, "src", v)}
              folder="works"
              aspect="16/9"
            />

            <div className="grid gap-3 mt-4">
              <Field
                label="替代文字 (alt)"
                value={slide.alt}
                onChange={(v) => update(i, "alt", v)}
                placeholder="作品名稱"
              />
              <Field
                label="連結 (href)"
                value={slide.href}
                onChange={(v) => update(i, "href", v)}
                placeholder="/interior/slug"
              />
              <Field
                label="標籤 (label)"
                value={slide.label}
                onChange={(v) => update(i, "label", v)}
                placeholder="作品名稱 — 類型"
              />
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={add}
        className="w-full py-4 border border-dashed border-[#E2E2DC] text-[13px] text-[#7A7A74] hover:border-[#0000ff] hover:text-[#0000ff] transition-colors"
      >
        + 新增輪播項目
      </button>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-[0.12em] text-[#7A7A74] mb-1">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border-b border-[#E2E2DC] bg-transparent pb-2 text-[13px] text-[#111110] focus:outline-none focus:border-[#0000ff] transition-colors"
      />
    </div>
  );
}

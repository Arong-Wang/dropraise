"use client";
import { useState, useEffect, use, useRef } from "react";
import ImagePicker from "../../_components/ImagePicker";

interface DesignSlide {
  src: string;
  caption: string;
}

interface Project {
  slug: string;
  title: string;
  subtitle: string;
  cover: string;
  location: string;
  type: string;
  size: string;
  condition: string;
  description: string[];
  designSlides: DesignSlide[];
  floorPlan: { src: string; caption: string };
  photos: string[];
}

export default function ProjectAdminPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [project, setProject] = useState<Project | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [batchUploading, setBatchUploading] = useState(false);
  const photoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch(`/api/admin/project/${slug}`).then((r) => r.json()).then(setProject);
  }, [slug]);

  const set = (field: keyof Project, val: unknown) =>
    setProject((p) => (p ? { ...p, [field]: val } : p));

  const updateDesc = (i: number, val: string) => {
    const next = [...(project?.description ?? [])];
    next[i] = val;
    set("description", next);
  };
  const addDesc = () => set("description", [...(project?.description ?? []), ""]);
  const removeDesc = (i: number) =>
    set("description", (project?.description ?? []).filter((_, idx) => idx !== i));

  const updateSlide = (i: number, field: keyof DesignSlide, val: string) => {
    const next = [...(project?.designSlides ?? [])];
    next[i] = { ...next[i], [field]: val };
    set("designSlides", next);
  };
  const addSlide = () =>
    set("designSlides", [...(project?.designSlides ?? []), { src: "", caption: "" }]);
  const removeSlide = (i: number) =>
    set("designSlides", (project?.designSlides ?? []).filter((_, idx) => idx !== i));

  const updatePhoto = (i: number, val: string) => {
    const next = [...(project?.photos ?? [])];
    next[i] = val;
    set("photos", next);
  };
  const removePhoto = (i: number) =>
    set("photos", (project?.photos ?? []).filter((_, idx) => idx !== i));

  const handleBatchPhotos = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setBatchUploading(true);
    const paths = await Promise.all(
      files.map(async (file) => {
        const form = new FormData();
        form.append("file", file);
        form.append("folder", `works/${slug}`);
        const res = await fetch("/api/admin/upload", { method: "POST", body: form });
        const data = await res.json();
        return data.path as string;
      })
    );
    set("photos", [...(project?.photos ?? []), ...paths.filter(Boolean)]);
    setBatchUploading(false);
    e.target.value = "";
  };

  const save = async () => {
    if (!project) return;
    setSaving(true);
    const res = await fetch(`/api/admin/project/${slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project),
    });
    setSaving(false);
    setMsg(res.ok ? "儲存成功 ✓" : "儲存失敗 — 請在本機 npm run dev 執行");
    setTimeout(() => setMsg(""), 4000);
  };

  if (!project) return <div className="p-8 text-[13px] text-[#7A7A74]">載入中...</div>;

  return (
    <div className="p-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-10">
        <div>
          <h1 className="text-[24px] font-light text-[#111110] mb-1">{project.title}</h1>
          <p className="text-[12px] text-[#7A7A74]">專案詳細頁內容</p>
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

      {/* 基本資訊 + 封面 */}
      <Section title="基本資訊">
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-1">
            <ImagePicker
              label="封面照片"
              value={project.cover}
              onChange={(v) => set("cover", v)}
              folder={`works/${slug}`}
              aspect="4/3"
            />
          </div>
          <div className="col-span-2 grid sm:grid-cols-2 gap-4 content-start">
            <F label="標題" value={project.title} onChange={(v) => set("title", v)} />
            <F label="副標題" value={project.subtitle} onChange={(v) => set("subtitle", v)} placeholder="住宅 · 新成屋" />
            <F label="地點" value={project.location} onChange={(v) => set("location", v)} />
            <F label="類型" value={project.type} onChange={(v) => set("type", v)} />
            <F label="坪數" value={project.size} onChange={(v) => set("size", v)} />
            <F label="屋況" value={project.condition} onChange={(v) => set("condition", v)} />
          </div>
        </div>
      </Section>

      {/* 設計說明 */}
      <Section title="設計說明（段落）">
        <div className="flex flex-col gap-3">
          {project.description.map((para, i) => (
            <div key={i} className="flex gap-2 items-start">
              <textarea
                value={para}
                onChange={(e) => updateDesc(i, e.target.value)}
                rows={3}
                className="flex-1 border border-[#E2E2DC] bg-transparent p-3 text-[13px] text-[#111110] focus:outline-none focus:border-[#0000ff] resize-none transition-colors"
              />
              <button
                onClick={() => removeDesc(i)}
                className="w-8 h-8 flex items-center justify-center text-[11px] text-red-400 hover:text-red-600 border border-transparent hover:border-red-200 mt-0.5 transition-colors"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={addDesc}
          className="mt-2 px-4 py-2 text-[12px] border border-dashed border-[#E2E2DC] text-[#7A7A74] hover:border-[#0000ff] hover:text-[#0000ff] transition-colors"
        >
          + 新增段落
        </button>
      </Section>

      {/* 設計提案 */}
      <Section title="設計提案圖片">
        <div className="grid sm:grid-cols-2 gap-5">
          {project.designSlides.map((slide, i) => (
            <div key={i} className="border border-[#E2E2DC] p-4">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] uppercase tracking-[0.12em] text-[#7A7A74]">
                  圖片 {i + 1}
                </span>
                <button
                  onClick={() => removeSlide(i)}
                  className="w-7 h-7 flex items-center justify-center text-[11px] text-red-400 hover:text-red-600 border border-transparent hover:border-red-200 transition-colors"
                >
                  ✕
                </button>
              </div>
              <ImagePicker
                label="圖片"
                value={slide.src}
                onChange={(v) => updateSlide(i, "src", v)}
                folder={`works/${slug}`}
                aspect="4/3"
              />
              <div className="mt-3">
                <F
                  label="說明文字"
                  value={slide.caption}
                  onChange={(v) => updateSlide(i, "caption", v)}
                />
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={addSlide}
          className="mt-2 px-4 py-2 text-[12px] border border-dashed border-[#E2E2DC] text-[#7A7A74] hover:border-[#0000ff] hover:text-[#0000ff] transition-colors"
        >
          + 新增設計圖
        </button>
      </Section>

      {/* 平面圖 */}
      <Section title="平面圖">
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-1">
            <ImagePicker
              label="平面圖"
              value={project.floorPlan.src}
              onChange={(v) => set("floorPlan", { ...project.floorPlan, src: v })}
              folder={`works/${slug}`}
              aspect="1/1"
            />
          </div>
          <div className="col-span-2 content-start">
            <F
              label="說明文字"
              value={project.floorPlan.caption}
              onChange={(v) => set("floorPlan", { ...project.floorPlan, caption: v })}
            />
          </div>
        </div>
      </Section>

      {/* 完工照 */}
      <Section title={`完工照（共 ${project.photos.length} 張）`}>
        {/* Photo grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-4">
          {project.photos.map((photo, i) => (
            <div key={i} className="relative group aspect-square bg-[#EDECEA] overflow-hidden">
              {photo && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={photo}
                  alt={`照片 ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              )}
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1">
                <input
                  type="text"
                  value={photo}
                  onChange={(e) => updatePhoto(i, e.target.value)}
                  className="w-[calc(100%-16px)] text-[9px] text-white bg-black/60 border-b border-white/40 pb-0.5 focus:outline-none text-center"
                  onClick={(e) => e.stopPropagation()}
                />
                <button
                  onClick={() => removePhoto(i)}
                  className="text-[10px] text-red-300 hover:text-red-100"
                >
                  ✕ 移除
                </button>
              </div>
              {/* Index badge */}
              <span className="absolute top-1 left-1 text-[9px] text-white bg-black/50 px-1 py-0.5">
                {i + 1}
              </span>
            </div>
          ))}

          {/* Add slot */}
          <div
            className="aspect-square bg-[#F0EFED] border border-dashed border-[#E2E2DC] flex flex-col items-center justify-center cursor-pointer hover:border-[#0000ff] hover:text-[#0000ff] transition-colors text-[#C8C8C2]"
            onClick={() => photoInputRef.current?.click()}
          >
            <span className="text-[24px] mb-1">+</span>
            <span className="text-[10px]">新增照片</span>
          </div>
        </div>

        {/* Batch upload button */}
        <button
          onClick={() => photoInputRef.current?.click()}
          disabled={batchUploading}
          className="px-6 py-3 text-[12px] border border-[#E2E2DC] text-[#7A7A74] hover:border-[#0000ff] hover:text-[#0000ff] transition-colors disabled:opacity-50"
        >
          {batchUploading ? "上傳中..." : "批量選取照片"}
        </button>

        <input
          ref={photoInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleBatchPhotos}
        />
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <p className="text-[10px] uppercase tracking-[0.14em] text-[#7A7A74] mb-5 pb-3 border-b border-[#E2E2DC]">
        {title}
      </p>
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}

function F({
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
      <label className="block text-[10px] uppercase tracking-[0.1em] text-[#7A7A74] mb-1">
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

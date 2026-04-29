"use client";
import { useState, useRef } from "react";
import type { ReactNode } from "react";

interface PostData {
  slug: string; title: string; date: string; category: string;
  coverImage: string; excerpt: string; content: string;
}

type TextBlock = { id: string; type: "text"; content: string };
type SplitBlock = { id: string; type: "split"; content: string; image: string };
type Block = TextBlock | SplitBlock;

let _c = 0;
function uid() { return `b${++_c}`; }

function parseBlocks(raw: string): Block[] {
  const pat = /<!-- BLOCK:split\|([^>]+) -->([\s\S]*?)<!-- \/BLOCK:split -->/g;
  const blocks: Block[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = pat.exec(raw)) !== null) {
    const pre = raw.slice(last, m.index).trim();
    if (pre) blocks.push({ id: uid(), type: "text", content: pre });
    blocks.push({ id: uid(), type: "split", image: m[1], content: m[2].trim() });
    last = pat.lastIndex;
  }
  const tail = raw.slice(last).trim();
  if (tail) blocks.push({ id: uid(), type: "text", content: tail });
  if (!blocks.length) blocks.push({ id: uid(), type: "text", content: "" });
  return blocks;
}

function serializeBlocks(blocks: Block[]): string {
  return blocks
    .map((b) =>
      b.type === "text"
        ? b.content
        : `<!-- BLOCK:split|${b.image} -->\n${b.content}\n<!-- /BLOCK:split -->`
    )
    .join("\n\n");
}

export default function BlogEditor({
  initial, saving, onSave, isNew,
}: {
  initial: PostData;
  saving: boolean;
  onSave: (data: PostData) => void;
  isNew?: boolean;
}) {
  const [meta, setMetaState] = useState({
    slug: initial.slug, title: initial.title, date: initial.date,
    category: initial.category, coverImage: initial.coverImage, excerpt: initial.excerpt,
  });
  const [blocks, setBlocks] = useState<Block[]>(() => parseBlocks(initial.content ?? ""));

  const setMeta = (k: keyof typeof meta, v: string) => setMetaState((m) => ({ ...m, [k]: v }));

  const updBlock = (id: string, changes: Partial<Block>) =>
    setBlocks((bs) => bs.map((b) => (b.id === id ? ({ ...b, ...changes } as Block) : b)));

  const delBlock = (id: string) => setBlocks((bs) => {
    const next = bs.filter((b) => b.id !== id);
    return next.length ? next : [{ id: uid(), type: "text", content: "" }];
  });

  const moveBlock = (id: string, dir: -1 | 1) =>
    setBlocks((bs) => {
      const i = bs.findIndex((b) => b.id === id);
      if (i + dir < 0 || i + dir >= bs.length) return bs;
      const a = [...bs]; [a[i], a[i + dir]] = [a[i + dir], a[i]]; return a;
    });

  const addBlock = (type: "text" | "split") =>
    setBlocks((bs) => [
      ...bs,
      type === "text"
        ? { id: uid(), type: "text", content: "" }
        : { id: uid(), type: "split", content: "", image: "" },
    ]);

  return (
    <div className="flex flex-col gap-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <F label={`Slug${isNew ? " *" : ""}`} value={meta.slug} onChange={(v) => setMeta("slug", v)} placeholder="wood-floor-vs-tile" disabled={!isNew} />
        <F label="日期 *" value={meta.date} onChange={(v) => setMeta("date", v)} placeholder="2026-04-28" />
        <F label="標題 *" value={meta.title} onChange={(v) => setMeta("title", v)} />
        <F label="分類" value={meta.category} onChange={(v) => setMeta("category", v)} placeholder="設計觀點" />
        <F label="封面圖路徑" value={meta.coverImage} onChange={(v) => setMeta("coverImage", v)} placeholder="/blog/cover.jpg" />
      </div>
      <F label="摘要" value={meta.excerpt} onChange={(v) => setMeta("excerpt", v)} multiline rows={2} />

      <div>
        <label className="block text-[20px] uppercase tracking-[0.1em] text-[#7A7A74] mb-3">內文區塊</label>
        <div className="flex flex-col gap-3">
          {blocks.map((b, i) =>
            b.type === "text" ? (
              <TextBlockUI key={b.id} block={b} idx={i} total={blocks.length}
                onChange={(c) => updBlock(b.id, { content: c })}
                onRemove={() => delBlock(b.id)}
                onMove={(d) => moveBlock(b.id, d)} />
            ) : (
              <SplitBlockUI key={b.id} block={b} idx={i} total={blocks.length}
                onChange={(ch) => updBlock(b.id, ch)}
                onRemove={() => delBlock(b.id)}
                onMove={(d) => moveBlock(b.id, d)} />
            )
          )}
          <div className="flex gap-2 pt-1">
            <button onClick={() => addBlock("text")}
              className="flex-1 border border-dashed border-[#E2E2DC] py-2 text-[20px] text-[#7A7A74] hover:border-[#0000ff] hover:text-[#0000ff] transition-colors">
              + 文字區塊
            </button>
            <button onClick={() => addBlock("split")}
              className="flex-1 border border-dashed border-[#E2E2DC] py-2 text-[20px] text-[#7A7A74] hover:border-[#0000ff] hover:text-[#0000ff] transition-colors">
              + 文字＋圖片
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button onClick={() => onSave({ ...meta, content: serializeBlocks(blocks) })}
          disabled={saving}
          className="px-6 py-2.5 bg-[#0000ff] text-white text-[24px] hover:bg-[#0000cc] disabled:opacity-50 transition-colors">
          {saving ? "儲存中..." : isNew ? "建立文章" : "儲存"}
        </button>
      </div>
    </div>
  );
}

function BlockHeader({ label, idx, total, onMove, onRemove }: {
  label: string; idx: number; total: number;
  onMove: (d: -1 | 1) => void; onRemove: () => void;
}) {
  return (
    <div className="flex items-center justify-between mb-3">
      <span className="text-[18px] uppercase tracking-[0.1em] text-[#7A7A74]">{label}</span>
      <div className="flex gap-1">
        <Btn onClick={() => onMove(-1)} disabled={idx === 0}>↑</Btn>
        <Btn onClick={() => onMove(1)} disabled={idx === total - 1}>↓</Btn>
        <Btn onClick={onRemove} danger>✕</Btn>
      </div>
    </div>
  );
}

function Btn({ onClick, disabled, danger, children }: {
  onClick: () => void; disabled?: boolean; danger?: boolean; children: ReactNode;
}) {
  return (
    <button onClick={onClick} disabled={disabled}
      className={`px-2 py-0.5 text-[18px] disabled:opacity-30 transition-colors ${danger ? "text-red-400 hover:text-red-600" : "text-[#7A7A74] hover:text-[#111110]"}`}>
      {children}
    </button>
  );
}

function TextBlockUI({ block, idx, total, onChange, onRemove, onMove }: {
  block: TextBlock; idx: number; total: number;
  onChange: (c: string) => void; onRemove: () => void; onMove: (d: -1 | 1) => void;
}) {
  return (
    <div className="border border-[#E2E2DC] p-4">
      <BlockHeader label="文字區塊" idx={idx} total={total} onMove={onMove} onRemove={onRemove} />
      <textarea value={block.content} onChange={(e) => onChange(e.target.value)} rows={8}
        className="w-full bg-transparent text-[22px] font-mono text-[#111110] focus:outline-none resize-y"
        placeholder={"## 標題\n\n內文（Markdown）..."} />
    </div>
  );
}

function SplitBlockUI({ block, idx, total, onChange, onRemove, onMove }: {
  block: SplitBlock; idx: number; total: number;
  onChange: (ch: Partial<SplitBlock>) => void; onRemove: () => void; onMove: (d: -1 | 1) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const upload = async (file: File) => {
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("folder", "blog");
    const r = await fetch("/api/admin/upload", { method: "POST", body: fd });
    if (r.ok) {
      const { path: p } = await r.json();
      onChange({ image: p });
    }
    setUploading(false);
  };

  return (
    <div className="border border-[#E2E2DC] p-4">
      <BlockHeader label="文字＋圖片區塊" idx={idx} total={total} onMove={onMove} onRemove={onRemove} />
      <div className="grid grid-cols-2 gap-4">
        <textarea value={block.content} onChange={(e) => onChange({ content: e.target.value })} rows={10}
          className="w-full border border-[#E2E2DC] p-3 bg-transparent text-[22px] font-mono text-[#111110] focus:outline-none focus:border-[#0000ff] resize-y"
          placeholder={"文字內容（Markdown）..."} />
        <div className="flex flex-col gap-2">
          <div onClick={() => ref.current?.click()}
            className="flex-1 border border-dashed border-[#E2E2DC] flex items-center justify-center cursor-pointer hover:border-[#0000ff] transition-colors relative min-h-[200px] overflow-hidden">
            {block.image
              // eslint-disable-next-line @next/next/no-img-element
              ? <img src={block.image} alt="" className="absolute inset-0 w-full h-full object-cover" />
              : <span className="text-[20px] text-[#7A7A74]">{uploading ? "上傳中..." : "點擊選擇圖片"}</span>
            }
          </div>
          {block.image && <p className="text-[18px] text-[#7A7A74] truncate">{block.image}</p>}
          <button onClick={() => ref.current?.click()}
            className="border border-[#E2E2DC] py-1.5 text-[20px] text-[#7A7A74] hover:border-[#0000ff] hover:text-[#0000ff] transition-colors">
            {uploading ? "上傳中..." : block.image ? "更換圖片" : "選擇圖片"}
          </button>
          <input ref={ref} type="file" accept="image/*" className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) upload(f); }} />
        </div>
      </div>
    </div>
  );
}

function F({ label, value, onChange, placeholder, multiline, rows, disabled }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; multiline?: boolean; rows?: number; disabled?: boolean;
}) {
  const cls = `w-full border-b border-[#E2E2DC] bg-transparent pb-2 text-[26px] text-[#111110] focus:outline-none focus:border-[#0000ff] transition-colors ${disabled ? "opacity-40 cursor-not-allowed" : ""}`;
  return (
    <div>
      <label className="block text-[20px] uppercase tracking-[0.1em] text-[#7A7A74] mb-1">{label}</label>
      {multiline
        ? <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={rows ?? 3} className={`${cls} resize-none`} />
        : <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} disabled={disabled} className={cls} />
      }
    </div>
  );
}

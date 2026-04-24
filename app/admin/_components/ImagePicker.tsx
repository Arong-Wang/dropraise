"use client";
import { useRef, useState } from "react";

interface Props {
  label: string;
  value: string;
  onChange: (path: string) => void;
  folder?: string;
  aspect?: string;
}

export default function ImagePicker({
  label,
  value,
  onChange,
  folder = "uploads",
  aspect = "4/3",
}: Props) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const form = new FormData();
    form.append("file", file);
    form.append("folder", folder);
    const res = await fetch("/api/admin/upload", { method: "POST", body: form });
    const data = await res.json();
    setUploading(false);
    if (data.path) onChange(data.path);
    e.target.value = "";
  };

  return (
    <div>
      <label className="block text-[10px] uppercase tracking-[0.12em] text-[#7A7A74] mb-2">
        {label}
      </label>

      {/* Preview */}
      <div
        className="w-full bg-[#EDECEA] mb-3 relative overflow-hidden cursor-pointer group"
        style={{ aspectRatio: aspect }}
        onClick={() => inputRef.current?.click()}
      >
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="preview" className="w-full h-full object-cover" />
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-2">
            <span className="text-[36px] text-[#C8C8C2]">+</span>
            <span className="text-[11px] text-[#C8C8C2]">點擊選擇照片</span>
          </div>
        )}
        {value && !uploading && (
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="text-white text-[12px] tracking-wide">點擊更換</span>
          </div>
        )}
        {uploading && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
            <span className="text-[12px] text-[#7A7A74]">上傳中...</span>
          </div>
        )}
      </div>

      {/* Path + browse button */}
      <div className="flex gap-2 items-center">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="/works/xxx/cover.jpg"
          className="flex-1 border-b border-[#E2E2DC] bg-transparent pb-1 text-[11px] text-[#7A7A74] focus:outline-none focus:border-[#0000ff] transition-colors"
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="shrink-0 px-4 py-2 text-[11px] border border-[#E2E2DC] hover:border-[#0000ff] hover:text-[#0000ff] transition-colors disabled:opacity-50 whitespace-nowrap"
        >
          瀏覽本地
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />
    </div>
  );
}

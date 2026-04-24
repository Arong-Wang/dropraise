"use client";
import { useState, useEffect } from "react";

interface Contact {
  email: string; instagram: string; instagramHandle: string;
  address: string; hours: string; responseTime: string;
  serviceArea: string; services: string[];
}

export default function ContactAdminPage() {
  const [data, setData] = useState<Contact | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/api/admin/contact").then((r) => r.json()).then(setData);
  }, []);

  const set = (field: keyof Contact, val: string | string[]) =>
    setData((d) => d ? { ...d, [field]: val } : d);

  const updateService = (i: number, val: string) => {
    const next = [...(data?.services ?? [])];
    next[i] = val;
    set("services", next);
  };
  const addService = () => set("services", [...(data?.services ?? []), ""]);
  const removeService = (i: number) => set("services", (data?.services ?? []).filter((_, idx) => idx !== i));

  const save = async () => {
    if (!data) return;
    setSaving(true);
    const res = await fetch("/api/admin/contact", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
    setMsg(res.ok ? "儲存成功 ✓" : "儲存失敗 — 請在本機 npm run dev 執行");
    setTimeout(() => setMsg(""), 4000);
  };

  if (!data) return <div className="p-8 text-[13px] text-[#7A7A74]">載入中...</div>;

  return (
    <div className="p-8 max-w-xl">
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-[20px] font-light text-[#111110] mb-1">聯絡資訊</h1>
          <p className="text-[11px] text-[#7A7A74]">更新聯絡頁面顯示的所有資訊</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {msg && <span className={`text-[11px] ${msg.includes("成功") ? "text-green-600" : "text-red-500"}`}>{msg}</span>}
          <button onClick={save} disabled={saving} className="px-4 py-2 bg-[#0000ff] text-white text-[12px] hover:bg-[#0000cc] disabled:opacity-50 transition-colors">
            {saving ? "儲存中..." : "儲存"}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <F label="Email" value={data.email} onChange={(v) => set("email", v)} />
        <F label="Instagram 連結" value={data.instagram} onChange={(v) => set("instagram", v)} />
        <F label="Instagram 帳號 (@xxx)" value={data.instagramHandle} onChange={(v) => set("instagramHandle", v)} />
        <F label="地址" value={data.address} onChange={(v) => set("address", v)} />
        <F label="服務時間" value={data.hours} onChange={(v) => set("hours", v)} />
        <F label="回覆時間說明" value={data.responseTime} onChange={(v) => set("responseTime", v)} />
        <F label="服務地區（可換行）" value={data.serviceArea} onChange={(v) => set("serviceArea", v)} multiline />

        <div>
          <p className="text-[10px] uppercase tracking-[0.12em] text-[#7A7A74] mb-3">詢問項目選項</p>
          <div className="flex flex-col gap-2">
            {data.services.map((s, i) => (
              <div key={i} className="flex gap-2 items-center">
                <input type="text" value={s} onChange={(e) => updateService(i, e.target.value)}
                  className="flex-1 border-b border-[#E2E2DC] bg-transparent pb-1 text-[13px] text-[#111110] focus:outline-none focus:border-[#0000ff]" />
                <button onClick={() => removeService(i)} className="text-[11px] text-red-400 hover:text-red-600">✕</button>
              </div>
            ))}
          </div>
          <button onClick={addService} className="mt-2 text-[11px] text-[#0000ff] hover:underline">+ 新增選項</button>
        </div>
      </div>
    </div>
  );
}

function F({ label, value, onChange, placeholder, multiline }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; multiline?: boolean }) {
  const base = "w-full border-b border-[#E2E2DC] bg-transparent pb-2 text-[13px] text-[#111110] focus:outline-none focus:border-[#0000ff] transition-colors";
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-[0.1em] text-[#7A7A74] mb-1">{label}</label>
      {multiline ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={3} className={`${base} resize-none`} />
      ) : (
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={base} />
      )}
    </div>
  );
}

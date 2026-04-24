"use client";
import { useState } from "react";
import { useEffect } from "react";

interface Contact {
  email: string; instagram: string; instagramHandle: string;
  address: string; hours: string; responseTime: string;
  serviceArea: string; services: string[];
}

export default function ContactPage() {
  const [contact, setContact] = useState<Contact | null>(null);
  const [form, setForm] = useState({ name: "", email: "", service: "", message: "" });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    fetch("/api/admin/contact").then((r) => r.json()).then(setContact);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const services = contact?.services ?? ["室內設計諮詢", "老屋翻修規劃", "新成屋設計", "商業空間設計", "製造浪漫產品詢問", "其他"];

  return (
    <div>
      <div className="h-28" />

      <section
        className="group px-6 md:px-10 xl:px-16 2xl:px-24 border-t border-[#E2E2DC] hover:bg-[#0000ff] transition-colors duration-500"
        style={{ paddingTop: "112px", paddingBottom: "112px" }}
      >
        <h1 className="display text-[#0000ff] max-w-3xl group-hover:text-white transition-colors duration-500">
          告訴我們，你理想中生活的模樣。
        </h1>
      </section>

      <section
        className="px-6 md:px-10 xl:px-16 2xl:px-24 border-t border-[#E2E2DC]"
        style={{ paddingTop: "144px", paddingBottom: "144px" }}
      >
        <div className="grid md:grid-cols-5 gap-16">

          {/* Form */}
          <div className="md:col-span-3">
            <p className="text-[40px] font-normal tracking-[0.1em] uppercase text-[#0000ff]/40 mb-[80px]">聯絡表單</p>
            {sent ? (
              <div className="flex flex-col gap-6">
                <div className="w-8 h-px bg-[#C8372D]" />
                <h3 className="text-[20px] font-light text-[#0000ff]">訊息已送出</h3>
                <p className="text-[14px] text-[#7A7A74] leading-relaxed">
                  {contact?.responseTime ?? "通常在 1–2 個工作天內回覆，謝謝你的耐心等待。"}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                <div className="grid sm:grid-cols-2 gap-8">
                  <div>
                    <label className="label text-[#0000ff]/40 block mb-3">姓名 *</label>
                    <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full border-b border-[#E2E2DC] bg-transparent pb-3 text-[14px] text-[#0000ff] focus:outline-none focus:border-[#0000ff] transition-colors" placeholder="你的名字" />
                  </div>
                  <div>
                    <label className="label text-[#0000ff]/40 block mb-3">Email *</label>
                    <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full border-b border-[#E2E2DC] bg-transparent pb-3 text-[14px] text-[#0000ff] focus:outline-none focus:border-[#0000ff] transition-colors" placeholder="your@email.com" />
                  </div>
                </div>

                <div>
                  <label className="label text-[#0000ff]/40 block mb-3">詢問項目</label>
                  <select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className="w-full border-b border-[#E2E2DC] bg-transparent pb-3 text-[14px] text-[#0000ff] focus:outline-none focus:border-[#0000ff] transition-colors">
                    <option value="">請選擇</option>
                    {services.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div>
                  <label className="label text-[#0000ff]/40 block mb-3">告訴我你的困擾 *</label>
                  <textarea required rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full border-b border-[#E2E2DC] bg-transparent pb-3 text-[14px] text-[#0000ff] focus:outline-none focus:border-[#0000ff] transition-colors resize-none"
                    placeholder="例如：廚房太小、收納不夠、光線太差……任何讓你不舒服的事" />
                </div>

                <div className="flex justify-end">
                  <button type="submit" className="label px-8 py-4 bg-[#111110] text-white hover:bg-[#C8372D] transition-colors duration-300" style={{ fontSize: "20px" }}>
                    送出訊息
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Info */}
          <div className="md:col-span-2 flex flex-col gap-12">
            <p className="text-[40px] font-normal tracking-[0.1em] uppercase text-[#0000ff]/40">聯絡資訊</p>

            <div className="flex flex-col gap-3">
              <div className="w-8 h-px bg-[#C8372D]" />
              <p className="text-[20px] font-normal text-[#0000ff]">直接聯絡</p>
              <a href={`mailto:${contact?.email ?? "dropraise.co@gmail.com"}`}
                className="text-[14px] text-[#7A7A74] hover:text-[#0000ff] transition-colors">
                {contact?.email ?? "dropraise.co@gmail.com"}
              </a>
            </div>

            <div className="flex flex-col gap-3">
              <div className="w-8 h-px bg-[#0000ff]/30" />
              <p className="text-[20px] font-normal text-[#0000ff]">社群媒體</p>
              <a href={contact?.instagram ?? "#"} target="_blank" rel="noopener noreferrer"
                className="text-[14px] text-[#7A7A74] hover:text-[#0000ff] transition-colors">
                Instagram — {contact?.instagramHandle ?? "@dropraise.co"}
              </a>
            </div>

            <div className="flex flex-col gap-3">
              <div className="w-8 h-px bg-[#E2E2DC]" />
              <p className="text-[20px] font-normal text-[#0000ff]">回覆時間</p>
              <p className="text-[14px] text-[#7A7A74] leading-relaxed">
                {contact?.hours ?? "週一至週五 10:00–18:00"}<br />
                {contact?.responseTime ?? "通常在 1–2 個工作天內回覆"}
              </p>
            </div>

            {contact?.address && (
              <div className="flex flex-col gap-3">
                <div className="w-8 h-px bg-[#E2E2DC]" />
                <p className="text-[20px] font-normal text-[#0000ff]">地址</p>
                <p className="text-[14px] text-[#7A7A74] leading-relaxed">{contact.address}</p>
              </div>
            )}

            {contact?.serviceArea && (
              <div className="flex flex-col gap-3">
                <div className="w-8 h-px bg-[#E2E2DC]" />
                <p className="text-[20px] font-normal text-[#0000ff]">服務地區</p>
                <p className="text-[14px] text-[#7A7A74] leading-relaxed whitespace-pre-line">{contact.serviceArea}</p>
              </div>
            )}
          </div>

        </div>
      </section>
    </div>
  );
}

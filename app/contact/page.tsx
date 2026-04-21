"use client";
import { useState } from "react";

const services = [
  "室內設計諮詢",
  "老屋翻修規劃",
  "新成屋設計",
  "商業空間設計",
  "製造浪漫產品詢問",
  "其他",
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", service: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="pt-20">

      {/* Header */}
      <section className="border-b border-[#E2E2DC]">
        <div className="px-6 md:px-10 xl:px-16 2xl:px-24 pt-20 pb-16">
        <p className="label text-[#7A7A74] mb-6">Contact</p>
        <h1 className="heading-lg mb-8 max-w-xl">
          直接告訴我<br />你的生活困擾
        </h1>
        <p className="text-[15px] text-[#7A7A74] leading-relaxed max-w-md">
          不用準備什麼，就說你住的地方讓你覺得不舒服的事。
          我們從問題開始聊。
        </p>
        </div>
      </section>

      <section className="px-6 md:px-10 py-20">
        
        <div className="grid md:grid-cols-5 gap-16">

          {/* Form — 佔 3 欄 */}
          <div className="md:col-span-3">
            {sent ? (
              <div className="py-20 flex flex-col items-start gap-4">
                <div className="w-6 h-px bg-[#C8372D]" />
                <h3 className="text-[22px] font-light">訊息已送出</h3>
                <p className="text-[13px] text-[#7A7A74]">通常在 1–2 個工作天內回覆，謝謝你的耐心等待。</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="label text-[#7A7A74] block mb-3">姓名 *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full border-b border-[#E2E2DC] bg-transparent pb-3 text-[14px] focus:outline-none focus:border-[#111110] transition-colors"
                      placeholder="你的名字"
                    />
                  </div>
                  <div>
                    <label className="label text-[#7A7A74] block mb-3">Email *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full border-b border-[#E2E2DC] bg-transparent pb-3 text-[14px] focus:outline-none focus:border-[#111110] transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="label text-[#7A7A74] block mb-3">詢問項目</label>
                  <select
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className="w-full border-b border-[#E2E2DC] bg-transparent pb-3 text-[14px] focus:outline-none focus:border-[#111110] transition-colors"
                  >
                    <option value="">請選擇</option>
                    {services.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div>
                  <label className="label text-[#7A7A74] block mb-3">告訴我你的困擾 *</label>
                  <textarea
                    required
                    rows={6}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full border-b border-[#E2E2DC] bg-transparent pb-3 text-[14px] focus:outline-none focus:border-[#111110] transition-colors resize-none"
                    placeholder="例如：廚房太小、收納不夠、光線太差……任何讓你不舒服的事"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="label px-8 py-4 bg-[#111110] text-white hover:bg-[#C8372D] transition-colors duration-300"
                  >
                    送出訊息
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Info — 佔 2 欄 */}
          <div className="md:col-span-2 flex flex-col gap-10">
            <div>
              <div className="w-6 h-px bg-[#C8372D] mb-6" />
              <p className="label text-[#7A7A74] mb-4">直接聯絡</p>
              <a href="mailto:joe092777@gmail.com" className="text-[14px] hover:text-[#C8372D] transition-colors">
                joe092777@gmail.com
              </a>
            </div>

            <div>
              <div className="w-6 h-px bg-[#2B4C8C] mb-6" />
              <p className="label text-[#7A7A74] mb-4">社群媒體</p>
              <div className="flex flex-col gap-3">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[14px] text-[#7A7A74] hover:text-[#111110] transition-colors">
                  Instagram — @dropraise
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-[14px] text-[#7A7A74] hover:text-[#111110] transition-colors">
                  YouTube — 製造浪漫
                </a>
              </div>
            </div>

            <div>
              <div className="w-6 h-px bg-[#E2E2DC] mb-6" />
              <p className="label text-[#7A7A74] mb-4">回覆時間</p>
              <p className="text-[13px] text-[#7A7A74] leading-relaxed">
                週一至週五 10:00–18:00<br />
                通常在 1–2 個工作天內回覆
              </p>
            </div>

            <div className="bg-[#F0EFEB] px-6 py-8">
              <p className="label text-[#7A7A74] mb-3">服務地區</p>
              <p className="text-[13px] text-[#7A7A74] leading-relaxed">
                主要服務台北市及新北市。<br />
                其他地區視案件性質安排。
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import Link from "next/link";

const services = [
  {
    category: "住家空間",
    title: "住宅室內設計及施工",
    desc: "從格局規劃、材質選配到全案施工監管，打造符合你生活方式的居家空間。",
    href: "/interior/huang-residence",
  },
  {
    category: "辦公室・店面・工作室",
    title: "商業室內設計及施工",
    desc: "將品牌氛圍轉化為空間語言，兼顧使用效率與視覺識別，打造令人印象深刻的商業環境。",
    href: "/interior/koki-studio",
  },
];

const steps = [
  {
    num: "01",
    title: "初次諮詢",
    desc: "了解屋況、坪數、預算與家庭生活習慣，取得圖面後約定後續會議時間。",
  },
  {
    num: "02",
    title: "風格平面配置",
    desc: "確認空間尺度與動線安排，討論設計風格方向、造型與色系。",
  },
  {
    num: "03",
    title: "3D 渲染模擬",
    desc: "將設計方案具現化為視覺圖，大坪數可分公共／私人領域兩階段確認。",
  },
  {
    num: "04",
    title: "選材確認",
    desc: "提供各空間建議材質樣品與色卡，比較性能後完成材質記錄表。",
  },
  {
    num: "05",
    title: "施工圖與報價",
    desc: "完稿施工圖逐項說明，確認細項單價與總造價後進入施工階段。",
  },
  {
    num: "06",
    title: "完工保固",
    desc: "全程工程管理監工，完工後逐一驗收，提供兩年保固服務。",
  },
];

const reasons = [
  {
    title: "設計及專案管理雙證",
    desc: "兼具美學與執行力，從設計到落地一手掌握。\n\n內政部登記：內營室技字第40EC032194號\n專業設計／施工技術人員",
  },
  {
    title: "導入 BIM 設計",
    desc: "三維建模提前模擬空間，減少施工期間的變更與誤差。",
  },
  {
    title: "10 年以上工程經驗",
    desc: "豐富的施工現場經驗，熟悉各類工法與材質細節。",
  },
  {
    title: "超越業界兩年保固",
    desc: "業界標準為一年，我們提供兩年保固，讓你住得安心。",
  },
];

export default function AboutPage() {
  return (
    <div>
      <div className="h-28" />

      {/* Header */}
      <section className="group px-6 md:px-10 xl:px-16 2xl:px-24 border-t border-[#E2E2DC] flex flex-col items-center text-center hover:bg-[#0000ff] transition-colors duration-500" style={{paddingTop: '112px', paddingBottom: '112px'}}>
        <h1 className="display text-[#0000ff] max-w-3xl group-hover:text-white transition-colors duration-500">
          讓未來的生活，在此具現。
        </h1>
        <p className="text-[#0000ff]/50 max-w-3xl mt-6 group-hover:text-white/60 transition-colors duration-500 font-light leading-relaxed" style={{fontSize: '24px'}}>
          ── 室內設計不只是裝修，更是探索生活可能性的過程。
        </p>
      </section>

      {/* Services */}
      <section className="px-6 md:px-10 xl:px-16 2xl:px-24 border-t border-[#E2E2DC]" style={{paddingTop: '144px', paddingBottom: '144px'}}>
        <p className="text-[40px] font-normal tracking-[0.1em] uppercase text-[#0000ff]/40 mb-[80px]">Services</p>
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((s) => (
            <Link key={s.title} href={s.href} className="group border border-[#E2E2DC] p-12 flex flex-col gap-8 hover:bg-[#0000ff] transition-colors duration-500">
              <p className="label text-[#0000ff]/40 group-hover:text-white/60 transition-colors duration-500">{s.category}</p>
              <div className="flex flex-col gap-5">
                <h2 className="text-[20px] font-light tracking-tight text-[#0000ff] group-hover:text-white transition-colors duration-500">
                  {s.title}
                </h2>
                <p className="text-[14px] text-[#7A7A74] leading-relaxed group-hover:text-white/70 transition-colors duration-500">{s.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* How We Work */}
      <section className="px-6 md:px-10 xl:px-16 2xl:px-24 border-t border-[#E2E2DC]" style={{paddingTop: '144px', paddingBottom: '144px'}}>
        <p className="text-[40px] font-normal tracking-[0.1em] uppercase text-[#0000ff]/40 mb-[80px]">How We Work</p>
        <div className="grid md:grid-cols-3 gap-x-14 gap-y-16">
          {steps.map((s) => (
            <div key={s.num} className="flex flex-col">
              <span className="text-[5rem] font-light leading-none tracking-tight text-[#0000ff]/10 select-none mb-6">
                {s.num}
              </span>
              <h3 className="text-[20px] font-normal tracking-tight text-[#0000ff] mb-4">
                {s.title}
              </h3>
              <p className="text-[14px] text-[#7A7A74] leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="px-6 md:px-10 xl:px-16 2xl:px-24 border-t border-[#E2E2DC]" style={{paddingTop: '144px', paddingBottom: '144px'}}>
        <p className="text-[40px] font-normal tracking-[0.1em] uppercase text-[#0000ff]/40 mb-[80px]">Why Choose Us</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((r, i) => (
            <div key={i} className="group hover:bg-[#0000ff] transition-colors duration-500" style={{border: '1px solid #E2E2DC', padding: '48px', display: 'flex', flexDirection: 'column', gap: '24px'}}>
              <div className="w-8 h-px bg-[#C8372D] group-hover:bg-white transition-colors duration-500" />
              <h3 className="text-[20px] font-normal tracking-tight text-[#0000ff] group-hover:text-white transition-colors duration-500">
                {r.title}
              </h3>
              <p className="text-[14px] leading-relaxed text-[#111110] group-hover:text-white/70 transition-colors duration-500 whitespace-pre-line">{r.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-10 xl:px-16 2xl:px-24 py-24 border-t border-[#E2E2DC]">
        <p className="text-[20px] text-[#0000ff] mb-10 max-w-md leading-relaxed">
          有想改造的空間嗎？歡迎預約免費諮詢，我們先聊聊你的需求。
        </p>
        <div className="flex justify-end">
          <Link
            href="https://www.instagram.com/dropraise.co"
            target="_blank"
            rel="noopener noreferrer"
            className="label px-8 py-4 bg-[#111110] text-white hover:bg-[#C8372D] transition-colors duration-300 inline-block"
            style={{fontSize: '20px'}}
          >
            預約免費諮詢
          </Link>
        </div>
      </section>
    </div>
  );
}

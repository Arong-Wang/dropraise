import Link from "next/link";

const timeline = [
  { year: "2010+", event: "開始 DIY 生涯，累積超過 10 年動手做的經驗" },
  { year: "2022", event: "取得室內設計專業證照" },
  { year: "2024", event: "創立室內設計工作室，服務台北客戶" },
  { year: "2025", event: "創立家具品牌「製造浪漫」，用設計解決生活問題" },
  { year: "2026", event: "持續擴充作品集，探索更多材質與工藝可能性" },
];

export default function AboutPage() {
  return (
    <div className="pt-20">

      {/* Header */}
      <section className="border-b border-[#E2E2DC]">
        <div className="px-6 md:px-10 xl:px-16 2xl:px-24 pt-20 pb-16">
        <p className="label text-[#7A7A74] mb-6">About</p>
        <h1 className="heading-lg mb-8 max-w-xl">
          Wang Yao-rong<br />
          <span className="text-[#7A7A74]">Arong</span>
        </h1>
        <p className="text-[15px] text-[#7A7A74] leading-relaxed max-w-md">
          室內設計師、品牌創辦人。
          相信「解決問題本身就是美學」。
        </p>
        </div>
      </section>

      {/* Profile */}
      <section className="border-b border-[#E2E2DC]">
        <div className="px-6 md:px-10 xl:px-16 2xl:px-24 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div className="bg-[#EDECEA] aspect-[3/4] flex items-center justify-center">
            <span className="label text-[#7A7A74]">個人照片</span>
          </div>

          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-5">
              <div className="w-6 h-px bg-[#C8372D]" />
              <p className="text-[15px] text-[#7A7A74] leading-loose">
                我叫 Arong，台北的室內設計師。
              </p>
              <p className="text-[15px] text-[#7A7A74] leading-loose">
                超過 10 年的 DIY 經驗告訴我一件事：大部分的空間問題，
                都不是「沒有預算」，而是「沒有想清楚要解決什麼問題」。
              </p>
              <p className="text-[15px] text-[#7A7A74] leading-loose">
                我拿到室內設計證照之後，開始正式幫客戶改造空間。
                我的起點永遠是：「你現在的生活，有什麼讓你覺得不舒服？」
              </p>
              <p className="text-[15px] text-[#7A7A74] leading-loose">
                後來我創立了「製造浪漫」，想做的事情一樣：
                用設計解決生活問題。只是這次的載體是家具，不是空間。
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[#E2E2DC]">
              {[
                { num: "10+", label: "年 DIY 經驗" },
                { num: "2+", label: "年創業歷程" },
                { num: "2", label: "個品牌事業" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-4xl font-light tracking-tight mb-1">{s.num}</div>
                  <div className="label text-[#7A7A74]">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="border-b border-[#E2E2DC]">
        <div className="px-6 md:px-10 xl:px-16 2xl:px-24 py-20">
        <p className="label text-[#7A7A74] mb-12">時間軸</p>
        <div className="flex flex-col max-w-2xl">
          {timeline.map((item, i) => (
            <div key={i} className="flex gap-8 pb-8 relative">
              <div className="flex flex-col items-center pt-1">
                <div className="w-1.5 h-1.5 rounded-full bg-[#C8372D] shrink-0" />
                {i < timeline.length - 1 && <div className="w-px flex-1 bg-[#E2E2DC] mt-2" />}
              </div>
              <div className="pb-4">
                <span className="label text-[#7A7A74] mb-2 block">{item.year}</span>
                <p className="text-[14px] leading-relaxed">{item.event}</p>
              </div>
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-10 py-16">
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/contact"
            className="label px-8 py-4 bg-[#111110] text-white hover:bg-[#C8372D] transition-colors duration-300"
          >
            和 Arong 聊聊
          </Link>
          <Link
            href="/interior"
            className="label px-8 py-4 border border-[#E2E2DC] text-[#111110] hover:border-[#111110] transition-colors duration-300"
          >
            查看設計作品
          </Link>
        </div>
      </section>
    </div>
  );
}

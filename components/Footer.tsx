import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#E2E2DC] mt-auto">
      <div className="px-6 md:px-10 xl:px-16 2xl:px-24 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[13px] font-medium tracking-[0.06em] uppercase">Dropraise</span>
              <span className="w-1 h-1 rounded-full bg-[#C8372D]" />
            </div>
            <p className="text-[13px] text-[#7A7A74] leading-relaxed">
              幫你解決生活問題的設計顧問<br />
              台北 · 室內設計 · 家具品牌
            </p>
          </div>

          {/* Work */}
          <div>
            <p className="label text-[#111110] mb-5">服務</p>
            <div className="flex flex-col gap-3">
              <Link href="/interior" className="text-[13px] text-[#7A7A74] hover:text-[#111110] transition-colors">室內設計</Link>
              <Link href="/mbr" className="text-[13px] text-[#7A7A74] hover:text-[#111110] transition-colors">製造浪漫</Link>
            </div>
          </div>

          {/* Studio */}
          <div>
            <p className="label text-[#111110] mb-5">關於</p>
            <div className="flex flex-col gap-3">
              <Link href="/about" className="text-[13px] text-[#7A7A74] hover:text-[#111110] transition-colors">關於 Arong</Link>
              <Link href="/contact" className="text-[13px] text-[#7A7A74] hover:text-[#111110] transition-colors">聯絡我</Link>
            </div>
          </div>

          {/* Follow */}
          <div>
            <p className="label text-[#111110] mb-5">追蹤</p>
            <div className="flex flex-col gap-3">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[13px] text-[#7A7A74] hover:text-[#111110] transition-colors">Instagram</a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-[13px] text-[#7A7A74] hover:text-[#111110] transition-colors">YouTube</a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-6 border-t border-[#E2E2DC] flex flex-col sm:flex-row justify-between gap-2">
          <p className="label text-[#7A7A74]">© 2026 Dropraise — Wang Yao-rong</p>
          <p className="label text-[#7A7A74]">dropraise.co</p>
        </div>
      </div>
    </footer>
  );
}

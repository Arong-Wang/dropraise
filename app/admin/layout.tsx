"use client";
import Link from "next/link";
import { useState } from "react";

const navItems = [
  { href: "/admin", label: "總覽" },
  { href: "/admin/hero", label: "首頁輪播" },
  { href: "/admin/works", label: "作品列表" },
  { label: "── 專案詳細頁", disabled: true },
  { href: "/admin/project/huang-residence", label: "花園新城黃宅" },
  { href: "/admin/project/lin-residence", label: "林宅" },
  { href: "/admin/project/koki-studio", label: "KOKI STUDIO" },
  { href: "/admin/project/liang-residence", label: "梁宅" },
  { label: "──────", disabled: true },
  { href: "/admin/contact", label: "聯絡資訊" },
  { href: "/admin/blog", label: "Blog 文章" },
];

type DeployState = "idle" | "loading" | "success" | "error";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [deployState, setDeployState] = useState<DeployState>("idle");
  const [deployMsg, setDeployMsg] = useState("");

  const handleDeploy = async () => {
    setDeployState("loading");
    setDeployMsg("");
    try {
      const res = await fetch("/api/admin/deploy", { method: "POST" });
      const data = await res.json();
      if (res.ok && data.ok) {
        setDeployState("success");
        setDeployMsg(data.message);
      } else {
        setDeployState("error");
        setDeployMsg(data.error ?? "部署失敗");
      }
    } catch {
      setDeployState("error");
      setDeployMsg("網路錯誤，請重試");
    }
    setTimeout(() => {
      setDeployState("idle");
      setDeployMsg("");
    }, 8000);
  };

  return (
    <div className="fixed inset-0 flex bg-[#F8F7F5] z-[100]">
      {/* Sidebar */}
      <aside className="w-52 shrink-0 bg-[#111110] flex flex-col overflow-y-auto">
        <div className="px-5 py-7 border-b border-white/10">
          <p className="text-[9px] tracking-[0.2em] uppercase text-white/30 mb-1">Dropraise</p>
          <p className="text-[14px] font-light text-white tracking-wide">管理後台</p>
        </div>

        <nav className="flex-1 px-3 py-5 flex flex-col gap-0.5">
          {navItems.map((item, i) =>
            item.disabled ? (
              <p key={i} className="px-3 pt-4 pb-1 text-[10px] text-white/20 tracking-[0.12em]">
                {item.label}
              </p>
            ) : (
              <Link
                key={item.href}
                href={item.href!}
                className="px-3 py-2 text-[12px] text-white/50 hover:text-white hover:bg-white/6 rounded-sm transition-colors"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        {/* Deploy section */}
        <div className="px-3 py-5 border-t border-white/10 flex flex-col gap-3">
          <button
            onClick={handleDeploy}
            disabled={deployState === "loading"}
            className={`w-full py-3 text-[12px] font-medium tracking-wide transition-colors ${
              deployState === "loading"
                ? "bg-white/10 text-white/40 cursor-not-allowed"
                : deployState === "success"
                ? "bg-green-600 text-white"
                : deployState === "error"
                ? "bg-red-600/80 text-white"
                : "bg-[#0000ff] text-white hover:bg-[#0000cc]"
            }`}
          >
            {deployState === "loading"
              ? "部署中..."
              : deployState === "success"
              ? "已推送 ✓"
              : deployState === "error"
              ? "部署失敗 ✕"
              : "部署上線"}
          </button>

          {deployMsg && (
            <p className={`text-[10px] leading-relaxed px-1 ${
              deployState === "error" ? "text-red-400" : "text-white/50"
            }`}>
              {deployMsg}
            </p>
          )}

          <Link
            href="/"
            className="px-3 py-2 text-[11px] text-white/30 hover:text-white/60 block transition-colors text-center"
          >
            ← 返回網站
          </Link>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}

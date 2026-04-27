import { NextResponse } from "next/server";
import { execSync } from "child_process";

export const dynamic = "force-dynamic";

export async function POST() {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { error: "只在本機開發模式使用" },
      { status: 403 }
    );
  }

  try {
    const cwd = process.cwd();

    const status = execSync("git status --porcelain data/ public/", { cwd })
      .toString()
      .trim();

    let committed = false;
    if (status) {
      execSync("git add data/ public/", { cwd });
      const ts = new Date()
        .toLocaleString("zh-TW", { timeZone: "Asia/Taipei" })
        .replace(/\//g, "-");
      execSync(`git commit -m "Update content ${ts}"`, { cwd });
      committed = true;
    }

    execSync("git push origin main", { cwd, timeout: 30000 });

    return NextResponse.json({
      ok: true,
      committed,
      message: committed
        ? "內容已推送，Vercel 部署中（約 1-2 分鐘）"
        : "推送成功（無新變更），Vercel 部署中",
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

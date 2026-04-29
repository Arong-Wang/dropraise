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

    // 1. 偵測並提交 data/ public/ content/ 的變更
    const status = execSync("git status --porcelain data/ public/ content/", { cwd })
      .toString()
      .trim();

    let committed = false;
    if (status) {
      execSync("git add data/ public/ content/", { cwd });
      const ts = new Date().toLocaleString("zh-TW", { timeZone: "Asia/Taipei" });
      execSync(`git commit -m "Update content ${ts}"`, { cwd });
      committed = true;
    }

    // 2. git push（同步 GitHub）
    try {
      execSync("git push origin main", { cwd, timeout: 30000 });
    } catch {
      // push 失敗不中斷，繼續用 vercel 直接部署
    }

    // 3. vercel --prod 直接部署（不依賴 GitHub webhook）
    const vercelCmd =
      process.platform === "win32"
        ? `"${process.env.APPDATA}\\npm\\vercel.cmd"`
        : "vercel";
    execSync(`${vercelCmd} deploy --prod --yes`, {
      cwd,
      timeout: 120000,
      env: { ...process.env },
    });

    return NextResponse.json({
      ok: true,
      committed,
      message: committed
        ? "內容已提交並部署，Vercel 上線中（約 30 秒）"
        : "已觸發 Vercel 部署（無新內容變更）",
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

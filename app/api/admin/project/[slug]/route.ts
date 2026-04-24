import { NextRequest, NextResponse } from "next/server";
import { getProject, writeJson } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  try {
    return NextResponse.json(getProject(slug));
  } catch {
    return NextResponse.json({ error: "找不到專案" }, { status: 404 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  try {
    const data = await request.json();
    writeJson(`projects/${slug}.json`, data);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "寫入失敗（請確認在本機開發模式執行）" }, { status: 500 });
  }
}

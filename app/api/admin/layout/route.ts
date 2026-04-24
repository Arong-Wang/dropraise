import { NextRequest, NextResponse } from "next/server";
import { getLayout, writeJson } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return NextResponse.json(getLayout());
  } catch {
    return NextResponse.json({ error: "讀取失敗" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    writeJson("layout.json", data);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "寫入失敗（請確認在本機 npm run dev 執行）" },
      { status: 500 }
    );
  }
}

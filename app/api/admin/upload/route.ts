import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const folder = (formData.get("folder") as string) || "uploads";

    if (!file) {
      return NextResponse.json({ error: "未收到檔案" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const destDir = path.join(process.cwd(), "public", folder);

    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    const filename = file.name;
    fs.writeFileSync(path.join(destDir, filename), buffer);

    return NextResponse.json({ path: `/${folder}/${filename}` });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "上傳失敗（請確認在本機 npm run dev 執行）" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export const dynamic = "force-dynamic";

const postsDir = path.join(process.cwd(), "content/blog");

export async function GET() {
  try {
    const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));
    const posts = files
      .map((file) => {
        const { data } = matter(fs.readFileSync(path.join(postsDir, file), "utf-8"));
        const slug = file.replace(/^\d{4}-\d{2}-\d{2}_/, "").replace(/\.md$/, "");
        const date = data.date instanceof Date
          ? data.date.toISOString().split("T")[0]
          : String(data.date ?? "");
        return { slug, filename: file, title: data.title ?? "", date, category: data.category ?? "", excerpt: data.excerpt ?? "", coverImage: data.coverImage ?? "" };
      })
      .sort((a, b) => (a.date < b.date ? 1 : -1));
    return NextResponse.json(posts);
  } catch {
    return NextResponse.json({ error: "讀取失敗" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { slug, title, date, category, coverImage, excerpt, content } = await request.json();
    if (!slug || !date) return NextResponse.json({ error: "slug 與 date 為必填" }, { status: 400 });
    const filename = `${date}_${slug}.md`;
    const fileContent = matter.stringify(content ?? "", { title, date, category, coverImage, excerpt });
    fs.writeFileSync(path.join(postsDir, filename), fileContent, "utf-8");
    return NextResponse.json({ ok: true, slug });
  } catch {
    return NextResponse.json({ error: "建立失敗" }, { status: 500 });
  }
}

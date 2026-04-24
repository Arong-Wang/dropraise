import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export const dynamic = "force-dynamic";

const postsDir = path.join(process.cwd(), "content/blog");

function findFile(slug: string): string | null {
  if (!fs.existsSync(postsDir)) return null;
  return (
    fs.readdirSync(postsDir).find(
      (f) => f.endsWith(`_${slug}.md`) || f === `${slug}.md`
    ) ?? null
  );
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const filename = findFile(slug);
  if (!filename) return NextResponse.json({ error: "找不到文章" }, { status: 404 });

  const { data, content } = matter(fs.readFileSync(path.join(postsDir, filename), "utf-8"));
  const date = data.date instanceof Date
    ? data.date.toISOString().split("T")[0]
    : String(data.date ?? "");
  return NextResponse.json({ slug, filename, title: data.title ?? "", date, category: data.category ?? "", coverImage: data.coverImage ?? "", excerpt: data.excerpt ?? "", content });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const filename = findFile(slug);
  if (!filename) return NextResponse.json({ error: "找不到文章" }, { status: 404 });

  const { title, date, category, coverImage, excerpt, content } = await request.json();
  const fileContent = matter.stringify(content ?? "", { title, date, category, coverImage, excerpt });
  fs.writeFileSync(path.join(postsDir, filename), fileContent, "utf-8");
  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const filename = findFile(slug);
  if (!filename) return NextResponse.json({ error: "找不到文章" }, { status: 404 });

  fs.unlinkSync(path.join(postsDir, filename));
  return NextResponse.json({ ok: true });
}

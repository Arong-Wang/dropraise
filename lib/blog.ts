import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const postsDirectory = path.join(process.cwd(), "content/blog");

export interface Post {
  slug: string;
  title: string;
  date: string;
  category: string;
  coverImage: string;
  excerpt: string;
  content?: string;
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) return [];

  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((f) => f.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/^\d{4}-\d{2}-\d{2}_/, "").replace(/\.md$/, "");
      const { data } = matter(fs.readFileSync(path.join(postsDirectory, fileName), "utf8"));
      return {
        slug,
        title: data.title ?? "",
        date: data.date instanceof Date ? data.date.toISOString().split("T")[0] : String(data.date ?? ""),
        category: data.category ?? "",
        coverImage: data.coverImage ?? "",
        excerpt: data.excerpt ?? "",
      } as Post;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (!fs.existsSync(postsDirectory)) return null;

  const fileNames = fs.readdirSync(postsDirectory);
  const fileName = fileNames.find(
    (f) => f.endsWith(`_${slug}.md`) || f === `${slug}.md`
  );
  if (!fileName) return null;

  const { data, content } = matter(
    fs.readFileSync(path.join(postsDirectory, fileName), "utf8")
  );

  return {
    slug,
    title: data.title ?? "",
    date: data.date instanceof Date ? data.date.toISOString().split("T")[0] : String(data.date ?? ""),
    category: data.category ?? "",
    coverImage: data.coverImage ?? "",
    excerpt: data.excerpt ?? "",
    content: String(await marked.parse(content)),
  };
}

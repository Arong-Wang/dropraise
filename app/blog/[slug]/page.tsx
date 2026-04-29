import Image from "next/image";
import Link from "next/link";
import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return { title: `${post.title} — Dropraise`, description: post.excerpt };
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <div>
      <div className="h-28" />

      <article className="border-t border-[#E2E2DC]">
        <div className="blog-px py-16">
          <Link
            href="/blog"
            className="label text-[#0000ff]/40 hover:text-[#0000ff] transition-colors mb-12 inline-block"
          >
            ← Blog
          </Link>

          <header className="mb-12 max-w-[900px]">
            <p className="label text-[#0000ff]/40 mb-4">{post.category}</p>
            <h1 className="display text-[#0000ff] mb-6">{post.title}</h1>
            <p className="label text-[#0000ff]/30">{post.date}</p>
          </header>
        </div>

        {post.coverImage && (
          <div className="blog-px mb-16">
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}

        <div className="blog-px pb-24">
          <div
            className="prose-blog max-w-[900px]"
            dangerouslySetInnerHTML={{ __html: post.content ?? "" }}
          />
        </div>
      </article>

      <div className="border-t border-[#E2E2DC] blog-px py-10">
        <Link
          href="/blog"
          className="label text-[#0000ff]/40 hover:text-[#0000ff] transition-colors"
        >
          ← 回 Blog 列表
        </Link>
      </div>
    </div>
  );
}

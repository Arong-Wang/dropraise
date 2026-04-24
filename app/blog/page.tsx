import Image from "next/image";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata = {
  title: "Blog — Dropraise",
  description: "設計觀點、選材指南、品牌故事",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div>
      <div className="h-28" />

      <section className="px-6 md:px-10 xl:px-16 2xl:px-24 py-16 border-t border-[#E2E2DC]">
        <p className="label text-[#0000ff]/40 mb-3">設計觀點 / 品牌故事</p>
        <h1 className="display text-[#0000ff]">Blog</h1>
      </section>

      <section className="px-6 md:px-10 xl:px-16 2xl:px-24 pb-24">
        <div className="flex flex-col gap-0">
          {posts.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className={`group py-10 flex flex-col md:flex-row gap-8 md:gap-16 md:items-center ${
                i < posts.length - 1 ? "border-b border-[#E2E2DC]" : ""
              }`}
            >
              {/* Text */}
              <div className="flex flex-col gap-5 flex-1">
                <p className="label text-[#0000ff]/40">{post.category}</p>
                <h2 className="text-[22px] font-light leading-snug tracking-tight text-[#0000ff]/60 group-hover:text-[#0000ff] transition-colors duration-300">
                  {post.title}
                </h2>
                <p className="text-[15px] text-[#7A7A74] leading-relaxed">
                  {post.excerpt}
                </p>
                <p className="label text-[#0000ff]/30">{post.date}</p>
              </div>

              {/* Image */}
              <div className="w-full md:w-[480px] aspect-[4/3] shrink-0 overflow-hidden relative bg-[#EDECEA]">
                {post.coverImage ? (
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-500"
                  />
                ) : (
                  <div className="w-full h-full" />
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

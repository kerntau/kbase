import React from "react";
import Link from "next/link";
import { posts } from "#content";

export default function HomePage() {
  // 提取去重后的分类
  const categories = Array.from(new Set(posts.map((p) => p.category).filter(Boolean)));
  
  // 按日期降序排列最近的文章
  const recentPosts = [...posts]
    .sort((a, b) => {
      const dateA = a.date ? new Date(a.date).getTime() : 0;
      const dateB = b.date ? new Date(b.date).getTime() : 0;
      return dateB - dateA;
    })
    .slice(0, 5);

  return (
    <div className="flex flex-col gap-12 py-6 select-text">
      {/* 卷首语区 */}
      <section className="flex flex-col gap-4 border-b border-divider pb-8 animate-fade-in">
        <h1 className="font-serif text-3xl md:text-4xl tracking-tight font-normal text-zinc-900 dark:text-zinc-50">
          Digital Knowledge Base
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-serif italic text-base max-w-2xl">
          A minimalist digital space dedicated to documenting learning milestones, code patterns, security logs, and architectural thoughts. Designed around clarity, breathing room, and paper-like typographic reading experience.
        </p>
      </section>

      {/* 分类指引 */}
      {categories.length > 0 && (
        <section className="flex flex-col gap-4">
          <h2 className="text-xs font-semibold tracking-wider text-zinc-400 dark:text-zinc-500 uppercase">
            Categories
          </h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <span
                key={category}
                className="text-xs font-medium tracking-tight px-3 py-1 border border-divider text-zinc-600 dark:text-zinc-400 bg-zinc-50/50 dark:bg-zinc-900/10"
              >
                {category}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* 最近沉淀笔记 */}
      <section className="flex flex-col gap-6">
        <h2 className="text-xs font-semibold tracking-wider text-zinc-400 dark:text-zinc-500 uppercase border-b border-divider/50 pb-2">
          Recent Documents
        </h2>
        
        {recentPosts.length === 0 ? (
          <p className="text-sm text-zinc-400 dark:text-zinc-600 italic">
            No documents available yet. Create markdown files in content/ directory.
          </p>
        ) : (
          <div className="flex flex-col divider-y">
            {recentPosts.map((post) => (
              <article
                key={post.permalink}
                className="py-5 flex flex-col gap-2 group border-b border-divider/40 last:border-0"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <Link
                    href={post.permalink}
                    className="font-serif text-lg text-zinc-900 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-300 border-b border-transparent hover:border-zinc-400 transition-all leading-tight"
                  >
                    {post.title}
                  </Link>
                  {post.date && (
                    <time className="text-xs text-zinc-400 dark:text-zinc-500 font-mono">
                      {post.date.split("T")[0]}
                    </time>
                  )}
                </div>
                {post.description && (
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-2xl leading-relaxed">
                    {post.description}
                  </p>
                )}
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

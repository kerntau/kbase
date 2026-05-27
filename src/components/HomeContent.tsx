"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Post } from "#content";

interface HomeContentProps {
  posts: Post[];
  categories: string[];
  categoryMap: Record<string, string>;
}

export default function HomeContent({ posts, categories, categoryMap }: HomeContentProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // 按日期降序排列
  const sortedPosts = [...posts].sort((a, b) => {
    const getTime = (dateStr?: string) => {
      if (!dateStr) return 0;
      const time = new Date(dateStr).getTime();
      return isNaN(time) ? 0 : time;
    };
    return getTime(b.date) - getTime(a.date);
  });

  // 按当前分类过滤
  const displayPosts = activeCategory
    ? sortedPosts.filter((p) => p.category === activeCategory)
    : sortedPosts;

  return (
    <div className="flex flex-col gap-8 py-4 select-text animate-fade-in">
      {/* 卷首语区 */}
      <section className="flex flex-col gap-4 border-b border-divider pb-6">
        <h1 className="font-serif text-3xl md:text-4xl tracking-tight font-normal text-foreground">
          序栈
        </h1>
        <div className="flex flex-col gap-2 text-foreground/75 leading-[1.8] font-serif italic text-[0.95rem] md:text-[0.98rem] max-w-2xl">
          <p>这里不是大而全的百科，而是一块纯粹的数字自留地。</p>
          <p>我在这里记录从底层系统、网络安全到全栈架构的真实推演。</p>
          <p>去除互联网的浮躁噪音，只留白纸黑字的思考与代码沉淀。</p>
        </div>
        <div className="flex items-center gap-3 mt-1 text-xs text-foreground/45">
          <span>{posts.length} 篇文档</span>
          {categories.length > 0 && (
            <>
              <span className="select-none text-divider">·</span>
              <span>{categories.length} 个分类</span>
            </>
          )}
        </div>
      </section>

      {/* 分类过滤区 */}
      {categories.length > 0 && (
        <section className="flex flex-col gap-2.5">
          <h2 className="text-[10px] font-semibold tracking-wider text-foreground/40 uppercase">
            Categories
          </h2>
          <div className="flex flex-nowrap md:flex-wrap gap-2 overflow-x-auto hide-scrollbar pb-1 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0">
            <button
              onClick={() => setActiveCategory(null)}
              className={`text-xs font-medium px-3 py-1.5 border transition-all duration-150 focus:outline-none cursor-pointer rounded-sm ${
                activeCategory === null
                  ? "border-foreground bg-foreground text-background"
                  : "border-divider text-foreground/50 hover:border-foreground/40 hover:text-foreground bg-transparent"
              }`}
            >
              All ({posts.length})
            </button>
            {categories.map((category) => {
              const count = posts.filter((p) => p.category === category).length;
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() =>
                    setActiveCategory(isActive ? null : category)
                  }
                  className={`text-xs font-medium px-3 py-1.5 border transition-all duration-150 focus:outline-none cursor-pointer rounded-sm ${
                    isActive
                      ? "border-foreground bg-foreground text-background"
                      : "border-divider text-foreground/50 hover:border-foreground/40 hover:text-foreground bg-transparent"
                  }`}
                >
                  {categoryMap[category] || category} ({count})
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* 文章列表 */}
      <section className="flex flex-col gap-4">
        <h2 className="text-[10px] font-semibold tracking-wider text-foreground/40 uppercase border-b border-divider/50 pb-2">
          {activeCategory ? `${categoryMap[activeCategory] || activeCategory} — ${displayPosts.length} 篇文档` : "Recent Documents"}
        </h2>

        {displayPosts.length === 0 ? (
          <p className="text-sm text-foreground/40 italic py-4">
            No documents in this category yet.
          </p>
        ) : (
          <div className="flex flex-col">
            {displayPosts.map((post) => (
              <article
                key={post.permalink}
                className="py-4.5 flex flex-col gap-1.5 group border-b border-divider/40 last:border-0"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <Link
                    href={post.permalink}
                    className="font-serif text-lg text-foreground hover:text-foreground/75 border-b border-transparent hover:border-foreground/30 transition-all duration-150 leading-tight"
                  >
                    {post.title}
                  </Link>
                  <div className="flex items-center gap-3 shrink-0">
                    {post.category && (
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-foreground/45">
                        {categoryMap[post.category] || post.category}
                      </span>
                    )}
                    {post.date && (
                      <time className="text-xs text-foreground/45 font-mono">
                        {post.date.split("T")[0]}
                      </time>
                    )}
                  </div>
                </div>
                {post.description && (
                  <p className="text-sm text-foreground/60 max-w-2xl leading-relaxed">
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

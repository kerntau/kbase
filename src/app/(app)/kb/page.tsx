"use client";

import React, { useState } from "react";
import Link from "next/link";
import { posts } from "#content";

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categoryMap: Record<string, string> = {
    frontend: "前端技术",
    backend: "后端架构",
    devops: "运维交付",
    database: "数据存储",
    security: "安全防护",
  };

  // 提取去重后的分类并进行排序（确保分类按钮排序符合树的顺序）
  const categories = Array.from(
    new Set(posts.map((p) => p.category).filter((c): c is string => !!c))
  ).sort((a, b) => {
    const keys = Object.keys(categoryMap);
    return keys.indexOf(a) - keys.indexOf(b);
  });

  // 按日期降序排列
  const sortedPosts = [...posts].sort((a, b) => {
    const dateA = a.date ? new Date(a.date).getTime() : 0;
    const dateB = b.date ? new Date(b.date).getTime() : 0;
    return dateB - dateA;
  });

  // 按当前分类过滤
  const displayPosts = activeCategory
    ? sortedPosts.filter((p) => p.category === activeCategory)
    : sortedPosts;

  return (
    <div className="flex flex-col gap-12 py-6 select-text animate-fade-in">
      {/* 卷首语区 */}
      <section className="flex flex-col gap-4 border-b border-divider pb-8">
        <h1 className="font-serif text-3xl md:text-4xl tracking-tight font-normal text-zinc-900 dark:text-zinc-50">
          序栈
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-serif italic text-base max-w-2xl">
          这里不是大而全的百科，而是一块纯粹的数字自留地。作为一名信息安全专业的学生，我在这里记录从底层系统、网络渗透到现代全栈架构的真实推演。去除互联网的浮躁噪音，只留白纸黑字的思考与代码沉淀。
        </p>
        <div className="flex items-center gap-3 mt-1 text-xs text-zinc-400 dark:text-zinc-500">
          <span>{posts.length} 篇文档</span>
          {categories.length > 0 && (
            <>
              <span className="select-none text-zinc-300 dark:text-zinc-700">·</span>
              <span>{categories.length} 个分类</span>
            </>
          )}
        </div>
      </section>

      {/* 分类过滤区 */}
      {categories.length > 0 && (
        <section className="flex flex-col gap-3">
          <h2 className="text-xs font-semibold tracking-wider text-zinc-400 dark:text-zinc-500 uppercase">
            Categories
          </h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory(null)}
              className={`text-xs font-medium px-3 py-1.5 border transition-all duration-150 focus:outline-none cursor-pointer ${
                activeCategory === null
                  ? "border-zinc-900 bg-zinc-900 text-zinc-50 dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                  : "border-divider text-zinc-500 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-600 hover:text-zinc-900 dark:hover:text-zinc-100 bg-transparent"
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
                  className={`text-xs font-medium px-3 py-1.5 border transition-all duration-150 focus:outline-none cursor-pointer ${
                    isActive
                      ? "border-zinc-900 bg-zinc-900 text-zinc-50 dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                      : "border-divider text-zinc-500 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-600 hover:text-zinc-900 dark:hover:text-zinc-100 bg-transparent"
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
      <section className="flex flex-col gap-6">
        <h2 className="text-xs font-semibold tracking-wider text-zinc-400 dark:text-zinc-500 uppercase border-b border-divider/50 pb-2">
          {activeCategory ? `${categoryMap[activeCategory] || activeCategory} — ${displayPosts.length} docs` : "Recent Documents"}
        </h2>

        {displayPosts.length === 0 ? (
          <p className="text-sm text-zinc-400 dark:text-zinc-600 italic py-4">
            No documents in this category yet.
          </p>
        ) : (
          <div className="flex flex-col">
            {displayPosts.map((post) => (
              <article
                key={post.permalink}
                className="py-5 flex flex-col gap-2 group border-b border-divider/40 last:border-0"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <Link
                    href={post.permalink}
                    className="font-serif text-lg text-zinc-900 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-300 border-b border-transparent hover:border-zinc-400 transition-all duration-150 leading-tight"
                  >
                    {post.title}
                  </Link>
                  <div className="flex items-center gap-3 shrink-0">
                    {post.category && (
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-zinc-400 dark:text-zinc-500">
                        {categoryMap[post.category] || post.category}
                      </span>
                    )}
                    {post.date && (
                      <time className="text-xs text-zinc-400 dark:text-zinc-500 font-mono">
                        {post.date.split("T")[0]}
                      </time>
                    )}
                  </div>
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

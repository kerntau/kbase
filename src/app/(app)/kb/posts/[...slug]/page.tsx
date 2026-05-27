import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "#content";
import MDXRender from "@/components/MDXRender";
import TOCUpdater from "@/components/TOCUpdater";
import FloatingActions from "@/components/FloatingActions";

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug.split("/"),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug.join("/"));
  if (!post) return { title: "文档未找到 | 序栈" };
  return {
    title: `${post.title} | 序栈`,
    description: post.description ?? `在序栈上阅读关于 ${post.title} 的详细推演与代码记录。`,
    keywords: [post.title, post.category ?? "", "序栈", "知识库", "极客"],
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const postSlug = slug.join("/");
  const post = posts.find((p) => p.slug === postSlug);

  if (!post) notFound();

  // 按日期降序排列所有文档
  const sortedPosts = [...posts].sort((a, b) => {
    const getTime = (dateStr?: string) => {
      if (!dateStr) return 0;
      const time = new Date(dateStr).getTime();
      return isNaN(time) ? 0 : time;
    };
    return getTime(b.date) - getTime(a.date);
  });

  const currentIndex = sortedPosts.findIndex((p) => p.slug === postSlug);
  // 降序排序下：
  // currentIndex + 1 是时间上更早发表的（上一篇）
  // currentIndex - 1 是时间上更晚发表的（下一篇）
  const prevPost = currentIndex < sortedPosts.length - 1 ? sortedPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null;

  // 面包屑：Home > [folder segments] > Title
  const segments = postSlug.split("/");
  const breadcrumbs: { label: string; href?: string }[] = [
    { label: "Home", href: "/kb" },
    ...segments.slice(0, -1).map((seg) => ({
      label: seg.charAt(0).toUpperCase() + seg.slice(1),
    })),
    { label: post.title },
  ];

  return (
    <>
    <article className="flex flex-col gap-3 py-3 sm:py-4 select-text animate-fade-in">
      {/* 面包屑 */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-foreground/40 font-mono flex-wrap">
        {breadcrumbs.map((crumb, i) => (
          <React.Fragment key={i}>
            {i > 0 && <span className="select-none opacity-50">/</span>}
            {crumb.href ? (
              <Link
                href={crumb.href}
                className="hover:text-foreground transition-colors"
              >
                {crumb.label}
              </Link>
            ) : (
              <span className={i === breadcrumbs.length - 1 ? "text-foreground/60 truncate max-w-[200px]" : ""}>
                {crumb.label}
              </span>
            )}
          </React.Fragment>
        ))}
      </nav>

      {/* 头部元信息 */}
      <header className="flex flex-col gap-1.5 pb-3">
        <h1
          title={post.title}
          className="block w-full text-[1.12rem] leading-[1.16] font-semibold tracking-tight text-accent sm:text-[1.82rem] lg:text-[1.78rem]"
        >
          {post.title}
        </h1>

        <div className="mt-2 mb-3.5 flex flex-wrap items-center gap-2.5 sm:mt-2.5 sm:mb-5">
          {post.category && (
            <span className="text-[10px] uppercase tracking-widest font-bold text-foreground/45 border border-divider px-2 py-0.5">
              {(() => {
                const categoryMap: Record<string, string> = {
                  frontend: "前端技术",
                  backend: "后端架构",
                  devops: "运维交付",
                  database: "数据存储",
                  security: "安全防护",
                };
                return categoryMap[post.category.toLowerCase()] || post.category;
              })()}
            </span>
          )}
          {post.date && (
            <>
              {post.category && <span className="text-foreground/30">•</span>}
              <time className="text-[0.88rem] text-foreground/60 font-mono sm:text-[0.92rem]">
                {post.date.split("T")[0]}
              </time>
            </>
          )}
        </div>

        {post.description && (
          <p className="text-foreground/60 text-[0.88rem] leading-relaxed max-w-2xl sm:text-[0.92rem]">
            {post.description}
          </p>
        )}
      </header>

      {/* TOC 同步 */}
      <TOCUpdater toc={post.toc} />

      {/* 正文 */}
      <div id="article" className="article-detail mt-2 sm:mt-3">
        <MDXRender content={post.content} />
      </div>

      {/* 上下文切换 */}
      <hr className="mt-4 mb-4 border-dashed sm:mt-5 sm:mb-5" />

      <div className="flex flex-col justify-between gap-8 sm:flex-row select-none">
        {prevPost ? (
          <Link href={prevPost.permalink} className="flex gap-2 hover:opacity-75 items-start">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block flex-shrink-0 mt-0.5"><path d="m15 18-6-6 6-6" /></svg>
            <div className="min-w-0">
              <span className="block text-sm text-foreground/70">上一篇</span>
              <div className="text-accent/85">{prevPost.title}</div>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {nextPost ? (
          <Link
            href={nextPost.permalink}
            className="flex gap-2 hover:opacity-75 items-start justify-end text-right ml-auto"
          >
            <div className="min-w-0">
              <span className="block text-sm text-foreground/70">下一篇</span>
              <div className="text-accent/85">{nextPost.title}</div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block flex-shrink-0 mt-0.5"><path d="m9 18 6-6-6-6" /></svg>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </article>

    {/* 悬浮操作按钮 — 必须在 animate-fade-in 的 article 外部，否则 transform 会破坏 fixed 定位 */}
    <FloatingActions />
    </>
  );
}

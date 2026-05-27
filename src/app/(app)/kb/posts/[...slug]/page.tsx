import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, FileText, Clock } from "lucide-react";
import { posts } from "#content";
import MDXRender from "@/components/MDXRender";
import TOCUpdater from "@/components/TOCUpdater";
import FloatingActions from "@/components/FloatingActions";
import PageNavigationShortcuts from "@/components/PageNavigationShortcuts";

function countWordsAndReadingTime(htmlContent: string) {
  const cleanText = htmlContent.replace(/<[^>]*>/g, "");
  const cjkCount = (cleanText.match(/[\u4e00-\u9fa5]/g) || []).length;
  const englishWords = (cleanText.replace(/[\u4e00-\u9fa5]/g, " ").match(/[a-zA-Z0-9_-]+/g) || []).length;
  const totalWords = cjkCount + englishWords;
  const readingTime = Math.max(1, Math.round(totalWords / 350));
  return { totalWords, readingTime };
}


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

  const { totalWords, readingTime } = countWordsAndReadingTime(post.content);

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
    <article className="flex flex-col gap-3 py-3 sm:py-4 px-4 sm:px-0 select-text animate-fade-in">
      {/* 面包屑 */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-foreground/40 font-mono flex-wrap mb-2 sm:mb-3.5">
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
      <header className="flex flex-col gap-3.5 pb-4 border-b border-divider/40">
        <h1
          title={post.title}
          className="block w-full text-2xl sm:text-3.5xl lg:text-[2.2rem] font-extrabold leading-tight tracking-tight text-foreground"
        >
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs text-foreground/50">
          {post.category && (
            <span className="bg-accent/8 border border-accent/20 text-accent font-bold px-2 py-0.5 rounded-sm text-[10px] tracking-wider uppercase select-none">
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
            <span className="flex items-center gap-1.5 font-mono">
              <Calendar size={13} className="text-foreground/40" />
              <time>{post.date.split("T")[0]}</time>
            </span>
          )}

          <span className="flex items-center gap-1.5 font-mono">
            <FileText size={13} className="text-foreground/40" />
            <span>{totalWords.toLocaleString()} 字</span>
          </span>

          <span className="flex items-center gap-1.5">
            <Clock size={13} className="text-foreground/40" />
            <span>预计 {readingTime} 分钟阅读</span>
          </span>
        </div>

        {post.description && (
          <p className="text-foreground/50 text-[0.88rem] leading-relaxed max-w-2xl sm:text-[0.92rem] font-sans border-l-2 border-divider/60 pl-3.5 py-0.5 mt-1">
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
      <hr className="mt-6 mb-6 border-dashed border-divider/40" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 select-none">
        {prevPost ? (
          <Link
            href={prevPost.permalink}
            className="group flex items-center gap-3 p-3 border border-divider/25 hover:border-accent/40 rounded bg-foreground/[0.002] hover:bg-accent/[0.02] hover:-translate-x-1 transition-all duration-200 ease-out"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="inline-block flex-shrink-0 text-foreground/45 group-hover:text-accent transition-colors duration-200"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            <div className="min-w-0 flex-1">
              <span className="block text-[9px] uppercase tracking-widest font-mono text-foreground/40 mb-0.5">
                上一篇
              </span>
              <div className="text-xs sm:text-[13px] font-semibold text-foreground group-hover:text-accent transition-colors duration-200 truncate">
                {prevPost.title}
              </div>
            </div>
          </Link>
        ) : (
          <div className="hidden sm:flex items-center gap-3 border border-dashed border-divider/15 rounded p-3 opacity-30 select-none cursor-not-allowed">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="inline-block flex-shrink-0 text-foreground/35"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            <div className="min-w-0 flex-1">
              <span className="block text-[9px] uppercase tracking-widest font-mono text-foreground/35 mb-0.5">
                上一篇
              </span>
              <div className="text-xs sm:text-[13px] font-medium text-foreground/40">已是第一篇</div>
            </div>
          </div>
        )}

        {nextPost ? (
          <Link
            href={nextPost.permalink}
            className="group flex items-center justify-between gap-3 p-3 border border-divider/25 hover:border-accent/40 rounded bg-foreground/[0.002] hover:bg-accent/[0.02] hover:translate-x-1 transition-all duration-200 ease-out text-right"
          >
            <div className="min-w-0 flex-1">
              <span className="block text-[9px] uppercase tracking-widest font-mono text-foreground/40 mb-0.5">
                下一篇
              </span>
              <div className="text-xs sm:text-[13px] font-semibold text-foreground group-hover:text-accent transition-colors duration-200 truncate">
                {nextPost.title}
              </div>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="inline-block flex-shrink-0 text-foreground/45 group-hover:text-accent transition-colors duration-200"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Link>
        ) : (
          <div className="hidden sm:flex items-center justify-between gap-3 border border-dashed border-divider/15 rounded p-3 opacity-30 select-none cursor-not-allowed text-right">
            <div className="min-w-0 flex-1">
              <span className="block text-[9px] uppercase tracking-widest font-mono text-foreground/35 mb-0.5">
                下一篇
              </span>
              <div className="text-xs sm:text-[13px] font-medium text-foreground/40">已是最后一篇</div>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="inline-block flex-shrink-0 text-foreground/35"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </div>
        )}
      </div>
    </article>

    {/* 悬浮操作按钮 */}
    <FloatingActions />

    {/* 注册键盘快捷键翻页翻章 */}
    <PageNavigationShortcuts
      prevHref={prevPost ? prevPost.permalink : null}
      nextHref={nextPost ? nextPost.permalink : null}
    />
    </>
  );
}

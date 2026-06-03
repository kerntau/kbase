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
import ReadingProgressBar from "@/components/ReadingProgressBar";
import { categoryMap, sortByDate } from "@/utils/tree";


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
  const sortedPosts = sortByDate(posts.map((p) => ({ ...p, date: p.date ?? "" })));

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
    <ReadingProgressBar />
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
              {categoryMap[post.category.toLowerCase()] || post.category}
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
      <div className="flex items-center justify-between gap-4 select-none mt-10 mb-6 px-1 border-t border-divider/40 pt-6 w-full">
        {prevPost ? (
          <Link
            href={prevPost.permalink}
            aria-label={`上一篇: ${prevPost.title}`}
            className="group flex items-center gap-2 max-w-[48%] transition-opacity"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-foreground/30 group-hover:text-accent/60 transition-colors shrink-0"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            <div className="min-w-0">
              <span className="text-[15px] sm:text-[16px] font-semibold text-foreground/80 group-hover:text-accent transition-colors truncate block">{prevPost.title}</span>
            </div>
          </Link>
        ) : (
          <div className="max-w-[48%]" />
        )}

        {nextPost ? (
          <Link
            href={nextPost.permalink}
            aria-label={`下一篇: ${nextPost.title}`}
            className="group flex items-center justify-end gap-2 max-w-[48%] transition-opacity text-right ml-auto"
          >
            <div className="min-w-0">
              <span className="text-[15px] sm:text-[16px] font-semibold text-foreground/80 group-hover:text-accent transition-colors truncate block">{nextPost.title}</span>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-foreground/30 group-hover:text-accent/60 transition-colors shrink-0"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Link>
        ) : (
          <div className="max-w-[48%]" />
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

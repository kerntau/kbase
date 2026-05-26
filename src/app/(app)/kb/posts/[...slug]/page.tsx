import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "#content";
import MDXRender from "@/components/MDXRender";
import TOCUpdater from "@/components/TOCUpdater";

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
  if (!post) return { title: "Document Not Found - Knowledge Base" };
  return {
    title: `${post.title} | Knowledge Base`,
    description: post.description ?? `Read ${post.title} on our Knowledge Base.`,
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

  // 面包屑：Home > [folder segments] > Title
  const segments = postSlug.split("/");
  const breadcrumbs: { label: string; href?: string }[] = [
    { label: "Home", href: "/kb" },
    ...segments.slice(0, -1).map((seg, i) => ({
      label: seg.charAt(0).toUpperCase() + seg.slice(1),
      // 文件夹无独立页面，不添加 href
    })),
    { label: post.title },
  ];

  return (
    <article className="flex flex-col gap-6 py-6 select-text animate-fade-in">
      {/* 面包屑 */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-zinc-400 dark:text-zinc-500 font-mono flex-wrap">
        {breadcrumbs.map((crumb, i) => (
          <React.Fragment key={i}>
            {i > 0 && <span className="select-none opacity-50">/</span>}
            {crumb.href ? (
              <Link
                href={crumb.href}
                className="hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
              >
                {crumb.label}
              </Link>
            ) : (
              <span className={i === breadcrumbs.length - 1 ? "text-zinc-600 dark:text-zinc-400 truncate max-w-[200px]" : ""}>
                {crumb.label}
              </span>
            )}
          </React.Fragment>
        ))}
      </nav>

      {/* 头部元信息 */}
      <header className="flex flex-col gap-3 border-b border-divider pb-6">
        <div className="flex flex-wrap items-center gap-2">
          {post.category && (
            <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 dark:text-zinc-500 border border-divider px-2 py-0.5">
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
            <time className="text-xs text-zinc-400 dark:text-zinc-500 font-mono">
              {post.date.split("T")[0]}
            </time>
          )}
        </div>
        <h1 className="font-serif text-3xl md:text-4xl tracking-tight font-normal text-zinc-900 dark:text-zinc-50 leading-tight">
          {post.title}
        </h1>
        {post.description && (
          <p className="text-zinc-500 dark:text-zinc-400 font-serif italic text-base leading-relaxed mt-1 max-w-2xl">
            {post.description}
          </p>
        )}
      </header>

      {/* TOC 同步 */}
      <TOCUpdater toc={post.toc} />

      {/* 正文 */}
      <div className="mt-2">
        <MDXRender content={post.content} />
      </div>

      {/* 底部导航提示 */}
      <footer className="mt-8 pt-6 border-t border-divider flex items-center justify-between gap-4">
        <Link
          href="/kb"
          className="text-xs text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors font-mono"
        >
          ← Back to index
        </Link>
        {post.date && (
          <time className="text-xs text-zinc-400 dark:text-zinc-500 font-mono">
            Last updated: {post.date.split("T")[0]}
          </time>
        )}
      </footer>
    </article>
  );
}

import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { posts } from "#content";
import MDXRender from "@/components/MDXRender";
import TOCUpdater from "@/components/TOCUpdater";

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

// 静态路由生成
export function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug.split("/"),
  }));
}

// 动态生成元数据 (SEO 优化)
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const postSlug = slug.join("/");
  const post = posts.find((p) => p.slug === postSlug);

  if (!post) {
    return {
      title: "Document Not Found - Knowledge Base",
    };
  }

  return {
    title: `${post.title} | Knowledge Base`,
    description: post.description || `Read ${post.title} on our Knowledge Base.`,
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

  if (!post) {
    notFound();
  }

  return (
    <article className="flex flex-col gap-6 py-6 select-text animate-fade-in">
      {/* 头部元信息 */}
      <header className="flex flex-col gap-3 border-b border-divider pb-6">
        <div className="flex flex-wrap items-center gap-2">
          {post.category && (
            <span className="text-xs uppercase tracking-wider font-semibold text-zinc-400">
              {post.category}
            </span>
          )}
          {post.category && post.date && (
            <span className="text-zinc-300 dark:text-zinc-700 select-none">•</span>
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
          <p className="text-zinc-500 dark:text-zinc-400 font-serif italic text-base leading-relaxed mt-1">
            {post.description}
          </p>
        )}
      </header>

      {/* 桥接同步 TOC 结构 */}
      <TOCUpdater toc={post.toc} />

      {/* 核心 MDX 内容渲染 */}
      <div className="mt-2">
        <MDXRender content={post.content} />
      </div>
    </article>
  );
}

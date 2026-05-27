import React from "react";
import type { Metadata } from "next";
import { posts } from "#content";
import HomeContent from "@/components/HomeContent";

export const metadata: Metadata = {
  title: "文章列表 | 序栈",
  description: "浏览序栈的精选文档，内容涵盖系统安全、渗透测试、底层架构设计以及现代全栈工程。以严谨的逻辑记录技术推演，还原纯粹的白纸黑字。",
  keywords: ["序栈文档", "技术自留地", "系统安全", "全栈开发", "知识库", "渗透日志"],
};

export default function HomePage() {
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
    const getIndex = (key: string) => {
      const index = keys.indexOf(key);
      return index === -1 ? 999 : index;
    };
    return getIndex(a) - getIndex(b);
  });

  return (
    <HomeContent 
      posts={posts} 
      categories={categories} 
      categoryMap={categoryMap} 
    />
  );
}

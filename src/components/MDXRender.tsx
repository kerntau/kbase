"use client";

import React, { useEffect, useRef } from "react";

interface MDXRenderProps {
  content: string; // 经过 Velite/Markdown 编译后的 HTML 字符串
}

export default function MDXRender({ content }: MDXRenderProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // 辅助处理逻辑：若有些 Markdown 渲染器没有为表格生成 overflow 包裹层，
  // 我们可以在客户端动态为 table 标签包裹一层 overflow-x-auto 的 div，确保完全不溢出。
  useEffect(() => {
    if (!containerRef.current) return;
    
    const tables = containerRef.current.querySelectorAll("table");
    tables.forEach((table) => {
      if (table.parentElement && table.parentElement.tagName !== "DIV" && !table.parentElement.classList.contains("table-container")) {
        const wrapper = document.createElement("div");
        wrapper.className = "table-container overflow-x-auto w-full border-t border-b border-divider my-6";
        table.parentNode?.insertBefore(wrapper, table);
        wrapper.appendChild(table);
      }
    });

    // 移动端处理超宽表格的样式细调
    const codeBlocks = containerRef.current.querySelectorAll("pre");
    codeBlocks.forEach((pre) => {
      pre.className = "overflow-x-auto p-4 my-6 text-sm bg-zinc-100/70 border border-divider dark:bg-zinc-900/40 text-zinc-800 dark:text-zinc-200 select-text";
    });
  }, [content]);

  return (
    <div
      ref={containerRef}
      className="prose prose-zinc dark:prose-invert max-w-none 
                 prose-headings:font-serif prose-headings:font-normal prose-headings:tracking-tight
                 prose-h1:text-3xl prose-h1:mb-8 prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:border-divider prose-h2:pb-2
                 prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-2
                 prose-p:leading-relaxed prose-p:text-zinc-700 dark:prose-p:text-zinc-300 prose-p:my-4
                 prose-a:no-underline prose-a:border-b prose-a:border-zinc-400 dark:prose-a:border-zinc-600 
                 hover:prose-a:border-zinc-950 dark:hover:prose-a:border-zinc-100 transition-colors
                 prose-ul:list-disc prose-ul:pl-6 prose-ol:list-decimal prose-ol:pl-6
                 prose-li:my-1.5 prose-li:text-zinc-700 dark:prose-li:text-zinc-300
                 prose-blockquote:border-l-2 prose-blockquote:border-zinc-400 dark:prose-blockquote:border-zinc-600
                 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-zinc-500 dark:prose-blockquote:text-zinc-400
                 prose-table:w-full prose-table:text-sm prose-table:text-left
                 prose-th:font-semibold prose-th:py-2 prose-th:px-3 prose-th:border-b prose-th:border-divider
                 prose-td:py-2 prose-td:px-3 prose-td:border-b prose-td:border-divider/50
                 prose-img:max-w-full prose-img:height-auto prose-img:border prose-img:border-divider prose-img:my-6
                 selection:bg-zinc-200 dark:selection:bg-zinc-800"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

"use client";

import React, { useEffect, useRef } from "react";

interface MDXRenderProps {
  content: string;
}

export default function MDXRender({ content }: MDXRenderProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // ── 表格：添加横向滚动容器 ──────────────────────────
    el.querySelectorAll("table").forEach((table) => {
      if (table.parentElement?.classList.contains("table-container")) return;
      const wrapper = document.createElement("div");
      wrapper.className =
        "table-container overflow-x-auto w-full border-t border-b border-divider my-6";
      table.parentNode?.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    });

    // ── 代码块：样式 + 复制按钮 ──────────────────────────
    el.querySelectorAll("pre").forEach((pre) => {
      // 基础样式
      pre.classList.add(
        "relative", "overflow-x-auto", "group",
        "p-4", "my-6", "text-sm",
        "bg-zinc-100/70", "dark:bg-zinc-900/50",
        "border", "border-divider",
        "text-zinc-800", "dark:text-zinc-200",
        "select-text"
      );

      // 避免重复添加按钮
      if (pre.querySelector(".copy-btn")) return;

      const btn = document.createElement("button");
      btn.className =
        "copy-btn absolute top-2.5 right-2.5 text-[10px] font-mono " +
        "text-zinc-400 dark:text-zinc-500 border border-zinc-300 dark:border-zinc-700 " +
        "px-2 py-0.5 rounded-sm bg-background " +
        "opacity-0 group-hover:opacity-100 " +
        "hover:text-zinc-700 dark:hover:text-zinc-200 hover:border-zinc-400 dark:hover:border-zinc-500 " +
        "transition-all duration-150 cursor-pointer select-none";
      btn.textContent = "Copy";
      btn.setAttribute("aria-label", "Copy code");

      btn.addEventListener("click", async () => {
        const code =
          pre.querySelector("code")?.textContent ?? pre.textContent ?? "";
        try {
          await navigator.clipboard.writeText(code.trim());
          btn.textContent = "Copied!";
          btn.classList.add("text-emerald-600", "dark:text-emerald-400", "border-emerald-400");
        } catch {
          btn.textContent = "Error";
        }
        setTimeout(() => {
          btn.textContent = "Copy";
          btn.classList.remove("text-emerald-600", "dark:text-emerald-400", "border-emerald-400");
        }, 1800);
      });

      pre.appendChild(btn);
    });
  }, [content]);

  return (
    <div
      ref={containerRef}
      className="
        prose prose-zinc dark:prose-invert max-w-none
        prose-headings:font-serif prose-headings:font-normal prose-headings:tracking-tight
        prose-h1:text-3xl prose-h1:mb-8
        prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:border-divider prose-h2:pb-2
        prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-2
        prose-p:leading-relaxed prose-p:text-zinc-700 dark:prose-p:text-zinc-300 prose-p:my-4
        prose-a:no-underline prose-a:border-b prose-a:border-zinc-300 dark:prose-a:border-zinc-600
        prose-a:transition-colors prose-a:duration-150
        hover:prose-a:border-zinc-900 dark:hover:prose-a:border-zinc-100
        prose-ul:list-disc prose-ul:pl-6 prose-ol:list-decimal prose-ol:pl-6
        prose-li:my-1.5 prose-li:text-zinc-700 dark:prose-li:text-zinc-300
        prose-blockquote:border-l-2 prose-blockquote:border-zinc-300 dark:prose-blockquote:border-zinc-600
        prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-zinc-500 dark:prose-blockquote:text-zinc-400
        prose-blockquote:not-italic
        prose-table:w-full prose-table:text-sm prose-table:text-left
        prose-th:font-semibold prose-th:py-2 prose-th:px-3 prose-th:border-b prose-th:border-divider
        prose-td:py-2 prose-td:px-3 prose-td:border-b prose-td:border-divider/50
        prose-img:max-w-full prose-img:border prose-img:border-divider prose-img:my-6
        prose-code:text-zinc-800 dark:prose-code:text-zinc-200
        prose-code:bg-zinc-100 dark:prose-code:bg-zinc-900/60
        prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-sm prose-code:text-[0.85em]
        prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
        selection:bg-zinc-200 dark:selection:bg-zinc-700
      "
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

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

    // ── 标题：自动注入 id（与 Velite TOC url 规则保持一致）────────
    // Velite 使用 GitHub slug 规则：小写，空格→连字符，去除非字母数字字符
    const slugify = (text: string): string =>
      text
        .toLowerCase()
        .trim()
        .replace(/[\s\./\\,:;?!()\[\]"']+/g, "-")
        .replace(/--+/g, "-")
        .replace(/^-+|-+$/g, "");

    el.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach((heading) => {
      if (!heading.id) {
        heading.id = slugify(heading.textContent ?? "");
      }
    });

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
        "bg-muted/40",
        "border", "border-divider",
        "text-foreground/90",
        "select-text"
      );

      // 避免重复添加按钮
      if (pre.querySelector(".copy-btn")) return;

      const btn = document.createElement("button");
      btn.className =
        "copy-btn absolute top-2.5 right-2.5 text-[10px] font-mono " +
        "text-foreground/45 border border-divider " +
        "px-2 py-0.5 rounded-sm bg-background " +
        "opacity-100 md:opacity-0 md:group-hover:opacity-100 " +
        "hover:text-foreground hover:border-foreground/30 " +
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
      className={[
        "article-detail prose dark:prose-invert max-w-none",
        "prose-headings:font-sans prose-headings:font-semibold prose-headings:tracking-tight",
        "prose-h1:text-3xl prose-h1:mb-8",
        "prose-h2:border-b prose-h2:border-divider prose-h2:pb-2",
        "prose-p:text-foreground/80",
        "prose-a:no-underline prose-a:border-b prose-a:border-divider",
        "prose-a:transition-colors prose-a:duration-150",
        "hover:prose-a:border-foreground",
        "prose-ul:list-disc prose-ul:pl-6 prose-ol:list-decimal prose-ol:pl-6",
        "prose-li:text-foreground/80",
        "prose-blockquote:border-l-2 prose-blockquote:border-divider",
        "prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-foreground/50",
        "prose-blockquote:not-italic",
        "prose-table:w-full prose-table:text-sm prose-table:text-left",
        "prose-th:font-semibold prose-th:border-b prose-th:border-divider",
        "prose-td:border-b prose-td:border-divider/50",
        "prose-img:max-w-full prose-img:border prose-img:border-divider prose-img:my-6",
        "prose-code:text-foreground/90",
        "prose-code:bg-muted/60",
        "prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-sm prose-code:text-[0.85em]",
        "prose-code:font-mono prose-code:before:content-none prose-code:after:content-none",
        "selection:bg-accent/20"
      ].join(" ")}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

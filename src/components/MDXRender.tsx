"use client";

import { useEffect, useRef, useState } from "react";

interface MDXRenderProps {
  content: string;
}

export default function MDXRender({ content }: MDXRenderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeImageUrl, setActiveImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!activeImageUrl) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveImageUrl(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeImageUrl]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Collect cleanup functions for event listeners
    const cleanups: (() => void)[] = [];

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
        "px-2 py-0.5 rounded-sm bg-background/90 " +
        "opacity-100 md:opacity-0 md:group-hover:opacity-100 " +
        "hover:text-foreground hover:border-foreground/40 " +
        "transition-all duration-300 cubic-bezier(0.16, 1, 0.3, 1) cursor-pointer select-none active:scale-[0.93]";
      btn.textContent = "Copy";
      btn.setAttribute("aria-label", "Copy code");

      const handleCopy = async () => {
        const code =
          pre.querySelector("code")?.textContent ?? pre.textContent ?? "";
        try {
          await navigator.clipboard.writeText(code.trim());
          btn.textContent = "Copied!";
          btn.classList.add("text-accent", "border-accent/50", "shadow-sm", "shadow-accent/10", "scale-[1.03]");
        } catch {
          btn.textContent = "Error";
        }
        setTimeout(() => {
          btn.textContent = "Copy";
          btn.classList.remove("text-accent", "border-accent/50", "shadow-sm", "shadow-accent/10", "scale-[1.03]");
        }, 1800);
      };

      btn.addEventListener("click", handleCopy);
      cleanups.push(() => btn.removeEventListener("click", handleCopy));

      pre.appendChild(btn);
    });

    // ── 提示框 (Alert / Callout)：将 > [!NOTE] 转化为美观的卡片 ────
    el.querySelectorAll("blockquote").forEach((bq) => {
      const html = bq.innerHTML;
      const match = html.match(/\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]/i);
      if (match) {
        const type = match[1].toUpperCase();

        const cleanHtml = html
          .replace(/\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*(<br\s*\/?>)?/i, "")
          .replace(/<p>\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*/i, "<p>")
          .trim();

        bq.innerHTML = cleanHtml;
        bq.className = "my-6 p-4.5 border-l-4 rounded-r-sm select-text transition-all duration-300 font-sans text-sm leading-relaxed";

        if (type === "NOTE") {
          bq.classList.add("bg-blue-500/[0.03]", "border-blue-500/80", "text-foreground/90", "dark:bg-blue-400/[0.02]");
        } else if (type === "TIP") {
          bq.classList.add("bg-accent/[0.03]", "border-accent/80", "text-foreground/90", "dark:bg-accent/[0.02]");
        } else if (type === "IMPORTANT") {
          bq.classList.add("bg-purple-500/[0.03]", "border-purple-500/80", "text-foreground/90", "dark:bg-purple-400/[0.02]");
        } else if (type === "WARNING") {
          bq.classList.add("bg-amber-500/[0.03]", "border-amber-500/80", "text-foreground/90", "dark:bg-amber-400/[0.02]");
        } else if (type === "CAUTION") {
          bq.classList.add("bg-rose-500/[0.03]", "border-rose-500/80", "text-foreground/90", "dark:bg-rose-400/[0.02]");
        }
      }
    });

    // ── 提示折叠卡片 (details/summary)：习题与解析卡片化 ────────
    el.querySelectorAll("details").forEach((details) => {
      details.className = "my-5 border border-divider/50 rounded-sm bg-foreground/[0.003] dark:bg-white/[0.002] overflow-hidden transition-all duration-300";

      const summary = details.querySelector("summary");
      if (summary) {
        summary.className = "px-4 py-3 font-sans text-xs font-bold tracking-wider text-foreground/75 cursor-pointer hover:bg-foreground/[0.015] focus:outline-none transition-colors border-b border-transparent select-none list-none [&::-webkit-details-marker]:hidden flex items-center gap-2";

        // 动态添加一个展开小箭头
        if (!summary.querySelector(".marker-icon")) {
          const marker = document.createElement("span");
          marker.className = "marker-icon transition-transform duration-300 text-foreground/30";
          marker.innerHTML = "▶";
          marker.style.fontSize = "8px";
          marker.style.display = "inline-block";
          summary.insertBefore(marker, summary.firstChild);

          const handleToggle = () => {
            if (details.open) {
              summary.classList.add("border-divider/30");
              marker.style.transform = "rotate(90deg)";
            } else {
              summary.classList.remove("border-divider/30");
              marker.style.transform = "rotate(0deg)";
            }
          };

          details.addEventListener("toggle", handleToggle);
          cleanups.push(() => details.removeEventListener("toggle", handleToggle));
        }
      }
    });

    // ── 图片灯箱 (Lightbox)：点击图片进行大图毛玻璃放大 ────────
    el.querySelectorAll("img").forEach((img) => {
      img.style.cursor = "zoom-in";

      const handleClick = () => {
        setActiveImageUrl(img.src);
      };

      img.addEventListener("click", handleClick);
      cleanups.push(() => img.removeEventListener("click", handleClick));
    });

    // Cleanup all event listeners on unmount or content change
    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, [content, setActiveImageUrl]);

  return (
    <>
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

      {/* 极简磨砂大图 Lightbox 弹出层 */}
      {activeImageUrl && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center cursor-pointer"
          onClick={() => setActiveImageUrl(null)}
          onKeyDown={(e) => e.key === "Escape" && setActiveImageUrl(null)}
          role="dialog"
          aria-label="图片预览"
          tabIndex={-1}
        >
          <button
            className="absolute top-4 right-4 text-white text-3xl hover:opacity-70 transition-opacity cursor-pointer"
            onClick={() => setActiveImageUrl(null)}
            aria-label="关闭预览"
          >
            ✕
          </button>
          <img
            src={activeImageUrl}
            alt="放大预览"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </>
  );
}

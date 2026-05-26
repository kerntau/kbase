"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useUI } from "@/context/UIContext";

export interface VeliteTocItem {
  title: string;
  url: string;
  items: VeliteTocItem[];
}

interface TableOfContentsProps {
  toc: VeliteTocItem[];
}

// 移动端 Header 高度 + 额外偏移
const SCROLL_OFFSET = 72;

export default function TableOfContents({ toc }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const { setIsMobileTOCOpen } = useUI();

  // 将树状 toc 拍平
  const flatToc = useMemo(() => {
    const result: { title: string; url: string; depth: number }[] = [];
    const traverse = (list: VeliteTocItem[], depth = 2) => {
      list.forEach((item) => {
        result.push({ title: item.title, url: item.url, depth });
        if (item.items?.length) traverse(item.items, depth + 1);
      });
    };
    traverse(toc);
    return result;
  }, [toc]);

  // IntersectionObserver 追踪当前可见标题
  useEffect(() => {
    if (flatToc.length === 0) return;

    const ids = flatToc.map((item) => item.url.replace(/^#/, ""));
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    // 用 scroll 事件确定最近标题，比 IO 更可靠
    const handleScroll = () => {
      const threshold = window.scrollY + SCROLL_OFFSET + 8;
      let current = flatToc[0]?.url ?? "";
      for (const el of elements) {
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (top <= threshold) {
          current = `#${el.id}`;
        }
      }
      setActiveId(current);
    };

    handleScroll(); // 初始执行
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [flatToc]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    e.preventDefault();
    const id = url.replace(/^#/, "");
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
      window.scrollTo({ top, behavior: "smooth" });
      window.history.pushState(null, "", url);
      setActiveId(url);
      setIsMobileTOCOpen(false);
    }
  };

  if (flatToc.length === 0) return null;

  return (
    <div className="w-full flex flex-col py-4 select-none">
      <h3 className="text-[10px] font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase px-2 mb-3">
        On This Page
      </h3>
      <div className="flex flex-col gap-0.5 border-l border-zinc-200/60 dark:border-zinc-800/60">
        {flatToc.map((item) => {
          const isActive = activeId === item.url;
          const pl =
            item.depth === 3
              ? "pl-5"
              : item.depth >= 4
              ? "pl-8"
              : "pl-3";

          return (
            <a
              key={item.url}
              href={item.url}
              onClick={(e) => handleLinkClick(e, item.url)}
              className={`-ml-px border-l text-xs py-1 pr-2 transition-all duration-150 focus:outline-none ${pl} ${
                isActive
                  ? "border-zinc-800 dark:border-zinc-200 font-semibold text-zinc-900 dark:text-zinc-50"
                  : "border-transparent text-zinc-400 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700"
              }`}
            >
              <span className="block truncate leading-snug">{item.title}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}

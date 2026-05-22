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

export default function TableOfContents({ toc }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const { setIsMobileTOCOpen } = useUI();

  // 将树状的 toc 拍平，并动态计算标题层级深度 (depth)
  const flatToc = useMemo(() => {
    const result: { title: string; url: string; depth: number }[] = [];
    const traverse = (list: VeliteTocItem[], currentDepth = 2) => {
      list.forEach((item) => {
        result.push({
          title: item.title,
          url: item.url,
          depth: currentDepth,
        });
        if (item.items && item.items.length > 0) {
          traverse(item.items, currentDepth + 1);
        }
      });
    };
    traverse(toc);
    return result;
  }, [toc]);

  useEffect(() => {
    if (flatToc.length === 0) return;

    // 获取所有目录项对应的 DOM 元素
    const elements = flatToc
      .map((item) => document.getElementById(item.url.replace(/^#/, "")))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        // 找到当前在屏幕中可见且最靠上的标题
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          visibleEntries.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          setActiveId(`#${visibleEntries[0].target.id}`);
        } else {
          // 回退逻辑：如果滚动到了页面顶部，高亮第一个
          if (window.scrollY < 100 && flatToc.length > 0) {
            setActiveId(flatToc[0].url);
          }
        }
      },
      {
        rootMargin: "-80px 0px -60% 0px",
        threshold: 0.1,
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [flatToc]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    e.preventDefault();
    const id = url.replace(/^#/, "");
    const element = document.getElementById(id);
    if (element) {
      setIsMobileTOCOpen(false); // 点击后关闭移动端抽屉
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.pushState(null, "", url);
      setActiveId(url);
    }
  };

  if (flatToc.length === 0) {
    return null;
  }

  return (
    <div className="w-full flex flex-col py-4 select-none">
      <h3 className="text-xs font-semibold tracking-wider text-zinc-400 dark:text-zinc-500 uppercase px-2 mb-3">
        On This Page
      </h3>
      <div className="flex flex-col gap-1.5 border-l border-zinc-200/60 dark:border-zinc-800/60">
        {flatToc.map((item) => {
          const isActive = activeId === item.url;
          // 根据标题的深度做缩进排版 (H2=2 pl-3, H3=3 pl-5, H4=4 pl-8, etc.)
          const plClass = item.depth === 3 ? "pl-5" : item.depth >= 4 ? "pl-8" : "pl-3";

          return (
            <a
              key={item.url}
              href={item.url}
              onClick={(e) => handleLinkClick(e, item.url)}
              className={`block -ml-px border-l text-sm py-1 pr-2 transition-colors focus:outline-none ${plClass} ${
                isActive
                  ? "border-zinc-950 font-medium text-zinc-950 dark:border-zinc-50 dark:text-zinc-50"
                  : "border-transparent text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              }`}
            >
              <span className="truncate block leading-tight">{item.title}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}

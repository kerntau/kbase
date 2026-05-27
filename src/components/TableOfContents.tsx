"use client";

import React, { useEffect, useState, useMemo, useRef } from "react";
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
  const isClickScrollingRef = useRef(false);
  const cleanupScrollEndRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    return () => {
      if (cleanupScrollEndRef.current) {
        cleanupScrollEndRef.current();
      }
    };
  }, []);

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

  useEffect(() => {
    if (flatToc.length === 0) return;

    const ids = flatToc.map((item) => item.url.replace(/^#/, ""));
    let cachedElements: HTMLElement[] = [];

    // 获取 DOM 标题元素
    const getElements = () => {
      if (cachedElements.length > 0) return cachedElements;
      cachedElements = ids
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => el !== null);
      return cachedElements;
    };

    const handleScroll = () => {
      if (isClickScrollingRef.current) return;
      const elements = getElements();
      if (elements.length === 0) return;

      // 1. 触底判定：若已滑到页面最底部，直接高亮最后一个标题
      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 30;

      if (isAtBottom) {
        setActiveId(`#${elements[elements.length - 1].id}`);
        return;
      }

      // 2. 判定线高亮跟随：越过判定线且最靠近判定线的标题
      const triggerLine = SCROLL_OFFSET + 30;
      let currentActive = "";

      for (let i = 0; i < elements.length; i++) {
        const el = elements[i];
        const rect = el.getBoundingClientRect();
        // 如果该标题顶部已经越过判定线
        if (rect.top <= triggerLine) {
          currentActive = `#${el.id}`;
        } else {
          // 由于标题是顺序排列的，一旦遇到没越过判定线的，就可以结束循环了
          break;
        }
      }

      // 如果没有任何标题越过判定线，默认高亮第一个标题
      if (!currentActive && elements.length > 0) {
        currentActive = `#${elements[0].id}`;
      }

      if (currentActive) {
        setActiveId(currentActive);
      }
    };

    // 初始执行，并延迟以保证 MDX 渲染完毕后 id 已被注入
    handleScroll();
    const timer1 = setTimeout(handleScroll, 100);
    const timer2 = setTimeout(handleScroll, 400);

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [flatToc]);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    url: string
  ) => {
    e.preventDefault();
    const id = url.replace(/^#/, "");
    const el = document.getElementById(id);
    if (el) {
      isClickScrollingRef.current = true;
      setActiveId(url);
      
      const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
      window.scrollTo({ top, behavior: "smooth" });
      window.history.pushState(null, "", url);
      setIsMobileTOCOpen(false);

      if (cleanupScrollEndRef.current) {
        cleanupScrollEndRef.current();
      }

      const handleScrollEnd = () => {
        setTimeout(() => {
          isClickScrollingRef.current = false;
        }, 50);
        window.removeEventListener("scrollend", handleScrollEnd);
        cleanupScrollEndRef.current = null;
      };

      cleanupScrollEndRef.current = () => {
        window.removeEventListener("scrollend", handleScrollEnd);
      };

      if ("onscrollend" in window) {
        window.addEventListener("scrollend", handleScrollEnd);
      } else {
        const timer = setTimeout(() => {
          isClickScrollingRef.current = false;
        }, 800);
        cleanupScrollEndRef.current = () => {
          clearTimeout(timer);
        };
      }
    }
  };

  if (flatToc.length === 0) return null;

  return (
    <div className="w-full flex flex-col py-4 select-none">
      <h3 className="text-[10px] font-bold tracking-widest text-foreground/45 uppercase px-2 mb-3">
        On This Page
      </h3>
      <div className="flex flex-col gap-0.5 border-l border-divider">
        {flatToc.map((item) => {
          const isActive = activeId === item.url;
          const pl =
            item.depth === 3 ? "pl-5" : item.depth >= 4 ? "pl-8" : "pl-3";

          return (
            <a
              key={item.url}
              href={item.url}
              onClick={(e) => handleLinkClick(e, item.url)}
              className={`-ml-px border-l text-xs py-0.5 pr-2 transition-all duration-150 focus:outline-none ${pl} ${
                isActive
                  ? "border-foreground font-semibold text-foreground"
                  : "border-transparent text-foreground/45 hover:text-foreground hover:border-divider"
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

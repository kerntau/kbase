"use client";

import React, { useEffect, useState, useRef, useTransition, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search as SearchIcon, X, FileText, CornerDownLeft, AlertCircle } from "lucide-react";
import { Index } from "flexsearch";
import { useUI } from "@/context/UIContext";

interface SearchItem {
  title: string;
  slug: string;
  permalink: string;
  category: string;
  description: string;
  content: string;
}

type IndexState = "idle" | "loading" | "ready" | "error";

function highlightText(text: string, highlight: string) {
  if (!highlight.trim()) return <span>{text}</span>;
  const escapedHighlight = highlight.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
  const regex = new RegExp(`(${escapedHighlight})`, "gi");
  const parts = text.split(regex);
  return (
    <span>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-accent/15 text-accent font-semibold px-0.5 rounded-xs">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </span>
  );
}

export default function Search() {
  const router = useRouter();
  const { isSearchOpen, setIsSearchOpen } = useUI();

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [results, setResults] = useState<SearchItem[]>([]);
  const [allItems, setAllItems] = useState<SearchItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [indexState, setIndexState] = useState<IndexState>("idle");
  const [, startTransition] = useTransition();

  const searchIndexRef = useRef<Index | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const activeItemRef = useRef<HTMLButtonElement>(null);

  // 输入防抖
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 120);
    return () => clearTimeout(timer);
  }, [query]);

  // 监听选中项改变，自动平滑滚动
  useEffect(() => {
    if (activeItemRef.current) {
      activeItemRef.current.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [selectedIndex]);

  // Ctrl+K / Cmd+K 快捷键
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setIsSearchOpen]);

  // 打开时初始化索引
  useEffect(() => {
    if (!isSearchOpen) return;

    // 聚焦输入框
    setTimeout(() => inputRef.current?.focus(), 60);

    // 已加载过则跳过
    if (searchIndexRef.current) return;

    setIndexState("loading");

    // 中英文混合高性能分词器
    const idx = new Index({
      tokenize: ((str: string) => {
        const cjkRegex = /[\u4e00-\u9fa5]/g;
        const englishWords = str.replace(cjkRegex, " ").split(/[\s\.\-\/_]+/).filter(Boolean);
        const cjkChars = str.match(cjkRegex) || [];
        return [...englishWords, ...cjkChars];
      }) as any
    });

    fetch("/search-index.json")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: SearchItem[]) => {
        setAllItems(data);
        data.forEach((item, i) => {
          idx.add(i, `${item.title} ${item.category} ${item.description} ${item.content}`);
        });
        searchIndexRef.current = idx;
        setIndexState("ready");
      })
      .catch((err) => {
        console.warn("[Search] Failed to load search-index.json:", err.message);
        setIndexState("error");
      });
  }, [isSearchOpen]);

  // 执行搜索
  useEffect(() => {
    if (!debouncedQuery.trim() || !searchIndexRef.current) {
      setResults([]);
      setSelectedIndex(0);
      return;
    }
    startTransition(() => {
      const hits = searchIndexRef.current!.search(debouncedQuery, { limit: 8 }) as number[];
      setResults(hits.map((i) => allItems[i]).filter(Boolean));
      setSelectedIndex(0);
    });
  }, [debouncedQuery, allItems]);

  const handleNavigate = useCallback(
    (path: string) => {
      setIsSearchOpen(false);
      setQuery("");
      router.push(path);
    },
    [router, setIsSearchOpen]
  );

  // 键盘导航
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "Escape":
        setIsSearchOpen(false);
        break;
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(results.length, 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + Math.max(results.length, 1)) % Math.max(results.length, 1));
        break;
      case "Enter":
        e.preventDefault();
        if (results[selectedIndex]) handleNavigate(results[selectedIndex].permalink);
        break;
    }
  };

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[14vh] px-4 no-print select-none">
      {/* 遮罩 */}
      <div
        className="absolute inset-0 bg-black/45 dark:bg-black/70"
        onClick={() => setIsSearchOpen(false)}
      />

      {/* 搜索面板 */}
      <div
        onKeyDown={handleKeyDown}
        className="relative w-full max-w-xl bg-background/80 backdrop-blur-xl border border-divider shadow-2xl flex flex-col overflow-hidden max-h-[62vh] rounded-2xl animate-search-reveal"
        role="dialog"
        aria-modal="true"
        aria-label="Search"
      >
        {/* 输入区 */}
        <div className="flex items-center gap-3 px-4 border-b border-divider h-12 shrink-0">
          <SearchIcon size={15} className="text-foreground/40 shrink-0" />
          <input
            ref={inputRef}
            id="search-input"
            type="text"
            placeholder="Search documents…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent border-0 text-sm focus:outline-none text-foreground placeholder-foreground/35"
            autoComplete="off"
          />
          <div className="flex items-center gap-2 shrink-0">
            {query && (
              <button
                onClick={() => setQuery("")}
                className="p-1 rounded text-foreground/40 hover:text-foreground transition-colors"
                aria-label="Clear"
              >
                <X size={13} />
              </button>
            )}
            <button
              onClick={() => setIsSearchOpen(false)}
              className="text-[10px] text-foreground/40 border border-divider px-1.5 py-0.5 hover:text-foreground transition-colors"
            >
              ESC
            </button>
          </div>
        </div>

        {/* 结果区 */}
        <div className="flex-1 overflow-y-auto p-2">
          {indexState === "error" ? (
            <div className="py-8 text-center flex flex-col items-center gap-2">
              <AlertCircle size={18} className="text-foreground/45" />
              <p className="text-sm text-foreground/45">
                Search index not available.
              </p>
              <p className="text-xs text-foreground/35">
                Run <code className="font-mono bg-muted px-1 py-0.5">npm run build</code> to generate it.
              </p>
            </div>
          ) : indexState === "loading" ? (
            <div className="py-8 text-center text-sm text-foreground/45">
              Loading index…
            </div>
          ) : query.trim() === "" ? (
            <div className="py-6 px-4 select-none">
              <div className="text-center text-xs text-foreground/45 mb-4.5">
                Type to search — full-text, offline.
                {allItems.length > 0 && (
                  <span className="block mt-0.5 opacity-85">
                    {allItems.length} documents indexed
                  </span>
                )}
              </div>
              <div className="border-t border-divider/40 pt-4">
                <h4 className="text-[10px] font-bold tracking-widest text-foreground/40 uppercase mb-2">
                  Popular Topics / 热门技术主题
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {["安全", "架构", "并发", "存储", "运维"].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => {
                        setQuery(tag);
                        inputRef.current?.focus();
                      }}
                      className="text-[11px] font-mono border border-divider hover:border-foreground/35 px-2.5 py-1 rounded-sm text-foreground/60 hover:text-foreground transition-all cursor-pointer bg-foreground/[0.01] dark:bg-white/[0.01]"
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="py-8 text-center text-sm text-foreground/45">
              No results for &ldquo;{query}&rdquo;
            </div>
          ) : (
            <div className="flex flex-col gap-0.5">
              {results.map((item, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <button
                    key={item.permalink}
                    ref={isSelected ? activeItemRef : undefined}
                    onClick={() => handleNavigate(item.permalink)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`flex items-start gap-3 w-full text-left px-3 py-2.5 transition-colors rounded-sm ${
                      isSelected
                        ? "bg-foreground/5 dark:bg-foreground/10"
                        : "hover:bg-foreground/[0.02] dark:hover:bg-foreground/[0.05]"
                    }`}
                  >
                    <FileText
                      size={14}
                      className={`mt-0.5 shrink-0 ${
                        isSelected
                          ? "text-foreground/80"
                          : "text-foreground/40"
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`text-sm font-medium truncate ${
                            isSelected
                              ? "text-foreground"
                              : "text-foreground/75"
                          }`}
                        >
                          {highlightText(item.title, query)}
                        </span>
                        {item.category && (
                          <span className="text-[10px] uppercase tracking-wider font-semibold text-foreground/40 px-1.5 py-0.5 border border-divider shrink-0">
                            {item.category}
                          </span>
                        )}
                      </div>
                      {item.description && (
                        <p className="text-xs text-foreground/40 truncate mt-0.5">
                          {highlightText(item.description, query)}
                        </p>
                      )}
                    </div>
                    {isSelected && (
                      <span className="text-[10px] text-foreground/40 flex items-center gap-0.5 self-center shrink-0">
                        <CornerDownLeft size={10} />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* 底部快捷键提示 */}
        {results.length > 0 && (
          <div className="border-t border-divider px-4 py-2 flex items-center gap-4 text-[10px] text-foreground/40 shrink-0">
            <span className="flex items-center gap-1"><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
            <span className="flex items-center gap-1"><kbd>↵</kbd> open</span>
            <span className="flex items-center gap-1"><kbd>ESC</kbd> close</span>
          </div>
        )}
      </div>
    </div>
  );
}

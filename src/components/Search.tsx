"use client";

import { useEffect, useState, useRef, useTransition, useCallback } from "react";
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
  if (!text) return null;
  if (!highlight.trim()) return <span className="truncate">{text}</span>;
  const escapedHighlight = highlight.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
  const regex = new RegExp(`(${escapedHighlight})`, "gi");
  const parts = text.split(regex);
  return (
    <span className="truncate">
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-foreground/15 text-foreground font-semibold px-0.5 rounded-sm bg-transparent !text-accent">
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
  const [history, setHistory] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem("kb_search_history");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
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

  // 打开时初始化索引和搜索历史
  useEffect(() => {
    if (!isSearchOpen) return;

    // 聚焦输入框
    setTimeout(() => inputRef.current?.focus(), 60);

    // 重新加载历史记录（可能在其他标签页中被修改）
    try {
      const saved = localStorage.getItem("kb_search_history");
      if (saved) {
        const parsed = JSON.parse(saved);
        // 使用 setTimeout 避免同步 setState 级联渲染
        setTimeout(() => setHistory(parsed), 0);
      }
    } catch {
      // 忽略解析错误
    }

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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      .catch(() => {
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

  // 保存搜索历史
  const saveToHistory = useCallback((q: string) => {
    const trimmed = q.trim();
    if (!trimmed) return;
    setHistory((prev) => {
      const next = [trimmed, ...prev.filter((item) => item !== trimmed)].slice(0, 5);
      localStorage.setItem("kb_search_history", JSON.stringify(next));
      return next;
    });
  }, []);

  // 清空所有搜索历史
  const clearHistory = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setHistory([]);
    localStorage.setItem("kb_search_history", JSON.stringify([]));
  }, []);

  const handleNavigate = useCallback(
    (path: string) => {
      if (query.trim()) {
        saveToHistory(query);
      }
      setIsSearchOpen(false);
      setQuery("");
      router.push(path);
    },
    [router, setIsSearchOpen, query, saveToHistory]
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
      case "Tab":
        // 焦点陷阱：阻止 Tab 离开搜索弹窗
        e.preventDefault();
        break;
    }
  };

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center pt-[10vh] px-4 sm:px-6 no-print select-none">
      {/* 遮罩 */}
      <div
        className="absolute inset-0 bg-background/50 backdrop-blur-sm"
        onClick={() => setIsSearchOpen(false)}
      />

      {/* 搜索面板 */}
      <div
        onKeyDown={handleKeyDown}
        className="relative w-full max-w-[768px] bg-background border border-[#3b82f6] shadow-[0_0_0_3px_rgba(59,130,246,0.15)] dark:border-[#3b82f6] dark:shadow-[0_0_0_3px_rgba(59,130,246,0.25)] flex flex-col overflow-hidden max-h-[85vh] rounded-xl animate-search-reveal"
        role="dialog"
        aria-modal="true"
        aria-label="搜索"
      >
        {/* 输入区 */}
        <div className="flex items-center gap-3 px-5 h-14 border-b border-divider/50 shrink-0">
          <SearchIcon size={18} className="text-foreground/35 shrink-0" />
          <input
            ref={inputRef}
            id="search-input"
            type="text"
            placeholder="键入开始搜索"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent border-0 text-base focus:outline-none focus:ring-0 focus:border-transparent text-foreground placeholder-foreground/35"
            autoComplete="off"
          />
          {query && (
            <button
              onClick={() => { setQuery(""); inputRef.current?.focus(); }}
              className="p-1 rounded-full text-foreground/35 hover:text-foreground hover:bg-foreground/5 transition-colors"
              aria-label="清除内容"
            >
              <X size={16} />
            </button>
          )}
          {!query && (
            <button
              onClick={() => setIsSearchOpen(false)}
              className="p-1 rounded-full text-foreground/35 hover:text-foreground hover:bg-foreground/5 transition-colors"
              aria-label="关闭"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* 结果区 */}
        <div className="flex-1 overflow-y-auto scroll-smooth">
          {indexState === "error" ? (
            <div className="py-12 text-center flex flex-col items-center gap-3">
              <AlertCircle size={24} className="text-destructive/60" />
              <p className="text-sm text-foreground/60">
                搜索索引加载失败。
              </p>
              <p className="text-xs text-foreground/40">
                请运行 <code className="font-mono bg-foreground/5 px-1.5 py-0.5 rounded">npm run build</code> 生成它。
              </p>
            </div>
          ) : indexState === "loading" ? (
            <div className="py-12 text-center text-sm text-foreground/40 animate-pulse">
              正在加载索引…
            </div>
          ) : query.trim() === "" ? null : results.length === 0 ? (
            <div className="py-12 text-center text-sm text-foreground/45 flex flex-col items-center gap-2">
              <SearchIcon size={24} className="text-foreground/20 mb-2" />
              未找到与 &ldquo;<span className="text-foreground font-semibold">{query}</span>&rdquo; 相关的文档
            </div>
          ) : (
            <div className="flex flex-col">
              {results.map((item, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <button
                    key={item.permalink}
                    ref={isSelected ? activeItemRef : undefined}
                    onClick={() => handleNavigate(item.permalink)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`relative flex flex-col w-full text-left px-6 py-4 transition-colors duration-150 border-b border-divider/30 last:border-b-0 outline-none focus:outline-none ${
                      isSelected
                        ? "bg-foreground/[0.03] dark:bg-foreground/[0.06]"
                        : ""
                    }`}
                  >
                    {/* 标题行：标题 + 分类面包屑 */}
                    <div className="flex items-baseline gap-3 mb-1">
                      <span className="text-base font-bold text-foreground leading-snug">
                        {highlightText(item.title, query)}
                      </span>
                      {item.category && (
                        <span className="text-xs text-foreground/40 shrink-0">
                          &gt; {item.category}
                        </span>
                      )}
                    </div>
                    {/* 正文片段 */}
                    {item.description && (
                      <p className="text-sm text-foreground/55 leading-relaxed line-clamp-3">
                        {highlightText(item.description, query)}
                      </p>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* 底部快捷键提示 */}
        {results.length > 0 && (
          <div className="border-t border-divider/50 px-6 py-2.5 flex items-center justify-center gap-6 text-xs text-foreground/40 shrink-0">
            <span className="flex items-center gap-1">↑↓ 切换</span>
            <span className="flex items-center gap-1">⏎ 选择</span>
            <span className="flex items-center gap-1">Esc 关闭</span>
          </div>
        )}
      </div>
    </div>
  );
}

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

export default function Search() {
  const router = useRouter();
  const { isSearchOpen, setIsSearchOpen } = useUI();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchItem[]>([]);
  const [allItems, setAllItems] = useState<SearchItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [indexState, setIndexState] = useState<IndexState>("idle");
  const [, startTransition] = useTransition();

  const searchIndexRef = useRef<Index | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

    const idx = new Index({ tokenize: "forward", resolution: 9 });

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
    if (!query.trim() || !searchIndexRef.current) {
      setResults([]);
      setSelectedIndex(0);
      return;
    }
    startTransition(() => {
      const hits = searchIndexRef.current!.search(query, { limit: 8 }) as number[];
      setResults(hits.map((i) => allItems[i]).filter(Boolean));
      setSelectedIndex(0);
    });
  }, [query, allItems]);

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
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[14vh] px-4 no-print animate-fade-in">
      {/* 遮罩 */}
      <div
        className="absolute inset-0 bg-zinc-950/70 dark:bg-black/80"
        onClick={() => setIsSearchOpen(false)}
      />

      {/* 搜索面板 */}
      <div
        onKeyDown={handleKeyDown}
        className="relative w-full max-w-xl bg-[#f5f5f7] dark:bg-black border border-divider shadow-2xl flex flex-col overflow-hidden max-h-[62vh]"
        role="dialog"
        aria-modal="true"
        aria-label="Search"
      >
        {/* 输入区 */}
        <div className="flex items-center gap-3 px-4 border-b border-divider h-12 shrink-0">
          <SearchIcon size={15} className="text-zinc-400 dark:text-zinc-500 shrink-0" />
          <input
            ref={inputRef}
            id="search-input"
            type="text"
            placeholder="Search documents…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent border-0 text-sm focus:outline-none text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 dark:placeholder-zinc-500"
            autoComplete="off"
          />
          <div className="flex items-center gap-2 shrink-0">
            {query && (
              <button
                onClick={() => setQuery("")}
                className="p-1 rounded text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
                aria-label="Clear"
              >
                <X size={13} />
              </button>
            )}
            <button
              onClick={() => setIsSearchOpen(false)}
              className="text-[10px] text-zinc-400 dark:text-zinc-500 border border-divider px-1.5 py-0.5 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
            >
              ESC
            </button>
          </div>
        </div>

        {/* 结果区 */}
        <div className="flex-1 overflow-y-auto p-2">
          {indexState === "error" ? (
            <div className="py-8 text-center flex flex-col items-center gap-2">
              <AlertCircle size={18} className="text-zinc-400" />
              <p className="text-sm text-zinc-400 dark:text-zinc-500">
                Search index not available.
              </p>
              <p className="text-xs text-zinc-400/70 dark:text-zinc-600">
                Run <code className="font-mono bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5">npm run build</code> to generate it.
              </p>
            </div>
          ) : indexState === "loading" ? (
            <div className="py-8 text-center text-sm text-zinc-400 dark:text-zinc-500">
              Loading index…
            </div>
          ) : query.trim() === "" ? (
            <div className="py-8 text-center text-sm text-zinc-400 dark:text-zinc-500">
              Type to search — full-text, offline.
              {allItems.length > 0 && (
                <span className="block mt-1 text-xs text-zinc-400/60 dark:text-zinc-600">
                  {allItems.length} documents indexed
                </span>
              )}
            </div>
          ) : results.length === 0 ? (
            <div className="py-8 text-center text-sm text-zinc-400 dark:text-zinc-500">
              No results for &ldquo;{query}&rdquo;
            </div>
          ) : (
            <div className="flex flex-col gap-0.5">
              {results.map((item, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <button
                    key={item.permalink}
                    onClick={() => handleNavigate(item.permalink)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`flex items-start gap-3 w-full text-left px-3 py-2.5 transition-colors rounded-sm ${
                      isSelected
                        ? "bg-zinc-100 dark:bg-zinc-850"
                        : "hover:bg-zinc-50 dark:hover:bg-zinc-900"
                    }`}
                  >
                    <FileText
                      size={14}
                      className={`mt-0.5 shrink-0 ${
                        isSelected
                          ? "text-zinc-800 dark:text-zinc-200"
                          : "text-zinc-400 dark:text-zinc-500"
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`text-sm font-medium truncate ${
                            isSelected
                              ? "text-zinc-950 dark:text-zinc-50"
                              : "text-zinc-700 dark:text-zinc-300"
                          }`}
                        >
                          {item.title}
                        </span>
                        {item.category && (
                          <span className="text-[10px] uppercase tracking-wider font-semibold text-zinc-400 dark:text-zinc-500 px-1.5 py-0.5 border border-zinc-200 dark:border-zinc-800 shrink-0">
                            {item.category}
                          </span>
                        )}
                      </div>
                      {item.description && (
                        <p className="text-xs text-zinc-400 dark:text-zinc-500 truncate mt-0.5">
                          {item.description}
                        </p>
                      )}
                    </div>
                    {isSelected && (
                      <span className="text-[10px] text-zinc-400 dark:text-zinc-500 flex items-center gap-0.5 self-center shrink-0">
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
          <div className="border-t border-divider px-4 py-2 flex items-center gap-4 text-[10px] text-zinc-400 dark:text-zinc-600 shrink-0">
            <span className="flex items-center gap-1"><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
            <span className="flex items-center gap-1"><kbd>↵</kbd> open</span>
            <span className="flex items-center gap-1"><kbd>ESC</kbd> close</span>
          </div>
        )}
      </div>
    </div>
  );
}

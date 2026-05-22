"use client";

import React, { useEffect, useState, useRef, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Search as SearchIcon, X, FileText, CornerDownLeft } from "lucide-react";
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

export default function Search() {
  const router = useRouter();
  const { isSearchOpen, setIsSearchOpen } = useUI();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchItem[]>([]);
  const [allItems, setAllItems] = useState<SearchItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPending, startTransition] = useTransition();

  const searchIndexRef = useRef<Index | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 监听 Ctrl+K / Cmd+K 快捷键
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(!isSearchOpen);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  // 当搜索框打开时，初始化索引并异步获取数据
  useEffect(() => {
    if (!isSearchOpen) return;

    // 聚焦输入框
    setTimeout(() => inputRef.current?.focus(), 50);

    if (searchIndexRef.current) return; // 已经加载过，不再重复

    // 创建 FlexSearch 单字段/多字段索引（此处针对中文与英文混合采用更普适的分词配置）
    const index = new Index({
      tokenize: "forward",
      resolution: 9,
    });

    fetch("/search-index.json")
      .then((res) => res.json())
      .then((data: SearchItem[]) => {
        setAllItems(data);
        data.forEach((item, idx) => {
          // 将关键字段拼接进行索引
          const indexContent = `${item.title} ${item.category} ${item.description} ${item.content}`;
          index.add(idx, indexContent);
        });
        searchIndexRef.current = index;
      })
      .catch((err) => console.error("Failed to load search index:", err));
  }, [isSearchOpen]);

  // 执行全文搜索检索
  useEffect(() => {
    if (!query.trim() || !searchIndexRef.current) {
      setResults([]);
      setSelectedIndex(0);
      return;
    }

    startTransition(() => {
      const index = searchIndexRef.current!;
      // 搜索索引，限制最多返回 8 个结果
      const searchResults = index.search(query, { limit: 8 });
      const matchedItems = (searchResults as number[]).map((idx) => allItems[idx]);
      setResults(matchedItems);
      setSelectedIndex(0);
    });
  }, [query, allItems]);

  // 键盘导航 (上下键、回车、ESC)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsSearchOpen(false);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(results.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + results.length) % Math.max(results.length, 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (results[selectedIndex]) {
        handleNavigate(results[selectedIndex].permalink);
      }
    }
  };

  const handleNavigate = (path: string) => {
    setIsSearchOpen(false);
    setQuery("");
    router.push(path);
  };

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4 no-print">
      {/* 遮罩层 */}
      <div
        className="absolute inset-0 bg-zinc-950/20 backdrop-blur-[1px] transition-opacity dark:bg-black/40"
        onClick={() => setIsSearchOpen(false)}
      />

      {/* 搜索面板 */}
      <div
        ref={containerRef}
        onKeyDown={handleKeyDown}
        className="relative w-full max-w-xl bg-background border border-divider shadow-2xl flex flex-col overflow-hidden max-h-[60vh]"
      >
        {/* 输入区 */}
        <div className="flex items-center gap-3 px-4 border-b border-divider h-12">
          <SearchIcon size={16} className="text-zinc-400 dark:text-zinc-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search documents... (Ctrl+K)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent border-0 text-sm focus:outline-none text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 dark:placeholder-zinc-500"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* 结果展示区 */}
        <div className="flex-1 overflow-y-auto p-2">
          {query.trim() === "" ? (
            <div className="py-8 text-center text-sm text-zinc-400 dark:text-zinc-500">
              Type to search... Supports full-text offline search.
            </div>
          ) : isPending ? (
            <div className="py-8 text-center text-sm text-zinc-400 dark:text-zinc-500">
              Searching...
            </div>
          ) : results.length === 0 ? (
            <div className="py-8 text-center text-sm text-zinc-400 dark:text-zinc-500">
              No results found for &ldquo;{query}&rdquo;
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
                    className={`flex items-start gap-3 w-full text-left p-3 transition-colors ${
                      isSelected
                        ? "bg-zinc-100 dark:bg-zinc-800/60"
                        : "hover:bg-zinc-50 dark:hover:bg-zinc-900/30"
                    }`}
                  >
                    <FileText
                      size={16}
                      className={`mt-0.5 shrink-0 ${
                        isSelected
                          ? "text-zinc-950 dark:text-zinc-50"
                          : "text-zinc-400 dark:text-zinc-500"
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`text-sm font-medium truncate ${
                            isSelected ? "text-zinc-950 dark:text-zinc-50" : "text-zinc-700 dark:text-zinc-300"
                          }`}
                        >
                          {item.title}
                        </span>
                        {item.category && (
                          <span className="text-[10px] uppercase tracking-wider font-semibold text-zinc-400 px-1.5 py-0.5 border border-zinc-200 dark:border-zinc-800 shrink-0">
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
                        <CornerDownLeft size={10} /> Enter
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

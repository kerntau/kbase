"use client";

import React from "react";
import Link from "next/link";
import { Menu, Search as SearchIcon, List } from "lucide-react";
import { useUI } from "@/context/UIContext";
import Sidebar from "./Sidebar";
import TableOfContents from "./TableOfContents";
import MobileDrawer from "./MobileDrawer";
import Search from "./Search";
import { TreeNode } from "@/utils/tree";

interface WikiShellProps {
  tree: TreeNode[];
  children: React.ReactNode;
}

export default function WikiShell({ tree, children }: WikiShellProps) {
  const {
    isMobileSidebarOpen,
    setIsMobileSidebarOpen,
    isMobileTOCOpen,
    setIsMobileTOCOpen,
    setIsSearchOpen,
    currentToc,
  } = useUI();

  const hasToc = currentToc && currentToc.length > 0;

  return (
    <div className="min-h-screen flex flex-col">
      {/* 移动端 Header - 克制且仅在小屏下显示 */}
      <header className="md:hidden sticky top-0 z-40 bg-background/95 backdrop-blur-[2px] border-b border-divider px-4 h-14 flex items-center justify-between select-none no-print">
        <button
          onClick={() => setIsMobileSidebarOpen(true)}
          className="p-1 rounded-md text-zinc-500 hover:text-zinc-900 transition-colors focus:outline-none dark:text-zinc-400 dark:hover:text-zinc-100"
          aria-label="Open directory"
        >
          <Menu size={18} />
        </button>

        <Link
          href="/"
          className="font-serif text-base tracking-tight font-medium text-zinc-900 dark:text-zinc-100"
        >
          Knowledge Base
        </Link>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-1 rounded-md text-zinc-500 hover:text-zinc-900 transition-colors focus:outline-none dark:text-zinc-400 dark:hover:text-zinc-100"
            aria-label="Search"
          >
            <SearchIcon size={18} />
          </button>
          
          {hasToc ? (
            <button
              onClick={() => setIsMobileTOCOpen(true)}
              className="p-1 rounded-md text-zinc-500 hover:text-zinc-900 transition-colors focus:outline-none dark:text-zinc-400 dark:hover:text-zinc-100"
              aria-label="Open table of contents"
            >
              <List size={18} />
            </button>
          ) : (
            <div className="w-7" /> // 保持平衡占位
          )}
        </div>
      </header>

      {/* 桌面端/整体内容区 */}
      <div className="flex-1 flex max-w-[1440px] w-full mx-auto px-4 md:px-6 lg:px-8">
        
        {/* 左侧侧边栏 - 桌面端常驻 */}
        <aside className="hidden md:flex md:w-64 lg:w-72 flex-col border-r border-divider sticky top-0 h-screen select-none shrink-0 pr-4 overflow-y-auto no-print">
          {/* 桌面端顶部标题 */}
          <div className="py-6 border-b border-divider/50 flex flex-col gap-2">
            <Link
              href="/"
              className="font-serif text-lg tracking-tight font-medium text-zinc-900 dark:text-zinc-100"
            >
              Knowledge Base
            </Link>
            
            {/* 快速搜索入口 */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center justify-between gap-2 px-3 py-1.5 border border-divider text-left text-xs text-zinc-400 hover:text-zinc-700 hover:border-zinc-400 dark:text-zinc-500 dark:hover:text-zinc-300 dark:hover:border-zinc-600 transition-colors focus:outline-none mt-2"
            >
              <span className="flex items-center gap-1.5">
                <SearchIcon size={12} />
                Search...
              </span>
              <kbd className="text-[10px] opacity-70">Ctrl+K</kbd>
            </button>
          </div>
          
          <Sidebar tree={tree} />
        </aside>

        {/* 中间主要正文区 */}
        <main className="flex-1 min-w-0 flex justify-center py-6 md:py-10 px-0 md:px-8 lg:px-12">
          <div className="w-full max-w-3xl min-h-full flex flex-col">
            {children}
          </div>
        </main>

        {/* 右侧大纲 - 桌面端常驻 */}
        <aside className="hidden xl:flex xl:w-60 flex-col sticky top-0 h-screen select-none shrink-0 pl-6 pt-6 overflow-y-auto no-print">
          {hasToc && <TableOfContents toc={currentToc} />}
        </aside>
      </div>

      {/* 移动端滑出抽屉 */}
      <MobileDrawer
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
        title="Directory"
        side="left"
      >
        <Sidebar tree={tree} />
      </MobileDrawer>

      <MobileDrawer
        isOpen={isMobileTOCOpen}
        onClose={() => setIsMobileTOCOpen(false)}
        title="Table of Contents"
        side="right"
      >
        <TableOfContents toc={currentToc} />
      </MobileDrawer>

      {/* 全局检索弹窗 */}
      <Search />
    </div>
  );
}

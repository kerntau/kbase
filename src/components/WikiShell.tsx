"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Menu,
  Search as SearchIcon,
  List,
  Home,
  ArrowLeft,
  ArrowRight,
  PanelLeftClose,
  PanelLeft,
} from "lucide-react";
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
  const router = useRouter();
  const {
    isMobileSidebarOpen,
    setIsMobileSidebarOpen,
    isMobileTOCOpen,
    setIsMobileTOCOpen,
    setIsSearchOpen,
    currentToc,
  } = useUI();

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // 从 localStorage 恢复折叠状态
  useEffect(() => {
    const saved = localStorage.getItem("kb_sidebar_collapsed");
    if (saved === "true") {
      setIsSidebarCollapsed(true);
    }
  }, []);

  const handleToggleSidebar = (collapsed: boolean) => {
    setIsSidebarCollapsed(collapsed);
    localStorage.setItem("kb_sidebar_collapsed", String(collapsed));
  };

  const hasToc = currentToc && currentToc.length > 0;

  return (
    <div className="min-h-screen flex flex-col">
      {/* 移动端 Header - 克制且仅在小屏下显示 */}
      <header className="md:hidden sticky top-0 z-40 bg-background border-b border-divider px-4 h-14 flex items-center justify-between select-none no-print">
        <button
          id="mobile-sidebar-toggle"
          onClick={() => setIsMobileSidebarOpen(true)}
          className="p-1.5 rounded-md text-foreground/60 hover:text-foreground hover:bg-foreground/5 dark:hover:bg-foreground/10 transition-colors focus:outline-none"
          aria-label="Open directory"
        >
          <Menu size={18} />
        </button>

        <Link
          href="/kb"
          className="flex items-center gap-2 font-serif text-base tracking-tight font-medium text-foreground hover:text-foreground/75 transition-colors"
        >
          <img src="/logo.png" alt="Logo" className="w-5 h-5 object-contain" />
          <span>Knowledge Base</span>
        </Link>

        <div className="flex items-center gap-1">
          <button
            id="mobile-search-toggle"
            onClick={() => setIsSearchOpen(true)}
            className="p-1.5 rounded-md text-foreground/60 hover:text-foreground hover:bg-foreground/5 dark:hover:bg-foreground/10 transition-colors focus:outline-none"
            aria-label="Search"
          >
            <SearchIcon size={18} />
          </button>

          {hasToc ? (
            <button
              id="mobile-toc-toggle"
              onClick={() => setIsMobileTOCOpen(true)}
              className="p-1.5 rounded-md text-foreground/60 hover:text-foreground hover:bg-foreground/5 dark:hover:bg-foreground/10 transition-colors focus:outline-none"
              aria-label="Open table of contents"
            >
              <List size={18} />
            </button>
          ) : (
            <div className="w-8" />
          )}
        </div>
      </header>

      {/* 主内容区 */}
      <div className="flex-1 flex max-w-[1440px] w-full mx-auto px-4 md:px-6 lg:px-8">
        
        {/* 左侧侧边栏 - 桌面常驻，支持折叠与过渡动效 */}
        <aside
          className={`hidden md:flex flex-col border-r border-divider sticky top-0 h-screen select-none shrink-0 no-print transition-all duration-300 ease-in-out overflow-hidden ${
            isSidebarCollapsed ? "w-0 border-r-0 opacity-0 pr-0" : "w-64 lg:w-72 pr-4"
          }`}
        >
          {/* 侧栏头部菜单 */}
          <div className="py-6 border-b border-divider/50 flex flex-col gap-2 shrink-0">
            <div className="flex items-center justify-between gap-2">
              <Link
                href="/kb"
                className="flex items-center gap-2 font-serif text-lg tracking-tight font-medium text-foreground hover:text-foreground/75 transition-colors"
              >
                <img src="/logo.png" alt="Logo" className="w-6 h-6 object-contain" />
                <span>Knowledge Base</span>
              </Link>
              <button
                onClick={() => handleToggleSidebar(true)}
                className="p-1 rounded-md text-foreground/45 hover:text-foreground hover:bg-foreground/5 dark:hover:bg-foreground/10 transition-colors cursor-pointer"
                title="Collapse Sidebar (Ctrl+[)"
              >
                <PanelLeftClose size={16} />
              </button>
            </div>

            {/* 搜索入口 */}
            <button
              id="desktop-search-btn"
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center justify-between gap-2 px-3 py-1.5 border border-divider text-left text-xs text-foreground/40 hover:text-foreground hover:border-foreground/40 transition-colors focus:outline-none mt-2 cursor-pointer w-full"
            >
              <span className="flex items-center gap-1.5">
                <SearchIcon size={12} />
                Search...
              </span>
              <kbd className="text-[10px] opacity-60 font-mono">Ctrl K</kbd>
            </button>
          </div>

          {/* 树状项目目录区 */}
          <div className="flex-1 overflow-y-auto min-h-0">
            <Sidebar tree={tree} />
          </div>

          {/* 底部常驻回到官网 Portal 入口 */}
          <div className="mt-auto py-4 border-t border-divider/50 flex items-center justify-between gap-2 shrink-0">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-xs text-foreground/50 hover:text-foreground transition-colors font-mono cursor-pointer"
              title="Return to Portal"
            >
              <Home size={14} />
              Back to Portal
            </Link>
          </div>
        </aside>

        {/* 中间正文区 */}
        <main className="flex-1 min-w-0 flex justify-center py-4 md:py-6 px-0 sm:px-4 md:px-6">
          <div className="w-full max-w-4xl min-h-full flex flex-col">
            
            {/* 历史导航工具条 */}
            <div className="hidden md:flex items-center gap-2 mb-4 shrink-0 select-none">
              {isSidebarCollapsed && (
                <button
                  onClick={() => handleToggleSidebar(false)}
                  className="p-1 rounded-md text-foreground/45 hover:text-foreground hover:bg-foreground/5 dark:hover:bg-foreground/10 transition-colors cursor-pointer mr-1"
                  title="Expand Sidebar"
                >
                  <PanelLeft size={16} />
                </button>
              )}
              <button
                onClick={() => {
                  if (document.referrer.includes(window.location.host)) {
                    window.history.back();
                  } else {
                    router.push('/kb');
                  }
                }}
                className="p-1 rounded-md text-foreground/45 hover:text-foreground hover:bg-foreground/5 dark:hover:bg-foreground/10 transition-colors cursor-pointer"
                title="Go Back"
              >
                <ArrowLeft size={15} />
              </button>
              <button
                onClick={() => window.history.forward()}
                className="p-1 rounded-md text-foreground/45 hover:text-foreground hover:bg-foreground/5 dark:hover:bg-foreground/10 transition-colors cursor-pointer"
                title="Go Forward"
              >
                <ArrowRight size={15} />
              </button>
            </div>

            {children}
          </div>
        </main>

        {/* 右侧大纲 - 桌面常驻 */}
        <aside className="hidden xl:flex xl:w-60 flex-col sticky top-0 h-screen select-none shrink-0 pl-6 pt-6 overflow-y-auto no-print">
          {hasToc && <TableOfContents toc={currentToc} />}
        </aside>
      </div>

      {/* 移动端侧边栏抽屉 */}
      <MobileDrawer
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
        title="Directory"
        side="left"
      >
        <Sidebar tree={tree} />
      </MobileDrawer>

      {/* 移动端目录抽屉 */}
      <MobileDrawer
        isOpen={isMobileTOCOpen}
        onClose={() => setIsMobileTOCOpen(false)}
        title="On This Page"
        side="right"
      >
        <TableOfContents toc={currentToc} />
      </MobileDrawer>

      {/* 全局搜索弹窗 */}
      <Search />
    </div>
  );
}

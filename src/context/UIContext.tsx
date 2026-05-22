"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { VeliteTocItem } from "@/components/TableOfContents";

interface UIContextType {
  isMobileSidebarOpen: boolean;
  setIsMobileSidebarOpen: (open: boolean) => void;
  isMobileTOCOpen: boolean;
  setIsMobileTOCOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  expandedNodes: Record<string, boolean>;
  toggleNode: (path: string) => void;
  currentToc: VeliteTocItem[];
  setCurrentToc: (toc: VeliteTocItem[]) => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isMobileTOCOpen, setIsMobileTOCOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({});
  const [currentToc, setCurrentToc] = useState<VeliteTocItem[]>([]);

  // 从 localStorage 恢复展开节点状态，以确保刷新或重新加载时状态得以保持
  useEffect(() => {
    const saved = localStorage.getItem("kb_expanded_nodes");
    if (saved) {
      try {
        setExpandedNodes(JSON.parse(saved));
      } catch (e) {
        // 忽略解析错误
      }
    }
  }, []);

  const toggleNode = (path: string) => {
    setExpandedNodes((prev) => {
      const next = { ...prev, [path]: !prev[path] };
      localStorage.setItem("kb_expanded_nodes", JSON.stringify(next));
      return next;
    });
  };

  return (
    <UIContext
      value={{
        isMobileSidebarOpen,
        setIsMobileSidebarOpen,
        isMobileTOCOpen,
        setIsMobileTOCOpen,
        isSearchOpen,
        setIsSearchOpen,
        expandedNodes,
        toggleNode,
        currentToc,
        setCurrentToc,
      }}
    >
      {children}
    </UIContext>
  );
}

export function useUI() {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error("useUI must be used within a UIProvider");
  }
  return context;
}

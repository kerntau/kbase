"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
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
  expandNode: (path: string) => void;
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

  // 从 localStorage 恢复展开节点状态
  useEffect(() => {
    const saved = localStorage.getItem("kb_expanded_nodes");
    if (saved) {
      try {
        setExpandedNodes(JSON.parse(saved));
      } catch {
        // 忽略解析错误
      }
    }
  }, []);

  const toggleNode = useCallback((path: string) => {
    setExpandedNodes((prev) => {
      const next = { ...prev, [path]: !prev[path] };
      localStorage.setItem("kb_expanded_nodes", JSON.stringify(next));
      return next;
    });
  }, []);

  // 幂等展开节点（仅展开，不会折叠已展开的节点）
  const expandNode = useCallback((path: string) => {
    setExpandedNodes((prev) => {
      if (prev[path]) return prev; // 已展开，不做任何操作
      const next = { ...prev, [path]: true };
      localStorage.setItem("kb_expanded_nodes", JSON.stringify(next));
      return next;
    });
  }, []);

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
        expandNode,
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

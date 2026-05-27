"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { VeliteTocItem } from "@/components/TableOfContents";
import { TreeNode } from "@/utils/tree";

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
  toggleExpandAll: (tree: TreeNode[]) => void;
  currentToc: VeliteTocItem[];
  setCurrentToc: (toc: VeliteTocItem[]) => void;
  theme: "light" | "dark" | "system";
  setTheme: (theme: "light" | "dark" | "system") => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isMobileTOCOpen, setIsMobileTOCOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>(() => {
    if (typeof window === "undefined") return {};
    try {
      const saved = localStorage.getItem("kb_expanded_nodes");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [currentToc, setCurrentToc] = useState<VeliteTocItem[]>([]);
  const [theme, setThemeState] = useState<"light" | "dark" | "system">(() => {
    if (typeof window === "undefined") return "system";
    try {
      return (localStorage.getItem("kb_theme") as "light" | "dark" | "system") || "system";
    } catch {
      return "system";
    }
  });



  // 监听并应用主题变化
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    const applySystemTheme = () => {
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.remove("light", "dark");
      root.classList.add(systemDark ? "dark" : "light");
    };

    if (theme === "system") {
      applySystemTheme();
      const mql = window.matchMedia("(prefers-color-scheme: dark)");
      mql.addEventListener("change", applySystemTheme);
      return () => mql.removeEventListener("change", applySystemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  const setTheme = useCallback((newTheme: "light" | "dark" | "system") => {
    setThemeState(newTheme);
    localStorage.setItem("kb_theme", newTheme);
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

  const toggleExpandAll = useCallback((tree: TreeNode[]) => {
    setExpandedNodes((prev) => {
      const expandedKeys = Object.keys(prev).filter((k) => prev[k]);
      if (expandedKeys.length > 0) {
        localStorage.setItem("kb_expanded_nodes", JSON.stringify({}));
        return {};
      } else {
        const next: Record<string, boolean> = {};
        const traverse = (nodes: TreeNode[]) => {
          nodes.forEach((node) => {
            if (node.isFolder) {
              next[node.path] = true;
              if (node.children) traverse(node.children);
            }
          });
        };
        traverse(tree);
        localStorage.setItem("kb_expanded_nodes", JSON.stringify(next));
        return next;
      }
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
        toggleExpandAll,
        currentToc,
        setCurrentToc,
        theme,
        setTheme,
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

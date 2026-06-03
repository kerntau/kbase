"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  FileText,
  Folder,
  FolderOpen,
} from "lucide-react";
import { useUI } from "@/context/UIContext";
import { TreeNode } from "@/utils/tree";

interface SidebarProps {
  tree: TreeNode[];
}

// 规范化路径：统一去掉尾部斜杠，小写比较
function normalizePath(p: string) {
  return p.replace(/\/+$/, "").toLowerCase();
}

export default function Sidebar({ tree }: SidebarProps) {
  const pathname = usePathname();
  const { expandedNodes, toggleNode, expandNode, setIsMobileSidebarOpen } = useUI();
  const activeLinkRef = useRef<HTMLAnchorElement | null>(null);

  // 路径改变后，自动滚动居中当前激活项
  useEffect(() => {
    if (activeLinkRef.current) {
      const timer = setTimeout(() => {
        activeLinkRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 180);
      return () => clearTimeout(timer);
    }
  }, [pathname]);


  // 当前路径变化时，自动展开所有祖先文件夹
  useEffect(() => {
    const active = normalizePath(decodeURIComponent(pathname));

    const findAndExpand = (nodes: TreeNode[], ancestors: string[]): boolean => {
      for (const node of nodes) {
        if (node.isFolder) {
          const found = findAndExpand(node.children || [], [...ancestors, node.path]);
          if (found) return true;
        } else {
          if (normalizePath(node.path) === active) {
            ancestors.forEach((p) => expandNode(p));
            return true;
          }
        }
      }
      return false;
    };

    findAndExpand(tree, []);
  }, [pathname, tree, expandNode]);

  const renderTree = useCallback((nodes: TreeNode[], depth = 0) => {
    return nodes.map((node) => {
      const isExpanded = !!expandedNodes[node.path];
      const indent = { paddingLeft: `${depth * 14 + 8}px` };
      const active = normalizePath(decodeURIComponent(pathname));

      if (node.isFolder) {
        return (
          <div key={node.path} className="flex flex-col">
            <button
              onClick={() => toggleNode(node.path)}
              style={indent}
              className="group flex w-full items-center gap-2 py-1.5 pr-2 text-left text-sm rounded-md text-foreground/60 hover:text-foreground hover:bg-foreground/[0.04] dark:hover:bg-foreground/[0.08] transition-all duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-foreground/30 select-none"
              aria-expanded={isExpanded}
            >
              <span className="text-foreground/40 shrink-0 transition-transform duration-200" style={{ transform: isExpanded ? "rotate(0deg)" : "rotate(-90deg)" }}>
                <ChevronDown size={13} />
              </span>
              <span className="text-foreground/40 shrink-0">
                {isExpanded ? <FolderOpen size={13} /> : <Folder size={13} />}
              </span>
              <span className="font-medium tracking-tight truncate">{node.title}</span>
              {node.docCount !== undefined && (
                <span className="ml-auto text-[10px] font-mono text-foreground/35 select-none" title={`包含 ${node.docCount} 篇文档`}>
                  {node.docCount}
                </span>
              )}
            </button>

            {/* 展开内容带高度过渡 */}
            <div
              className="grid transition-all duration-300 ease-in-out"
              style={{ gridTemplateRows: isExpanded ? "1fr" : "0fr", opacity: isExpanded ? 1 : 0 }}
            >
              <div className="overflow-hidden">
                <div className="flex flex-col relative before:absolute before:left-[14px] before:top-0 before:bottom-0 before:w-px before:bg-divider/50">
                  {renderTree(node.children || [], depth + 1)}
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        const isActive = normalizePath(node.path) === active;

        return (
          <Link
            key={node.path}
            href={node.path}
            onClick={() => setIsMobileSidebarOpen(false)}
            ref={isActive ? activeLinkRef : undefined}
            style={indent}
            className={`relative flex items-center gap-2 py-1.5 pr-2 text-sm rounded-md transition-all duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-foreground/30 ${
              isActive
                ? "font-semibold text-foreground bg-foreground/[0.06] dark:bg-foreground/[0.12] before:absolute before:left-0 before:top-1.5 before:bottom-1.5 before:w-1 before:bg-foreground before:rounded-r-md"
                : "text-foreground/60 hover:text-foreground hover:bg-foreground/[0.04] dark:hover:bg-foreground/[0.08]"
            }`}
            aria-current={isActive ? "page" : undefined}
          >
            <span className={`shrink-0 ${isActive ? "text-foreground/80" : "text-foreground/40"}`}>
              <FileText size={13} />
            </span>
            <span className="truncate leading-tight">{node.title}</span>
            {isActive && (
              <span className="ml-auto w-1 h-1 rounded-full bg-foreground/80 shrink-0" />
            )}
          </Link>
        );
      }
    });
  }, [expandedNodes, pathname, toggleNode, setIsMobileSidebarOpen]);

  return (
    <nav className="w-full flex flex-col gap-0.5 py-4 select-none" aria-label="Document tree">
      {tree.length === 0 ? (
        <p className="text-sm text-foreground/40 px-2 italic">
          暂无文档
        </p>
      ) : (
        renderTree(tree)
      )}
    </nav>
  );
}

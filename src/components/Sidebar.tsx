"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  ChevronRight,
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

  const renderTree = (nodes: TreeNode[], depth = 0) => {
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
              className="flex w-full items-center gap-2 py-1.5 pr-2 text-left text-sm rounded-sm text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-100 focus:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400 select-none"
              aria-expanded={isExpanded}
            >
              <span className="text-zinc-400 dark:text-zinc-500 shrink-0 transition-transform duration-200" style={{ transform: isExpanded ? "rotate(0deg)" : "rotate(-90deg)" }}>
                <ChevronDown size={13} />
              </span>
              <span className="text-zinc-400 dark:text-zinc-500 shrink-0">
                {isExpanded ? <FolderOpen size={13} /> : <Folder size={13} />}
              </span>
              <span className="font-medium tracking-tight truncate">{node.title}</span>
            </button>

            {/* 展开内容带高度过渡 */}
            <div
              className="overflow-hidden transition-all duration-200 ease-out"
              style={{ maxHeight: isExpanded ? "9999px" : "0px", opacity: isExpanded ? 1 : 0 }}
            >
              <div className="flex flex-col relative before:absolute before:left-[14px] before:top-0 before:bottom-0 before:w-px before:bg-zinc-200/60 dark:before:bg-zinc-800/60">
                {renderTree(node.children || [], depth + 1)}
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
            style={indent}
            className={`flex items-center gap-2 py-1.5 pr-2 text-sm rounded-sm transition-colors duration-100 focus:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400 ${
              isActive
                ? "font-semibold text-zinc-950 dark:text-zinc-50 bg-zinc-100 dark:bg-zinc-800"
                : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800"
            }`}
            aria-current={isActive ? "page" : undefined}
          >
            <span className={`shrink-0 ${isActive ? "text-zinc-800 dark:text-zinc-200" : "text-zinc-400 dark:text-zinc-500"}`}>
              <FileText size={13} />
            </span>
            <span className="truncate leading-tight">{node.title}</span>
            {isActive && (
              <span className="ml-auto w-1 h-1 rounded-full bg-zinc-800 dark:bg-zinc-200 shrink-0" />
            )}
          </Link>
        );
      }
    });
  };

  return (
    <nav className="w-full flex flex-col gap-0.5 py-4 select-none" aria-label="Document tree">
      {tree.length === 0 ? (
        <p className="text-sm text-zinc-400 dark:text-zinc-600 px-2 italic">
          No documents found
        </p>
      ) : (
        renderTree(tree)
      )}
    </nav>
  );
}

"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight, FileText, Folder, FolderOpen } from "lucide-react";
import { useUI } from "@/context/UIContext";
import { TreeNode } from "@/utils/tree";

interface SidebarProps {
  tree: TreeNode[];
}

export default function Sidebar({ tree }: SidebarProps) {
  const pathname = usePathname();
  const { expandedNodes, toggleNode, setIsMobileSidebarOpen } = useUI();

  // 根据当前路径自动展开父级目录
  useEffect(() => {
    // 找出匹配当前 pathname 的所有父级文件夹路径
    const activePath = decodeURIComponent(pathname);
    const expandParents = (nodes: TreeNode[], parentPaths: string[] = []): boolean => {
      for (const node of nodes) {
        if (node.isFolder) {
          const matched = expandParents(node.children || [], [...parentPaths, node.path]);
          if (matched) {
            // 如果子孙节点匹配，我们需要确保当前目录及父目录都展开
            parentPaths.forEach((p) => {
              if (!expandedNodes[p]) {
                toggleNode(p);
              }
            });
            if (!expandedNodes[node.path]) {
              toggleNode(node.path);
            }
            return true;
          }
        } else {
          // 如果文件节点的 path 精确匹配当前路由
          if (node.path === activePath || (node.path + "/").replace(/\/+$/, "/") === activePath.replace(/\/+$/, "/")) {
            return true;
          }
        }
      }
      return false;
    };

    expandParents(tree);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, tree]);

  const renderTree = (nodes: TreeNode[], depth = 0) => {
    return nodes.map((node) => {
      const isExpanded = !!expandedNodes[node.path];
      const indentClass = depth > 0 ? { paddingLeft: `${depth * 12 + 8}px` } : { paddingLeft: "8px" };

      if (node.isFolder) {
        return (
          <div key={node.path} className="flex flex-col">
            <button
              onClick={() => toggleNode(node.path)}
              className="flex w-full items-center gap-2 py-1.5 pr-2 text-left text-sm text-zinc-600 transition-colors hover:text-zinc-900 focus:outline-none dark:text-zinc-400 dark:hover:text-zinc-100"
              style={indentClass}
            >
              <span className="text-zinc-400 dark:text-zinc-500">
                {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </span>
              <span className="text-zinc-400 dark:text-zinc-500">
                {isExpanded ? <FolderOpen size={14} /> : <Folder size={14} />}
              </span>
              <span className="font-medium tracking-tight truncate">{node.title}</span>
            </button>

            {isExpanded && node.children && (
              <div className="flex flex-col relative before:absolute before:left-3 before:top-0 before:bottom-0 before:w-px before:bg-zinc-200/60 dark:before:bg-zinc-800/60">
                {renderTree(node.children, depth + 1)}
              </div>
            )}
          </div>
        );
      } else {
        const activePath = decodeURIComponent(pathname);
        const isActive = node.path === activePath || (node.path + "/").replace(/\/+$/, "/") === activePath.replace(/\/+$/, "/");

        return (
          <Link
            key={node.path}
            href={node.path}
            onClick={() => setIsMobileSidebarOpen(false)} // 点击文件后关闭移动端侧栏
            className={`flex items-center gap-2 py-1.5 pr-2 text-sm transition-colors focus:outline-none ${
              isActive
                ? "font-semibold text-zinc-950 dark:text-zinc-50"
                : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            }`}
            style={indentClass}
          >
            <span className={isActive ? "text-zinc-950 dark:text-zinc-50" : "text-zinc-400 dark:text-zinc-500"}>
              <FileText size={14} />
            </span>
            <span className="truncate leading-tight">{node.title}</span>
          </Link>
        );
      }
    });
  };

  return (
    <div className="w-full flex flex-col gap-1.5 py-4 select-none">
      {tree.length === 0 ? (
        <p className="text-sm text-zinc-400 dark:text-zinc-600 px-2 italic">No documents found</p>
      ) : (
        renderTree(tree)
      )}
    </div>
  );
}

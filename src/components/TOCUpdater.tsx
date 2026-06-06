"use client";

import { useEffect } from "react";
import { useUI, VeliteTocItem } from "@/context/UIContext";

interface TOCUpdaterProps {
  toc: VeliteTocItem[];
  title?: string;
}

export default function TOCUpdater({ toc, title }: TOCUpdaterProps) {
  const { setCurrentToc, setPageTitle } = useUI();

  useEffect(() => {
    // 渲染时将当前文章的 TOC 与标题存入 Context
    setCurrentToc(toc);
    if (title) setPageTitle(title);
    
    // 卸载时清空
    return () => {
      setCurrentToc([]);
      setPageTitle("");
    };
  }, [toc, title, setCurrentToc, setPageTitle]);

  return null; // 此组件仅作状态同步，不渲染任何 DOM
}

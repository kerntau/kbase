"use client";

import { useEffect } from "react";
import { useUI } from "@/context/UIContext";
import { VeliteTocItem } from "@/components/TableOfContents";

interface TOCUpdaterProps {
  toc: VeliteTocItem[];
}

export default function TOCUpdater({ toc }: TOCUpdaterProps) {
  const { setCurrentToc } = useUI();

  useEffect(() => {
    // 渲染时将当前文章的 TOC 存入 Context
    setCurrentToc(toc);
    
    // 卸载时清空 TOC
    return () => {
      setCurrentToc([]);
    };
  }, [toc, setCurrentToc]);

  return null; // 此组件仅作状态同步，不渲染任何 DOM
}

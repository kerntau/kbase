"use client";

import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  side: "left" | "right";
  children: React.ReactNode;
}

export default function MobileDrawer({
  isOpen,
  onClose,
  title,
  side,
  children,
}: MobileDrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // 禁止背景滚动
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.touchAction = "none";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.touchAction = "";
      document.body.style.touchAction = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.touchAction = "";
      document.body.style.touchAction = "";
    };
  }, [isOpen]);

  // ESC 键关闭
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const slideClass =
    side === "left" ? "animate-slide-in-left" : "animate-slide-in-right";
  const positionClass = side === "left" ? "left-0 border-r" : "right-0 border-l";

  return (
    <div className="fixed inset-0 z-50 flex no-print">
      {/* 遮罩层 */}
      <div
        className="absolute inset-0 bg-background/50 backdrop-blur-sm animate-fade-in-overlay"
        onClick={onClose}
      />

      {/* 抽屉面板 */}
      <div
        ref={panelRef}
        className={`absolute top-0 bottom-0 w-80 max-w-[85vw] bg-background/95 dark:bg-background/90 backdrop-blur-2xl border-divider flex flex-col p-5 shadow-[0_0_60px_-15px_rgba(0,0,0,0.3)] ${positionClass} ${slideClass}`}
      >
        {/* 头部区 */}
        <div className="flex items-center justify-between border-b border-divider pb-3 mb-2">
          <span className="text-xs font-semibold tracking-wider text-foreground/45 uppercase">
            {title}
          </span>
          <button
            onClick={onClose}
            className="p-1 -mr-1 rounded-md text-foreground/45 hover:text-foreground transition-colors focus:outline-none"
            aria-label="关闭"
          >
            <X size={16} />
          </button>
        </div>

        {/* 内容滚动区 */}
        <div className="flex-1 overflow-y-auto min-h-0">{children}</div>
      </div>
    </div>
  );
}

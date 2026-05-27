"use client";

import React, { useEffect, useState } from "react";

export default function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const totalScroll = scrollHeight - clientHeight;
      
      if (totalScroll > 0) {
        const currentProgress = (scrollTop / totalScroll) * 100;
        setProgress(Math.min(100, Math.max(0, currentProgress)));
      } else {
        setProgress(0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // 首次载入先计算一次
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2.5px] z-50 pointer-events-none transition-transform duration-75 ease-out bg-accent origin-left"
      style={{ transform: `scaleX(${progress / 100})` }}
      aria-hidden="true"
    />
  );
}

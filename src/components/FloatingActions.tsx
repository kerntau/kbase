"use client";

import { useEffect, useState, useRef } from "react";
import { Home, ChevronUp } from "lucide-react";
import { useRouter } from "next/navigation";

export default function FloatingActions() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const hoveringRef = useRef(hovering);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Keep ref in sync with state
  useEffect(() => { hoveringRef.current = hovering; }, [hovering]);

  const resetHideTimer = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
    hideTimeoutRef.current = setTimeout(() => {
      if (!hoveringRef.current) {
        setVisible(false);
      }
    }, 2500);
  };

  // Register scroll listener only once; use ref for hovering state
  useEffect(() => {
    const handleScroll = () => {
      // 只要滚动了超过 150px，便显示该组件
      setVisible(window.scrollY > 150);
      resetHideTimer();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMouseEnter = () => {
    setHovering(true);
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
  };

  const handleMouseLeave = () => {
    setHovering(false);
    resetHideTimer();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goHome = () => {
    router.push("/kb");
  };

  return (
    <>
      <div
        className={`fixed z-50 flex flex-col items-center bg-background/65 rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.04)] backdrop-blur-lg transition-all duration-300 ease-out hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] ${
          visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-3.5 pointer-events-none"
        }`}
        id="floating-capsule"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Back to index */}
        <button
          onClick={goHome}
          className="flex items-center justify-center text-foreground/50 hover:text-accent transition-all duration-200 active:scale-90 cursor-pointer"
          id="capsule-btn-home"
          aria-label="返回索引"
          title="返回索引"
        >
          <Home size={16} strokeWidth={2.2} />
        </button>

        {/* 分割线 */}
        <div className="w-[50%] h-[1px] bg-border/50" />

        {/* Back to top */}
        <button
          onClick={scrollToTop}
          className="flex items-center justify-center text-foreground/50 hover:text-accent transition-all duration-200 active:scale-90 cursor-pointer"
          id="capsule-btn-top"
          aria-label="回到顶部"
          title="回到顶部"
        >
          <ChevronUp size={18} strokeWidth={2.5} />
        </button>
      </div>

      <style>{`
        #floating-capsule {
          right: var(--layout-floating-mobile-right, 0.8rem);
          bottom: var(--layout-floating-mobile-bottom, 1.2rem);
          padding: 6px 0;
          width: 38px;
          gap: 6px;
          border: 1px solid rgba(0, 0, 0, 0.05);
        }
        .dark #floating-capsule {
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        #capsule-btn-home, #capsule-btn-top {
          width: 36px;
          height: 32px;
        }
        @media (min-width: 640px) {
          #floating-capsule {
            right: var(--layout-floating-right, 1.2rem);
            bottom: var(--layout-floating-bottom, 1.8rem);
            padding: 8px 0;
            width: 42px;
            gap: 8px;
          }
          #capsule-btn-home, #capsule-btn-top {
            width: 40px;
            height: 36px;
          }
        }
      `}</style>
    </>
  );
}

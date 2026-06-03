"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { RotateCcw, LayoutTemplate, ArrowLeft } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="zh-CN">
      <body>
        <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden flex flex-col justify-between selection:bg-accent/20 transition-colors duration-500">

          {/* Background layer */}
          <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
            <div className="absolute inset-0 bg-grid bg-grid-mask opacity-70" />
            <div className="absolute top-[-10%] left-[-20%] w-[70vw] h-[70vw] sm:w-[60vw] sm:h-[60vw] bg-blue-500/[0.03] dark:bg-blue-400/[0.05] rounded-full blur-[100px] sm:blur-[120px] bg-glow-blur-1" />
            <div className="absolute bottom-[-10%] right-[-15%] w-[60vw] h-[60vw] sm:w-[50vw] sm:h-[50vw] bg-indigo-500/[0.03] dark:bg-indigo-400/[0.05] rounded-full blur-[100px] sm:blur-[120px] bg-glow-blur-2" />
          </div>

          {/* Nav header */}
          <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-background/60 backdrop-blur-xl border-b border-divider/30 select-none no-print transition-all duration-300">
            <div className="max-w-5xl mx-auto h-full px-6 flex items-center justify-between">
              <Link href="/" className="flex items-center gap-3 group">
                <Image src="/logo.png" alt="序栈" width={22} height={22} className="w-5.5 h-5.5 object-contain opacity-90 transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-110 group-hover:rotate-3 mix-blend-multiply dark:mix-blend-screen rounded-sm" unoptimized />
                <span className="font-sans text-sm tracking-widest font-bold text-foreground">序栈<sup className="text-[8px] ml-0.5 align-super">®</sup></span>
              </Link>
              <nav className="flex items-center gap-1 sm:gap-2 text-[11px] sm:text-xs font-mono tracking-wider font-semibold uppercase">
                <Link href="/" className="px-3 py-1.5 rounded-sm text-foreground/50 hover:text-foreground hover:bg-foreground/5 transition-all duration-300">主页</Link>
                <Link href="/kb" className="px-3 py-1.5 rounded-sm text-foreground/50 hover:text-foreground hover:bg-foreground/5 transition-all duration-300">知识库</Link>
                <Link href="/manifesto" className="px-3 py-1.5 rounded-sm text-foreground/50 hover:text-foreground hover:bg-foreground/5 transition-all duration-300">发刊词</Link>
              </nav>
            </div>
          </header>

          {/* Main content area */}
          <div className="relative z-10 mx-auto max-w-5xl w-full px-6 pt-28 pb-12 sm:pt-36 sm:pb-16 md:pt-44 md:pb-20 flex flex-col items-center text-center my-auto">

            {/* Status decoration */}
            <div className="animate-spring-reveal font-mono text-xs sm:text-sm tracking-[0.2em] text-foreground/25 uppercase mb-8">
              SYSTEM EXCEPTION · CODE 500
            </div>

            {/* Title */}
            <h1 className="animate-text-focus-in delay-100 font-sans text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-foreground via-foreground to-accent bg-clip-text text-transparent">
              渲染异常
            </h1>

            {/* Description */}
            <p className="animate-text-focus-in delay-200 text-sm sm:text-base text-foreground/60 tracking-wide leading-relaxed mb-8">
              页面在执行过程中遇到了未预期的错误。<br className="hidden sm:inline" />
              可以尝试重新加载，或返回知识库继续浏览。
            </p>

            {/* Terminal error block */}
            <div className="animate-spring-reveal delay-300 w-full max-w-md mb-8">
              <div className="rounded-sm bg-foreground/[0.02] border border-foreground/[0.06] backdrop-blur-md overflow-hidden">
                <div className="flex items-center gap-1.5 px-3 py-1.5 border-b border-foreground/[0.04]">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500/60" />
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/60" />
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500/60" />
                  <span className="ml-2 text-[9px] font-mono text-foreground/25 uppercase tracking-wider">error.log</span>
                </div>
                <pre className="px-4 py-3 font-mono text-xs text-foreground/40 overflow-x-auto text-left">
                  <code>&gt; {error.message || "Unknown error"}</code>
                  {error.digest && (
                    <code className="block mt-1 text-foreground/20">digest: {error.digest}</code>
                  )}
                </pre>
              </div>
            </div>

            {/* Action buttons */}
            <div className="animate-spring-reveal delay-400 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-8">
              <button
                onClick={reset}
                className="group flex items-center justify-center gap-2 w-full sm:w-auto rounded-sm bg-foreground text-background px-9 py-3.5 text-xs font-semibold tracking-wider hover:bg-foreground/90 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(2,132,199,0.18)] active:scale-[0.98] transition-all duration-500 cubic-bezier(0.16,1,0.3,1) select-none shadow-sm cursor-pointer"
              >
                <RotateCcw size={14} className="group-hover:rotate-[-360deg] transition-transform duration-700" />
                重新加载
              </button>
              <Link
                href="/kb"
                className="flex items-center justify-center gap-2 w-full sm:w-auto rounded-sm px-9 py-3.5 text-xs font-semibold tracking-wider text-foreground/75 border border-divider hover:text-foreground hover:border-foreground/30 hover:bg-foreground/[0.03] hover:scale-[1.02] active:scale-[0.98] transition-all duration-500 cubic-bezier(0.16,1,0.3,1) select-none"
              >
                <LayoutTemplate size={14} />
                返回知识库
              </Link>
              <Link
                href="/"
                className="flex items-center justify-center gap-2 w-full sm:w-auto rounded-sm px-9 py-3.5 text-xs font-semibold tracking-wider text-foreground/75 border border-divider hover:text-foreground hover:border-foreground/30 hover:bg-foreground/[0.03] hover:scale-[1.02] active:scale-[0.98] transition-all duration-500 cubic-bezier(0.16,1,0.3,1) select-none"
              >
                <ArrowLeft size={14} />
                返回首页
              </Link>
            </div>

            <p className="animate-fade-in delay-600 text-[10px] font-mono text-foreground/20 tracking-wider">
              如果问题持续存在，请清除浏览器缓存后重试
            </p>
          </div>

          {/* Footer (simplified, no ICP) */}
          <footer className="animate-spring-reveal delay-800 relative z-10 border-t border-divider/30 bg-background/40 backdrop-blur-xl py-10 px-6 select-none text-[10px] font-mono tracking-wider font-light text-foreground/40 uppercase">
            <div className="max-w-5xl mx-auto flex flex-col items-center gap-6 md:flex-row md:items-start md:justify-between md:gap-4">
              <div className="flex flex-col items-center md:items-start gap-3">
                <Link href="/" className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
                  <Image src="/logo.png" alt="序栈" width={16} height={16} className="w-4 h-4 object-contain grayscale" unoptimized />
                  <span className="font-sans text-xs font-bold tracking-widest text-foreground">Sequence Stack</span>
                </Link>
                <div className="flex items-center gap-2 opacity-70">
                  <span>&copy; {new Date().getFullYear()} 序栈</span>
                  <span className="w-0.5 h-0.5 rounded-full bg-divider" />
                  <span>保留所有权利</span>
                </div>
              </div>
              <div className="w-12 h-px bg-divider/20 md:hidden" />
              <div className="flex flex-col items-center md:items-end gap-4">
                <div className="flex items-center gap-5 text-[10px] font-semibold">
                  <Link href="/kb" className="hover:text-foreground transition-colors py-1">知识库</Link>
                  <span className="text-divider">/</span>
                  <Link href="/manifesto" className="hover:text-foreground transition-colors py-1">发刊词</Link>
                </div>
                <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-4 gap-y-2 opacity-80">
                  <span className="inline-flex items-center gap-1">
                    <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                    EdgeOne 驱动
                  </span>
                </div>
              </div>
            </div>
          </footer>
        </main>
      </body>
    </html>
  );
}

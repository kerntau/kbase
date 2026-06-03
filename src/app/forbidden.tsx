import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Shield, ArrowLeft, ChevronRight, LayoutTemplate, Activity } from "lucide-react";
import { posts } from "#content";
import { sortByDate, categoryMap } from "@/utils/tree";

export const metadata: Metadata = {
  title: "403 · 禁止访问 | 序栈",
};

export default function Forbidden() {
  const recentPosts = sortByDate(posts.map((p) => ({ ...p, date: p.date ?? "" }))).slice(0, 3);

  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden flex flex-col justify-between selection:bg-accent/20 transition-colors duration-500">

      {/* 背景细密网格与渐变消隐遮罩以及液态流光 */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-grid bg-grid-mask opacity-70" />
        <div className="absolute top-[-10%] left-[-20%] w-[70vw] h-[70vw] sm:w-[60vw] sm:h-[60vw] bg-blue-500/[0.03] dark:bg-blue-400/[0.05] rounded-full blur-[100px] sm:blur-[120px] bg-glow-blur-1" />
        <div className="absolute bottom-[-10%] right-[-15%] w-[60vw] h-[60vw] sm:w-[50vw] sm:h-[50vw] bg-indigo-500/[0.03] dark:bg-indigo-400/[0.05] rounded-full blur-[100px] sm:blur-[120px] bg-glow-blur-2" />
      </div>

      {/* 顶部悬浮导航栏 */}
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

      {/* 主体内容区 */}
      <div className="relative z-10 mx-auto max-w-5xl w-full px-6 pt-28 pb-12 sm:pt-36 sm:pb-16 md:pt-44 md:pb-20 flex flex-col items-center text-center my-auto">

        {/* HTTP 状态码装饰 */}
        <div className="animate-spring-reveal font-mono text-xs sm:text-sm tracking-[0.2em] text-foreground/25 uppercase mb-8">
          HTTP/1.1 · 403 · Forbidden
        </div>

        {/* Shield 图标 */}
        <div className="animate-spring-reveal delay-100 mb-6">
          <Shield className="w-12 h-12 sm:w-14 sm:h-14 text-foreground/15" strokeWidth={1.5} />
        </div>

        {/* 巨型 403 标题 */}
        <h1 className="animate-text-focus-in delay-100 font-sans text-[140px] sm:text-[200px] md:text-[260px] lg:text-[300px] font-extrabold tracking-[-0.06em] leading-none select-none mb-6 bg-gradient-to-b from-foreground via-foreground/70 to-foreground/10 bg-clip-text text-transparent">
          403
        </h1>

        {/* 描述 */}
        <p className="animate-text-focus-in delay-200 text-sm sm:text-base text-foreground/60 tracking-wide leading-relaxed mb-2">
          此资源需要授权访问
        </p>
        <p className="animate-text-focus-in delay-300 text-xs text-foreground/35 mb-10">
          你可能没有足够的权限查看此页面，请尝试返回知识库继续浏览。
        </p>

        {/* 操作按钮 */}
        <div className="animate-spring-reveal delay-400 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-14">
          <Link
            href="/kb"
            className="group relative flex items-center justify-center gap-2.5 w-full sm:w-auto rounded-sm bg-foreground text-background px-9 py-3.5 text-xs font-semibold tracking-wider hover:bg-foreground/90 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(2,132,199,0.18)] active:scale-[0.98] transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) select-none shadow-sm"
          >
            <LayoutTemplate className="w-3.5 h-3.5 stroke-[2] relative z-10" />
            <span className="relative z-10">返回知识库</span>
            <ChevronRight className="w-3.5 h-3.5 transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) group-hover:translate-x-1 relative z-10" />
          </Link>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full sm:w-auto rounded-sm border border-divider px-9 py-3.5 text-xs font-semibold tracking-wider text-foreground/75 hover:text-foreground hover:border-foreground/30 hover:bg-foreground/[0.03] hover:scale-[1.02] active:scale-[0.98] transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) select-none"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            返回首页
          </Link>
        </div>

        {/* 最新技术推演列表 */}
        {recentPosts.length > 0 && (
          <div className="animate-spring-reveal delay-500 w-full text-left border-t border-divider/30 pt-10 sm:pt-14">
            <div className="flex items-center justify-between mb-8 select-none">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-accent animate-pulse" />
                <h2 className="text-[10px] font-bold tracking-widest text-foreground/45 uppercase">
                  Recent Deep Dives / 最新技术推演
                </h2>
              </div>
              <Link href="/kb" className="text-xs text-foreground/50 hover:text-foreground transition-colors font-semibold flex items-center gap-0.5">
                浏览全部 <ChevronRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              {recentPosts.map((post) => (
                <Link
                  key={post.permalink}
                  href={post.permalink}
                  className="group relative flex flex-col sm:flex-row sm:items-center justify-between p-4.5 border border-divider/40 hover:border-foreground/20 bg-foreground/[0.003] hover:bg-foreground/[0.015] rounded-sm hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(0,0,0,0.015)] dark:hover:shadow-[0_4px_20px_rgba(0,0,0,0.15)] transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) overflow-hidden"
                >
                  {/* 悬停时的左侧高亮细竖线 */}
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-accent -translate-x-[3px] group-hover:translate-x-0 transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1)" />

                  <div className="flex flex-col gap-1 min-w-0 pr-4 pl-0 group-hover:pl-2 transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1)">
                    <span className="text-sm font-bold text-foreground group-hover:text-accent transition-colors truncate">
                      {post.title}
                    </span>
                    {post.description && (
                      <span className="text-xs text-foreground/45 line-clamp-1">
                        {post.description}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 mt-2 sm:mt-0 shrink-0 font-mono text-[10px] text-foreground/40 pr-0 group-hover:pr-1 transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1)">
                    {post.category && (
                      <span className="uppercase tracking-wider px-2 py-0.5 bg-foreground/5 dark:bg-white/5 rounded-sm">
                        {post.category}
                      </span>
                    )}
                    {post.date && (
                      <span>{post.date.split("T")[0]}</span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* 底部版权与备案 */}
      <footer className="animate-spring-reveal delay-800 relative z-10 border-t border-divider/30 bg-background/40 backdrop-blur-xl py-10 px-6 select-none text-[10px] font-mono tracking-wider font-light text-foreground/40 uppercase">
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-6 md:flex-row md:items-start md:justify-between md:gap-4">
          <div className="flex flex-col items-center md:items-start gap-3">
            <Link href="/" className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
              <Image src="/logo.png" alt="序栈" width={16} height={16} className="w-4 h-4 object-contain grayscale" unoptimized />
              <span className="font-sans text-xs font-bold tracking-widest text-foreground">Sequence Stack</span>
            </Link>
            <div className="flex items-center gap-2 opacity-70">
              <span>© {new Date().getFullYear()} 序栈</span>
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
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                EdgeOne 驱动
              </span>
              <span className="text-divider hidden sm:inline">|</span>
              <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors py-1">鄂ICP备2025157857号</a>
              <span className="text-divider hidden sm:inline">|</span>
              <a href="https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=42018502008592" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors py-1">鄂公网安备 42018502008592号</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

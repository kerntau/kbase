import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, LayoutTemplate, Terminal, Shield, Cpu, Activity } from "lucide-react";
import { posts } from "#content";
import { sortByDate } from "@/utils/tree";

export const metadata: Metadata = {
  title: "序栈 | 计算机系统与安全知识库",
  description: "序栈知识库，记录网络安全、系统底层与现代架构的技术沉淀与实践。",
  keywords: ["序栈", "知识库", "系统安全", "全栈开发", "计算机底层"],
  openGraph: {
    title: "序栈 - 全栈技术知识库",
    description: "全栈技术知识库，涵盖前端、后端、数据库、运维与安全",
    url: "https://xstack.cn",
    siteName: "序栈",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "序栈 - 全栈技术知识库",
    description: "全栈技术知识库，涵盖前端、后端、数据库、运维与安全",
  },
};

export default function MarketingHomePage() {
  // 提取最新 3 篇计算机技术文档
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
      <div className="relative z-10 mx-auto max-w-5xl px-6 pt-28 pb-12 sm:pt-36 sm:pb-16 md:pt-40 md:pb-20 flex flex-col items-center text-center my-auto w-full">
        
        {/* Logo 徽章区 - 阻尼 Spring */}
        <div className="animate-spring-reveal flex flex-col items-center gap-5 mb-8 select-none group/logo">
          <div className="relative">
            <div className="absolute inset-0 bg-accent/15 dark:bg-accent/25 rounded-full blur-xl scale-[1.4] opacity-0 group-hover/logo:opacity-100 transition-opacity duration-1000 ease-out" />
            <Image src="/logo.png" alt="序栈" width={64} height={64} className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 object-contain opacity-90 group-hover/logo:scale-105 group-hover/logo:rotate-1 transition-all duration-700 ease-out drop-shadow-sm mix-blend-multiply dark:mix-blend-screen rounded-xl" unoptimized />
          </div>
          <div className="group/badge relative inline-flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase cursor-default px-3.5 py-1.5 rounded-sm bg-foreground/[0.02] border border-foreground/[0.06] backdrop-blur-md overflow-hidden transition-all duration-500 hover:bg-foreground/[0.04] hover:border-foreground/[0.12]">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-[100%] skew-x-[-15deg] group-hover/badge:animate-shine" />
            <span className="relative flex h-1.5 w-1.5 items-center justify-center">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-60"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500"></span>
            </span>
            <span className="relative z-10 text-foreground/50 group-hover/badge:text-foreground font-bold transition-colors">Sequence Stack V1.0.0</span>
          </div>
        </div>

        {/* 核心标题 */}
        <h1 className="animate-text-focus-in delay-100 font-sans text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-5 text-foreground drop-shadow-sm text-balance">
          构建数字秩序与<span className="bg-gradient-to-r from-foreground via-foreground to-accent bg-clip-text text-transparent">系统边界</span>
        </h1>

        {/* 去个人化简介 */}
        <p className="animate-text-focus-in delay-200 max-w-2xl text-xs sm:text-sm md:text-base text-foreground/60 font-normal tracking-wide leading-relaxed mb-10 text-balance mx-auto px-4">
          专注于计算机底层原理、系统安全对抗与现代架构演进的计算机技术知识库。
          <br className="hidden sm:inline" />
          以严谨的逻辑解构代码本质，用纯粹的白纸黑字呈现系统推演。
        </p>

        {/* 交互按钮 */}
        <div className="animate-spring-reveal delay-300 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto relative mb-16 sm:mb-20">
          <Link
            href="/kb"
            className="group relative flex items-center justify-center gap-2.5 w-full sm:w-auto rounded-sm bg-foreground text-background px-9 py-3.5 text-xs font-semibold tracking-wider hover:bg-foreground/90 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(2,132,199,0.18)] active:scale-[0.98] transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) select-none shadow-sm"
          >
            <LayoutTemplate className="w-3.5 h-3.5 stroke-[2] relative z-10" />
            <span className="relative z-10">进入知识库</span>
            <ChevronRight className="w-3.5 h-3.5 transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) group-hover:translate-x-1 relative z-10" />
          </Link>
          
          <Link
            href="/manifesto"
            className="flex items-center justify-center w-full sm:w-auto rounded-sm px-9 py-3.5 text-xs font-semibold tracking-wider text-foreground/75 border border-divider hover:text-foreground hover:border-foreground/30 hover:bg-foreground/[0.03] hover:scale-[1.02] active:scale-[0.98] transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) select-none"
          >
            技术发刊词
          </Link>
        </div>

        {/* 核心特征卡片 - 采用极通透的高级磨砂玻璃质感 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-16 sm:mb-24 text-left select-none">
          
          <div className="animate-spring-reveal delay-400 p-6 sm:p-8 group transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) border border-divider/40 hover:border-foreground/20 rounded-sm bg-foreground/[0.01] dark:bg-white/[0.005] hover:bg-foreground/[0.02] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.02)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative z-10 mb-5 inline-flex items-center justify-center p-2.5 rounded-sm bg-accent/10 text-accent transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-110 group-hover:rotate-6">
              <Cpu className="h-4.5 w-4.5 stroke-[2]" />
            </div>
            <h3 className="relative z-10 mb-2 text-sm font-bold text-foreground tracking-tight">
              系统底层原理
            </h3>
            <p className="relative z-10 text-xs leading-relaxed text-foreground/50 group-hover:text-foreground/70 transition-colors">
              解构现代操作系统、内存管理与进程调度的隐秘细节，提供深度底层的理论与代码推演。
            </p>
          </div>

          <div className="animate-spring-reveal delay-500 p-6 sm:p-8 group transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) border border-divider/40 hover:border-foreground/20 rounded-sm bg-foreground/[0.01] dark:bg-white/[0.005] hover:bg-foreground/[0.02] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.02)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative z-10 mb-5 inline-flex items-center justify-center p-2.5 rounded-sm bg-accent/10 text-accent transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-110 group-hover:rotate-6">
              <Shield className="h-4.5 w-4.5 stroke-[2]" />
            </div>
            <h3 className="relative z-10 mb-2 text-sm font-bold text-foreground tracking-tight">
              网络安全对抗
            </h3>
            <p className="relative z-10 text-xs leading-relaxed text-foreground/50 group-hover:text-foreground/70 transition-colors">
              专注于二进制漏洞防护、协议交互安全分析以及攻防对抗博弈中的边界防御设计。
            </p>
          </div>

          <div className="animate-spring-reveal delay-600 p-6 sm:p-8 group transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) border border-divider/40 hover:border-foreground/20 rounded-sm bg-foreground/[0.01] dark:bg-white/[0.005] hover:bg-foreground/[0.02] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.02)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative z-10 mb-5 inline-flex items-center justify-center p-2.5 rounded-sm bg-accent/10 text-accent transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-110 group-hover:rotate-6">
              <Terminal className="h-4.5 w-4.5 stroke-[2]" />
            </div>
            <h3 className="relative z-10 mb-2 text-sm font-bold text-foreground tracking-tight">
              现代软件架构
            </h3>
            <p className="relative z-10 text-xs leading-relaxed text-foreground/50 group-hover:text-foreground/70 transition-colors">
              探索微服务治理、分布式 system 设计与高并发并发控制，沉淀高可用工程架构实践。
            </p>
          </div>

        </div>

        {/* 最新技术推演列表 - 增强内容度与专业感 */}
        {recentPosts.length > 0 && (
          <div className="animate-spring-reveal delay-700 w-full text-left border-t border-divider/30 pt-10 sm:pt-14">
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
            <div className="flex items-center gap-4 text-[10px] font-semibold">
              <Link href="/kb" className="py-1 hover:text-foreground transition-colors">知识库</Link>
              <span className="text-divider">/</span>
              <Link href="/manifesto" className="py-1 hover:text-foreground transition-colors">发刊词</Link>
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-4 gap-y-2 opacity-80">
              <span className="inline-flex items-center gap-1">
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                EdgeOne 驱动
              </span>
              <span className="text-divider hidden sm:inline">|</span>
              <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 py-1 hover:text-foreground transition-colors">
                鄂ICP备2025157857号
              </a>
              <span className="text-divider hidden sm:inline">|</span>
              <a href="https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=42018502008592" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 py-1 hover:text-foreground transition-colors">
                鄂公网安备 42018502008592号
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}


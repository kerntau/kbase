import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, LayoutTemplate, BookOpen, Terminal, Shield } from "lucide-react";
import Countdown from "@/components/Countdown";

export const metadata: Metadata = {
  title: "序栈 | 秩序之始与技术之栈",
  description: "序栈 (Digital Space) 是一个专注于网络安全、系统底层与现代全栈架构推演的数字自留地。去除网络浮躁，留存白纸黑字的思考与代码沉淀。",
  keywords: ["序栈门户", "数字自留地", "系统安全", "全栈开发", "知识库", "渗透日志"],
};

export default function MarketingHomePage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden flex flex-col justify-between selection:bg-accent/20 transition-colors duration-300">
      
      {/* 背景模糊液态流光 - 慢速交织呼吸 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
        <div className="absolute top-[-10%] left-[-20%] w-[70vw] h-[70vw] sm:w-[60vw] sm:h-[60vw] bg-blue-500/[0.04] dark:bg-blue-400/[0.06] rounded-full blur-[100px] sm:blur-[120px] bg-glow-blur-1" />
        <div className="absolute bottom-[-10%] right-[-15%] w-[60vw] h-[60vw] sm:w-[50vw] sm:h-[50vw] bg-violet-500/[0.04] dark:bg-violet-400/[0.06] rounded-full blur-[100px] sm:blur-[120px] bg-glow-blur-2" />
      </div>

      {/* 顶部悬浮导航栏 */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-background/70 backdrop-blur-xl border-b border-divider/40 shadow-sm shadow-foreground/5 select-none no-print transition-all">
        <div className="max-w-5xl mx-auto h-full px-6 flex items-center justify-between">
          
          {/* 左侧 Brand 标志 - 移除底色层，使用 mix-blend 处理可能的不透明底图 */}
          <Link href="/" className="flex items-center gap-3 group">
            <img src="/logo.png" alt="Logo" className="w-6 h-6 object-contain opacity-90 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 mix-blend-multiply dark:mix-blend-screen rounded-sm" />
            <span className="font-serif text-sm tracking-widest font-bold text-foreground">序栈</span>
          </Link>

          {/* 右侧胶囊导航 */}
          <nav className="flex items-center gap-1 sm:gap-2 text-[11px] sm:text-xs font-mono tracking-wider font-medium uppercase">
            <Link href="/" className="px-3 py-2 rounded-md text-foreground/60 hover:text-foreground hover:bg-foreground/5 transition-all">Portal</Link>
            <Link href="/kb" className="px-3 py-2 rounded-md text-foreground/60 hover:text-foreground hover:bg-foreground/5 transition-all">Console</Link>
            <Link href="/manifesto" className="px-3 py-2 rounded-md text-foreground/60 hover:text-foreground hover:bg-foreground/5 transition-all">Manifesto</Link>
          </nav>
        </div>
      </header>

      {/* 主体内容区 */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 pt-24 pb-12 sm:pt-28 sm:pb-16 md:pt-32 md:pb-20 flex flex-col items-center text-center my-auto w-full">
        
        {/* 中央 Logo 专属直接悬浮与纯文字指示灯状态徽章 - Spring 软弹入场 */}
        <div className="animate-spring-reveal flex flex-col items-center gap-6 mb-10 select-none group/logo">
          <div className="relative">
            <div className="absolute inset-0 bg-accent/20 dark:bg-accent/30 rounded-full blur-2xl scale-[1.5] opacity-0 group-hover/logo:opacity-100 transition-opacity duration-700 ease-out" />
            <img src="/logo.png" alt="Logo" className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 object-contain select-none opacity-90 group-hover/logo:scale-105 transition-transform duration-500 ease-out drop-shadow-md mix-blend-multiply dark:mix-blend-screen rounded-xl" />
          </div>
          <div className="group/badge relative inline-flex items-center gap-2.5 text-[10px] sm:text-xs font-mono tracking-widest uppercase cursor-default select-none px-4 py-1.5 rounded-full bg-foreground/[0.03] border border-foreground/[0.08] backdrop-blur-md overflow-hidden transition-all duration-300 hover:bg-foreground/[0.05] hover:border-foreground/[0.15] hover:shadow-lg hover:shadow-foreground/5">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[100%] skew-x-[-15deg] group-hover/badge:animate-shine" />
            <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2 items-center justify-center">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-emerald-500"></span>
            </span>
            <span className="relative z-10 text-foreground/70 group-hover/badge:text-foreground font-bold transition-colors">序栈 V1.0.0</span>
          </div>
        </div>

        {/* 核心 Slogan - 电影级聚焦显影入场与字距浮动交互 */}
        <h1 className="animate-text-focus-in delay-100 font-sans text-[2.5rem] leading-[1.1] sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-6 sm:mb-8 text-foreground drop-shadow-sm text-balance flex items-center justify-center flex-wrap gap-x-2 gap-y-3 sm:gap-y-4">
          <span className="transition-all duration-700 hover:tracking-normal cursor-default">秩序之始</span> 
          <span className="mx-1 sm:mx-6 inline-flex items-center justify-center w-8 h-8 sm:w-14 sm:h-14 rounded-full border border-foreground/10 bg-foreground/[0.02] text-xs sm:text-xl text-foreground/40 font-serif font-light backdrop-blur-md select-none shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] transition-all duration-500 hover:border-foreground/20 hover:text-foreground/70 hover:bg-foreground/[0.04] group cursor-default">
            <span className="group-hover:rotate-180 transition-transform duration-700 ease-in-out">与</span>
          </span> 
          <span className="transition-all duration-700 hover:tracking-normal cursor-default">技术之栈</span>
        </h1>

        {/* 简介文案 */}
        <p className="animate-text-focus-in delay-200 max-w-lg text-sm sm:text-base text-foreground/60 font-normal tracking-wide leading-relaxed mb-8 sm:mb-10 text-balance mx-auto px-2">
          以工程化思维构建的个人知识库。去除数字世界的碎片噪音，沉淀网络安全、系统底层与现代架构的深度思考与实践准则。
        </p>

        {/* 交互按钮区 - 提升至首屏关键折叠线之上 */}
        <div className="animate-spring-reveal delay-300 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto relative mb-12 sm:mb-16">
          <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full scale-110 animate-pulse pointer-events-none" />
          <Link
            href="/kb"
            className="group relative flex items-center justify-center gap-2 w-full sm:w-auto rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-9 py-4 text-sm font-bold tracking-wider hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-500/25 active:scale-[0.98] transition-all duration-200 select-none overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] skew-x-[-15deg] group-hover:animate-shine" />
            <LayoutTemplate className="w-4 h-4 stroke-[2] relative z-10" />
            <span className="relative z-10">进入知识库</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1 relative z-10" />
          </Link>
          
          <Link
            href="/manifesto"
            className="flex items-center justify-center w-full sm:w-auto rounded-md px-9 py-4 text-sm font-bold tracking-wider text-foreground/80 border-2 border-divider/80 bg-transparent transition-all hover:bg-foreground/5 hover:border-foreground/20 active:scale-[0.98] duration-200 select-none"
          >
            阅读发刊词
          </Link>
        </div>

        {/* 倒计时模块 */}
        <div className="animate-spring-reveal delay-400 mb-10 sm:mb-14 flex flex-col items-center border-t border-b border-divider/60 py-4 px-2 sm:px-8 w-full max-w-2xl mx-auto">
          <span className="text-[10px] font-sans font-bold tracking-[0.2em] text-foreground/35 uppercase mb-3 select-none text-center">
            系统边界构建与初始化同步倒计时
          </span>
          <div className="w-full flex justify-center scale-90 sm:scale-100 origin-center">
            <Countdown />
          </div>
        </div>

        {/* Bento Grid - 栅格卡片渐次入场 & 高级悬浮交互 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-0 border-transparent md:border-y md:border-divider md:divide-y-0 md:divide-x divide-divider w-full mb-10 sm:mb-14 text-left">
          
          <div className="animate-spring-reveal delay-400 p-6 sm:p-8 md:py-10 md:px-10 group transition-all duration-500 ease-out border border-divider/40 md:border-transparent rounded-2xl md:rounded-none hover:bg-foreground/[0.02] hover:-translate-y-1 hover:shadow-xl hover:shadow-foreground/5 cursor-default relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 mb-5 inline-flex items-center justify-center p-2.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 transition-transform duration-500 cubic-bezier(0.25, 1, 0.5, 1) group-hover:-translate-y-1 group-hover:bg-blue-500/20 group-hover:scale-110 shadow-sm">
              <Shield className="h-5 w-5 stroke-[2]" />
            </div>
            <h3 className="relative z-10 mb-2.5 text-base font-bold text-foreground tracking-tight transition-colors">
              结构化知识网络
            </h3>
            <p className="relative z-10 text-sm leading-relaxed text-foreground/60 font-normal group-hover:text-foreground/80 transition-colors text-pretty">
              打破碎片化阅读的桎梏。以严密的逻辑与分类标准，构建涵盖安全协议、底层系统到业务架构的系统化知识图谱。
            </p>
          </div>

          <div className="animate-spring-reveal delay-500 p-6 sm:p-8 md:py-10 md:px-10 group transition-all duration-500 ease-out border border-divider/40 md:border-transparent rounded-2xl md:rounded-none hover:bg-foreground/[0.02] hover:-translate-y-1 hover:shadow-xl hover:shadow-foreground/5 cursor-default relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 mb-5 inline-flex items-center justify-center p-2.5 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 transition-transform duration-500 cubic-bezier(0.25, 1, 0.5, 1) group-hover:-translate-y-1 group-hover:bg-indigo-500/20 group-hover:scale-110 shadow-sm">
              <Terminal className="h-5 w-5 stroke-[2]" />
            </div>
            <h3 className="relative z-10 mb-2.5 text-base font-bold text-foreground tracking-tight transition-colors">
              硬核技术沉淀
            </h3>
            <p className="relative z-10 text-sm leading-relaxed text-foreground/60 font-normal group-hover:text-foreground/80 transition-colors text-pretty">
              拒绝浮于表面的技术搬运。从网络渗透的真实演练到全栈代码的工程落地，只收录经得起反复推敲的实践笔记。
            </p>
          </div>

          <div className="animate-spring-reveal delay-600 p-6 sm:p-8 md:py-10 md:px-10 group transition-all duration-500 ease-out border border-divider/40 md:border-transparent rounded-2xl md:rounded-none hover:bg-foreground/[0.02] hover:-translate-y-1 hover:shadow-xl hover:shadow-foreground/5 cursor-default relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 mb-5 inline-flex items-center justify-center p-2.5 rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-400 transition-transform duration-500 cubic-bezier(0.25, 1, 0.5, 1) group-hover:-translate-y-1 group-hover:bg-violet-500/20 group-hover:scale-110 shadow-sm">
              <BookOpen className="h-5 w-5 stroke-[2]" />
            </div>
            <h3 className="relative z-10 mb-2.5 text-base font-bold text-foreground tracking-tight transition-colors">
              纯粹数字参考源
            </h3>
            <p className="relative z-10 text-sm leading-relaxed text-foreground/60 font-normal group-hover:text-foreground/80 transition-colors text-pretty">
              不受外界算法干扰的独立节点。保持绝对克制、追求技术本质，为未来的系统演进与架构设计提供高纯度的检索参考。
            </p>
          </div>

        </div>

      </div>

      {/* 底部版权与备案 - 现代官网通透排版 */}
      <footer className="animate-spring-reveal delay-800 relative z-10 border-t border-divider/40 bg-background/80 backdrop-blur-2xl py-10 md:py-14 px-6 select-none text-xs font-mono tracking-wider font-light text-foreground/50">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-8 md:gap-4">
          
          <div className="flex flex-col items-center md:items-start gap-4">
            <Link href="/" className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
              <img src="/logo.png" alt="Logo" className="w-5 h-5 object-contain grayscale" />
              <span className="font-serif text-sm font-bold tracking-widest uppercase text-foreground">Digital Space</span>
            </Link>
            <div className="flex items-center gap-2 text-[10px] uppercase opacity-70">
              <span>© 2026 序栈</span>
              <span className="w-1 h-1 rounded-full bg-divider" aria-hidden="true" />
              <span>保留所有权利</span>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end gap-5 text-[11px]">
            <div className="flex items-center gap-5 uppercase font-medium tracking-widest">
              <Link href="/kb" className="hover:text-foreground transition-colors">Console</Link>
              <Link href="/manifesto" className="hover:text-foreground transition-colors">Manifesto</Link>
              <Link href="#" className="hover:text-foreground transition-colors">RSS</Link>
            </div>
            
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-5 gap-y-3 opacity-80">
              {/* EdgeOne */}
              <span className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                EdgeOne 驱动
              </span>

              {/* ICP 备案 */}
              <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                </svg>
                鄂ICP备2025157857号
              </a>

              {/* 公网安备 */}
              <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=42018502008592" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                鄂公网安备 42018502008592号
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, LayoutTemplate, ChevronRight } from "lucide-react";

export default function ManifestoPage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background py-16 px-6">
      
      {/* 极简 background grid and gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-noise opacity-[0.015] dark:opacity-[0.025] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(143,191,218,0.12),transparent_75%)] dark:bg-[radial-gradient(circle_at_50%_40%,rgba(143,191,218,0.06),transparent_75%)]" />
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]" 
             style={{ 
               backgroundImage: 'linear-gradient(var(--border) 0.5px, transparent 0.5px), linear-gradient(90deg, var(--border) 0.5px, transparent 0.5px)', 
               backgroundSize: '48px 48px' 
             }} />
      </div>

      <div className="z-10 flex flex-col items-start text-left max-w-2xl w-full mx-auto relative">
        
        {/* 返回首页 */}
        <Link
          href="/"
          className="animate-apple-reveal group inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300 mb-10 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
          返回主页
        </Link>

        {/* 核心 Slogan / Heading */}
        <h1 className="animate-apple-reveal delay-100 text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white mb-8 leading-snug">
          代码是逻辑的具象化，<br />
          安全是系统的边界线。
        </h1>

        {/* 文章主体 - 诗意排版 */}
        <div className="animate-apple-reveal delay-200 space-y-6 text-sm md:text-base text-zinc-500 dark:text-zinc-400 font-serif leading-relaxed tracking-wide font-normal">
          <p className="delay-200">
            建立“序栈”的初衷很简单：在这个充满噪音的互联网时代，我需要一个绝对安静的地方，记录自己对计算机科学的探索。
          </p>
          <p className="delay-300">
            这里的内容跨度可能会有些跳跃：前一天可能还在用 React 重构博客架构，后一天就在推演 Three.js 里的 3D 空间坐标系，或者记录一次 Web 漏洞的渗透测试日志。但不论领域如何切换，核心始终是对技术底层逻辑的追问。
          </p>
          <p className="delay-400">
            序栈拒绝浮躁的快餐式教程，拒绝过度设计的花哨排版。在这里，一切回归技术的本来面目：干净的代码块，严谨的逻辑推演，以及纯粹的白纸黑字。
          </p>
        </div>

        {/* 底部功能按钮 */}
        <div className="animate-apple-reveal delay-500 flex flex-col sm:flex-row items-center gap-4 w-full mt-12 pt-6 border-t border-zinc-200/50 dark:border-zinc-800/40">
          <Link
            href="/kb"
            className="group flex items-center justify-center gap-1.5 w-full sm:w-auto rounded-xl bg-foreground text-background px-6 py-3 text-sm font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.96] shadow-sm"
          >
            <LayoutTemplate className="w-4 h-4" />
            进入知识库
            <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

      </div>

      {/* 底部版权与备案信息 */}
      <footer className="absolute bottom-8 left-0 right-0 text-center animate-apple-reveal delay-500 px-6 select-none">
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-2.5 text-xs text-zinc-400 dark:text-zinc-600">
          
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <span className="font-semibold text-zinc-600 dark:text-zinc-400">© 2026 序栈</span>
            <span className="text-zinc-200 dark:text-zinc-800">|</span>
            <span>保留所有权利</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[11px] text-zinc-400 dark:text-zinc-600">
            {/* EdgeOne */}
            <span className="inline-flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-blue-500 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              边缘加速平台 <span className="font-bold text-zinc-500 dark:text-zinc-400">EdgeOne</span> 全力驱动
            </span>

            <span className="hidden sm:inline text-zinc-200 dark:text-zinc-800">•</span>

            {/* ICP 备案 */}
            <a 
              href="https://beian.miit.gov.cn/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-zinc-700 dark:hover:text-zinc-350 transition-colors"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
              </svg>
              鄂ICP备2025157857号
            </a>

            <span className="hidden sm:inline text-zinc-200 dark:text-zinc-800">•</span>

            {/* 公网安备 */}
            <a 
              href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=42018502008592" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-zinc-700 dark:hover:text-zinc-350 transition-colors"
            >
              <svg className="w-3.5 h-3.5 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              鄂公网安备 42018502008592号
            </a>
          </div>

        </div>
      </footer>
    </main>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight, LayoutTemplate, BookOpen, Terminal, Shield } from "lucide-react";

// 目标日期：2026年7月15日
const TARGET_DATE = new Date("2026-07-15T00:00:00+08:00").getTime();

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      const now = new Date().getTime();
      const difference = TARGET_DATE - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!mounted) {
    return (
      <div className="flex gap-3 md:gap-5 opacity-0">
        <div className="h-16 w-16 md:w-20 md:h-20" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 md:gap-5 text-center mt-6 mb-2">
      <div className="flex flex-col items-center justify-center bg-white/40 dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-zinc-800/80 backdrop-blur-md rounded-2xl w-16 h-16 md:w-20 md:h-20 shadow-sm transition-transform hover:scale-105">
        <span className="text-xl md:text-3xl font-black text-zinc-800 dark:text-zinc-100">{timeLeft.days}</span>
        <span className="text-[10px] md:text-xs font-semibold text-zinc-500 uppercase tracking-wider">Days</span>
      </div>
      <span className="text-xl font-light text-zinc-300 dark:text-zinc-700">:</span>
      <div className="flex flex-col items-center justify-center bg-white/40 dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-zinc-800/80 backdrop-blur-md rounded-2xl w-16 h-16 md:w-20 md:h-20 shadow-sm transition-transform hover:scale-105">
        <span className="text-xl md:text-3xl font-black text-zinc-800 dark:text-zinc-100">{timeLeft.hours.toString().padStart(2, '0')}</span>
        <span className="text-[10px] md:text-xs font-semibold text-zinc-500 uppercase tracking-wider">Hours</span>
      </div>
      <span className="text-xl font-light text-zinc-300 dark:text-zinc-700">:</span>
      <div className="flex flex-col items-center justify-center bg-white/40 dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-zinc-800/80 backdrop-blur-md rounded-2xl w-16 h-16 md:w-20 md:h-20 shadow-sm transition-transform hover:scale-105">
        <span className="text-xl md:text-3xl font-black text-zinc-800 dark:text-zinc-100">{timeLeft.minutes.toString().padStart(2, '0')}</span>
        <span className="text-[10px] md:text-xs font-semibold text-zinc-500 uppercase tracking-wider">Mins</span>
      </div>
      <span className="text-xl font-light text-zinc-300 dark:text-zinc-700">:</span>
      <div className="flex flex-col items-center justify-center bg-white/40 dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-zinc-800/80 backdrop-blur-md rounded-2xl w-16 h-16 md:w-20 md:h-20 shadow-sm transition-transform hover:scale-105">
        <span className="text-xl md:text-3xl font-black text-zinc-800 dark:text-zinc-100">{timeLeft.seconds.toString().padStart(2, '0')}</span>
        <span className="text-[10px] md:text-xs font-semibold text-zinc-500 uppercase tracking-wider">Secs</span>
      </div>
    </div>
  );
};

export default function MarketingHomePage() {
  return (
    <main className="relative min-h-screen bg-background overflow-x-hidden selection:bg-zinc-200 dark:selection:bg-zinc-800">
      
      {/* 极简 background grid and gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-noise opacity-[0.015] dark:opacity-[0.02]" />
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/10 dark:bg-blue-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-400/10 dark:bg-purple-500/5 blur-[120px] rounded-full" />
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]" 
             style={{ 
               backgroundImage: 'linear-gradient(var(--border) 0.5px, transparent 0.5px), linear-gradient(90deg, var(--border) 0.5px, transparent 0.5px)', 
               backgroundSize: '40px 40px' 
             }} />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-32 pb-24 md:pt-40 md:pb-32 flex flex-col items-center text-center">
        
        {/* 顶部状态徽章 */}
        <div className="animate-apple-reveal mb-8 inline-flex items-center gap-2 rounded-full border border-zinc-200/80 dark:border-zinc-800/85 bg-zinc-50/80 dark:bg-zinc-900/80 px-4 py-1.5 text-[11px] font-bold tracking-widest text-zinc-500 uppercase backdrop-blur-md shadow-sm transition-colors cursor-default">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          序栈 v1.0.0
        </div>

        {/* 核心 Slogan */}
        <h1 className="animate-apple-reveal delay-100 font-sans text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-zinc-900 dark:text-white mb-6 leading-[1.05]">
          秩序之始 <br className="hidden md:block" />
          <span className="bg-gradient-to-r from-zinc-800 via-zinc-600 to-zinc-400 dark:from-white dark:via-zinc-300 dark:to-zinc-500 bg-clip-text text-transparent pb-2">技术之栈</span>
        </h1>

        {/* 倒计时模块 */}
        <div className="animate-apple-reveal delay-200 mb-16 flex flex-col items-center">
          <span className="text-xs font-semibold tracking-widest text-zinc-400 uppercase mb-2">
            基础设施完工倒计时
          </span>
          <Countdown />
        </div>

        {/* Bento Grid 文案解构区 */}
        <div className="animate-apple-reveal delay-300 grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-5xl mb-20 text-left">
          
          <div className="group relative overflow-hidden rounded-[24px] border border-zinc-200/60 dark:border-zinc-800/50 bg-white/60 dark:bg-zinc-900/30 p-8 backdrop-blur-md transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/50 dark:border-zinc-700/50 group-hover:scale-110 transition-transform duration-500">
              <Shield className="h-6 w-6 text-zinc-700 dark:text-zinc-300" />
            </div>
            <h3 className="mb-3 text-lg font-bold text-zinc-900 dark:text-white">纯粹数字自留地</h3>
            <p className="text-sm font-medium leading-relaxed text-zinc-500 dark:text-zinc-400">
              这里不是大而全的百科，而是一块纯粹的数字自留地。
            </p>
          </div>

          <div className="group relative overflow-hidden rounded-[24px] border border-zinc-200/60 dark:border-zinc-800/50 bg-white/60 dark:bg-zinc-900/30 p-8 backdrop-blur-md transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/50 dark:border-zinc-700/50 group-hover:scale-110 transition-transform duration-500">
              <Terminal className="h-6 w-6 text-zinc-700 dark:text-zinc-300" />
            </div>
            <h3 className="mb-3 text-lg font-bold text-zinc-900 dark:text-white">全栈架构推演</h3>
            <p className="text-sm font-medium leading-relaxed text-zinc-500 dark:text-zinc-400">
              作为一名信息安全专业的学生，我在这里记录从底层系统、网络渗透到现代全栈架构的真实推演。
            </p>
          </div>

          <div className="group relative overflow-hidden rounded-[24px] border border-zinc-200/60 dark:border-zinc-800/50 bg-white/60 dark:bg-zinc-900/30 p-8 backdrop-blur-md transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/50 dark:border-zinc-700/50 group-hover:scale-110 transition-transform duration-500">
              <BookOpen className="h-6 w-6 text-zinc-700 dark:text-zinc-300" />
            </div>
            <h3 className="mb-3 text-lg font-bold text-zinc-900 dark:text-white">只留思考沉淀</h3>
            <p className="text-sm font-medium leading-relaxed text-zinc-500 dark:text-zinc-400">
              去除互联网的浮躁噪音，只留白纸黑字的思考与代码沉淀。
            </p>
          </div>

        </div>

        {/* 交互按钮区 */}
        <div className="animate-apple-reveal delay-500 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-16">
          <Link
            href="/kb"
            className="group relative flex items-center justify-center gap-2 w-full sm:w-auto overflow-hidden rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-10 py-4 text-[15px] font-bold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-zinc-900/20 dark:shadow-white/10"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 dark:via-black/10 to-transparent -translate-x-full" />
            <LayoutTemplate className="w-[18px] h-[18px]" />
            进入知识库
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
          
          <Link
            href="/manifesto"
            className="flex items-center justify-center w-full sm:w-auto rounded-full px-10 py-4 text-[15px] font-bold text-zinc-700 dark:text-zinc-200 border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/50 backdrop-blur-md transition-all duration-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 active:scale-[0.98]"
          >
            阅读发刊词
          </Link>
        </div>
      </div>

      {/* 底部版权与备案信息 */}
      <footer className="relative z-10 border-t border-zinc-200/50 dark:border-zinc-800/50 bg-white/30 dark:bg-zinc-950/30 backdrop-blur-xl animate-apple-reveal delay-700 py-6 px-6 select-none mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500 dark:text-zinc-500">
          
          <div className="flex items-center gap-3 font-medium">
            <span>© 2026 序栈</span>
            <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
            <span>保留所有权利</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px]">
            {/* EdgeOne */}
            <span className="inline-flex items-center gap-1.5 bg-zinc-100/80 dark:bg-zinc-900/80 px-2.5 py-1 rounded-md">
              <svg className="w-3.5 h-3.5 text-blue-500 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              边缘加速平台 <span className="font-bold text-zinc-700 dark:text-zinc-300">EdgeOne</span> 全力驱动
            </span>

            {/* ICP 备案 */}
            <a 
              href="https://beian.miit.gov.cn/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-zinc-800 dark:hover:text-zinc-300 transition-colors"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
              </svg>
              鄂ICP备2025157857号
            </a>

            <span className="hidden sm:inline w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />

            {/* 公网安备 */}
            <a 
              href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=42018502008592" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-zinc-800 dark:hover:text-zinc-300 transition-colors"
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

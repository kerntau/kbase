"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ChevronRight, LayoutTemplate, Terminal, Shield, Cpu } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import BackgroundDecoration from "@/components/marketing/BackgroundDecoration";
import MarketingHeader from "@/components/layout/MarketingHeader";
import MarketingFooter from "@/components/layout/MarketingFooter";
import RecentPostsList from "@/components/RecentPostsList";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function MarketingHomeContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const postsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // ── Hero 序列入场动画 (Timeline) ────────────────────────
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        logoRef.current,
        { scale: 0.6, opacity: 0, rotate: -5 },
        { scale: 1, opacity: 0.9, rotate: 0, duration: 1.2, ease: "elastic.out(1, 0.75)" }
      )
        .fromTo(
          badgeRef.current,
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.8"
        )
        .fromTo(
          titleRef.current,
          { y: 30, opacity: 0, filter: "blur(6px)" },
          { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.0 },
          "-=0.6"
        )
        .fromTo(
          descRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 0.6, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          ctaRef.current,
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.6"
        );

      // ── 特征卡片滚动触发 (ScrollTrigger) ───────────────────
      const cards = cardsRef.current?.children;
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.0,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // ── 最近文章列表滚动触发 (ScrollTrigger) ─────────────────
      if (postsRef.current) {
        gsap.fromTo(
          postsRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: postsRef.current,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    },
    { scope: containerRef }
  );

  // ── 3D 悬浮倾斜动效 ────────────────────────────────────
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // 限制最大旋转 8 度以保持高级克制感
    const rotateX = -y / (rect.height / 16);
    const rotateY = x / (rect.width / 16);

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      transformPerspective: 1000,
      ease: "power2.out",
      duration: 0.3,
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      ease: "power2.out",
      duration: 0.5,
    });
  };

  return (
    <div ref={containerRef} className="w-full flex flex-col justify-between min-h-screen">
      <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden flex flex-col justify-between selection:bg-accent/20 transition-colors duration-500">
        {/* 跳转到内容 - 无障碍快捷链接 */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[200] focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded-md focus:text-sm"
        >
          跳转到内容
        </a>

        <BackgroundDecoration />

        <MarketingHeader activePath="/" />

        {/* 主体内容区 */}
        <div id="main-content" className="relative z-10 mx-auto max-w-5xl px-6 pt-28 pb-12 sm:pt-36 sm:pb-16 md:pt-40 md:pb-20 flex flex-col items-center text-center my-auto w-full">
          
          {/* Logo 徽章区 */}
          <div ref={logoRef} className="flex flex-col items-center gap-5 mb-8 select-none group/logo opacity-0">
            <div className="relative">
              <div className="absolute inset-0 bg-accent/15 dark:bg-accent/25 rounded-full blur-xl scale-[1.4] opacity-0 group-hover/logo:opacity-100 transition-opacity duration-1000 ease-out" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="序栈"
                width={64}
                height={64}
                className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 object-contain opacity-90 group-hover/logo:scale-105 group-hover/logo:rotate-1 transition-all duration-700 ease-out drop-shadow-sm mix-blend-multiply dark:mix-blend-screen rounded-xl"
              />
            </div>
            <div
              ref={badgeRef}
              className="group/badge relative inline-flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase cursor-default px-3.5 py-1.5 rounded-sm bg-foreground/[0.02] border border-foreground/[0.06] backdrop-blur-md overflow-hidden transition-all duration-500 hover:bg-foreground/[0.04] hover:border-foreground/[0.12] opacity-0"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-[100%] skew-x-[-15deg] group-hover/badge:animate-shine" />
              <span className="relative flex h-1.5 w-1.5 items-center justify-center">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-60"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500"></span>
              </span>
              <span className="relative z-10 text-foreground/60 group-hover/badge:text-foreground font-bold transition-colors">Sequence Stack V1.0.0</span>
            </div>
          </div>

          {/* 核心标题 */}
          <h1 ref={titleRef} className="font-sans text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-5 text-foreground drop-shadow-sm text-balance opacity-0">
            构建数字秩序与<span className="bg-gradient-to-r from-foreground via-foreground to-accent bg-clip-text text-transparent">系统边界</span>
          </h1>

          {/* 简介 */}
          <p ref={descRef} className="max-w-2xl text-xs sm:text-sm md:text-base text-foreground/60 font-normal tracking-wide leading-relaxed mb-10 text-balance mx-auto px-4 opacity-0">
            记录计算机底层原理、网络安全与系统架构的工程实践。
            <br className="hidden sm:inline" />
            摒弃浮躁，回归代码与逻辑的本源。
          </p>

          {/* 交互按钮 */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto relative mb-16 sm:mb-20 opacity-0">
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

          {/* 核心特征卡片 - 支持 3D 悬浮交互 */}
          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-16 sm:mb-24 text-left select-none">
            
            <div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="p-6 sm:p-8 group border border-divider/40 hover:border-foreground/20 rounded-sm bg-foreground/[0.01] dark:bg-white/[0.005] hover:bg-foreground/[0.02] hover:shadow-[0_8px_30px_rgba(0,0,0,0.02)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] relative overflow-hidden transition-colors duration-300 opacity-0"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <div className="relative z-10 mb-5 inline-flex items-center justify-center p-2.5 rounded-sm bg-accent/10 text-accent transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-110 group-hover:rotate-6">
                <Cpu className="h-4.5 w-4.5 stroke-[2]" />
              </div>
              <h3 className="relative z-10 mb-2 text-sm font-bold text-foreground tracking-tight">
                系统底层原理
              </h3>
              <p className="relative z-10 text-xs leading-relaxed text-foreground/60 group-hover:text-foreground/70 transition-colors">
                从操作系统、内存管理到进程调度。探究计算机运行的真实机制与底层实现。
              </p>
            </div>

            <div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="p-6 sm:p-8 group border border-divider/40 hover:border-foreground/20 rounded-sm bg-foreground/[0.01] dark:bg-white/[0.005] hover:bg-foreground/[0.02] hover:shadow-[0_8px_30px_rgba(0,0,0,0.02)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] relative overflow-hidden transition-colors duration-300 opacity-0"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <div className="relative z-10 mb-5 inline-flex items-center justify-center p-2.5 rounded-sm bg-accent/10 text-accent transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-110 group-hover:rotate-6">
                <Shield className="h-4.5 w-4.5 stroke-[2]" />
              </div>
              <h3 className="relative z-10 mb-2 text-sm font-bold text-foreground tracking-tight">
                网络安全对抗
              </h3>
              <p className="relative z-10 text-xs leading-relaxed text-foreground/60 group-hover:text-foreground/70 transition-colors">
                二进制漏洞分析、协议安全与边界防御机制。记录真实的攻防博弈与应对方案。
              </p>
            </div>

            <div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="p-6 sm:p-8 group border border-divider/40 hover:border-foreground/20 rounded-sm bg-foreground/[0.01] dark:bg-white/[0.005] hover:bg-foreground/[0.02] hover:shadow-[0_8px_30px_rgba(0,0,0,0.02)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] relative overflow-hidden transition-colors duration-300 opacity-0"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <div className="relative z-10 mb-5 inline-flex items-center justify-center p-2.5 rounded-sm bg-accent/10 text-accent transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-110 group-hover:rotate-6">
                <Terminal className="h-4.5 w-4.5 stroke-[2]" />
              </div>
              <h3 className="relative z-10 mb-2 text-sm font-bold text-foreground tracking-tight">
                现代软件架构
              </h3>
              <p className="relative z-10 text-xs leading-relaxed text-foreground/60 group-hover:text-foreground/70 transition-colors">
                微服务设计、并发控制与高可用工程。记录复杂分布式环境下的真实架构决策。
              </p>
            </div>

          </div>

          {/* 最新技术推演列表 */}
          <div ref={postsRef} className="w-full opacity-0">
            <RecentPostsList />
          </div>

        </div>

        <MarketingFooter />
      </main>
    </div>
  );
}

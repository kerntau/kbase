"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowLeft, LayoutTemplate, ChevronRight, Terminal } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import BackgroundDecoration from "@/components/marketing/BackgroundDecoration";
import MarketingFooter from "@/components/layout/MarketingFooter";

export default function ManifestoContent() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 极简冷淡风入场动画
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.fromTo(
        ".manifesto-header",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15 }
      ).fromTo(
        ".manifesto-section",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.12 },
        "-=0.4"
      ).fromTo(
        ".manifesto-footer",
        { opacity: 0 },
        { opacity: 1, duration: 1 },
        "-=0.2"
      );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="relative flex min-h-screen flex-col overflow-hidden bg-background pt-24 pb-0 transition-colors duration-500">
      <BackgroundDecoration />

      <main className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col mb-24 md:mb-32">
        {/* 返回首页 - 阻尼悬浮 */}
        <Link
          href="/"
          className="manifesto-header group inline-flex items-center gap-1.5 text-[11px] font-mono font-medium text-foreground/50 hover:text-foreground hover:scale-[1.02] active:scale-[0.98] mb-12 md:mb-16 transition-all duration-300 select-none opacity-0 tracking-widest uppercase"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
          Return to Console
        </Link>

        {/* 主体信笺 / 终端卡片容器 */}
        <article className="relative w-full border border-divider/30 bg-foreground/[0.01] dark:bg-white/[0.005] rounded-sm p-6 sm:p-12 md:p-16 backdrop-blur-sm shadow-[0_8px_30px_rgba(0,0,0,0.02)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)]">
          
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-50" />

          {/* 标题区 */}
          <header className="manifesto-header flex flex-col gap-4 mb-16 select-none w-full opacity-0">
            <div className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-[10px] font-mono tracking-[0.2em] text-accent uppercase font-bold">
                Sequence.Stack // Manifesto
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground font-sans mt-2">
              代码即逻辑，边界即安全。
            </h1>
          </header>

          {/* 核心阅读区 */}
          <div className="space-y-12 text-[14px] sm:text-[15px] text-foreground/70 leading-[1.8] tracking-wide font-normal">
            
            {/* I. 现状 */}
            <section className="manifesto-section opacity-0 group">
              <h2 className="text-xs font-mono tracking-widest text-foreground font-semibold uppercase mb-4 flex items-center gap-3">
                <span className="text-accent">01.</span> Status Quo
                <div className="h-px flex-1 bg-divider/30 transition-colors group-hover:bg-divider/60"></div>
              </h2>
              <p className="text-justify font-serif">
                抽象层越堆越高，底层的机制越来越黑盒化。今天的开发充斥着对框架的生搬硬套与复制粘贴。很多人不再关心进程如何调度，不再在意内存碎片如何产生，只剩下不停地调用第三方 API。这是工程上的退步。
              </p>
            </section>

            {/* II. 本源 */}
            <section className="manifesto-section opacity-0 group">
              <h2 className="text-xs font-mono tracking-widest text-foreground font-semibold uppercase mb-4 flex items-center gap-3">
                <span className="text-accent">02.</span> The Origin
                <div className="h-px flex-1 bg-divider/30 transition-colors group-hover:bg-divider/60"></div>
              </h2>
              <p className="text-justify font-serif">
                代码是数理逻辑在机器上的精确执行。序栈的目标是剥离过度工程化的包装，回到最基本的技术实质。没有华丽的概念，只有确定的输入、处理和输出。白纸黑字，用真实的代码去解释运行真相。
              </p>
            </section>

            {/* III. 防御 */}
            <section className="manifesto-section opacity-0 group">
              <h2 className="text-xs font-mono tracking-widest text-foreground font-semibold uppercase mb-4 flex items-center gap-3">
                <span className="text-accent">03.</span> The Defense
                <div className="h-px flex-1 bg-divider/30 transition-colors group-hover:bg-divider/60"></div>
              </h2>
              <p className="text-justify font-serif">
                系统安全是检验架构健壮性的试金石。无论是内存破坏漏洞、网络协议利用还是分布式并发竞争，本质上都是输入跨越了预期的处理边界。研究边界、理解漏洞，是为了写出更加确定的代码。
              </p>
            </section>

            {/* IV. 实践 */}
            <section className="manifesto-section opacity-0 group">
              <h2 className="text-xs font-mono tracking-widest text-foreground font-semibold uppercase mb-4 flex items-center gap-3">
                <span className="text-accent">04.</span> The Practice
                <div className="h-px flex-1 bg-divider/30 transition-colors group-hover:bg-divider/60"></div>
              </h2>
              <p className="text-justify font-serif">
                技术不是玄学。这里不提供零基础速成，也不追逐快餐式的流量热点。我们只记录真实的工程实践、排坑过程和底层原理解析。用代码验证逻辑，仅此而已。
              </p>
            </section>
          </div>
          
          {/* 容器内的结束印记 */}
          <div className="manifesto-section opacity-0 mt-20 pt-8 border-t border-divider/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <span className="text-[10px] font-mono text-foreground/40 tracking-widest uppercase">
              End of Manifesto / V1.0
            </span>
            <span className="text-[10px] font-mono text-accent tracking-widest uppercase">
              [ INITIALIZED ]
            </span>
          </div>
        </article>

        {/* 底部按钮区 (独立 CTA) */}
        <div className="manifesto-footer flex flex-col items-center justify-center w-full mt-16 md:mt-24 select-none opacity-0">
          <Link
            href="/kb"
            className="group relative inline-flex items-center justify-center gap-3 rounded-sm bg-foreground text-background px-10 py-4 text-xs font-mono tracking-widest hover:bg-foreground/90 hover:shadow-[0_0_20px_rgba(var(--foreground-rgb),0.2)] transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1)"
          >
            <Terminal className="w-4 h-4 stroke-[2] opacity-70 group-hover:opacity-100 transition-opacity" />
            <span>ENTER KNOWLEDGE BASE</span>
            <ChevronRight className="w-4 h-4 opacity-70 transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) group-hover:translate-x-1 group-hover:opacity-100" />
            
            {/* 极简发光扫过效果 */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-background/10 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
          </Link>
        </div>
      </main>

      <MarketingFooter />
    </div>
  );
}

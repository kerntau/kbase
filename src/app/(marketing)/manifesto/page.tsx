import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, LayoutTemplate, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "发刊词：秩序边界与系统推演 | 序栈",
  description: "序栈技术发刊词。在这个数字喧嚣的时代，我们寻求一块安静的空间，以底层的逻辑推演与系统架构分析为骨架，记录对计算机技术世界最纯粹的探寻与追问。",
  keywords: ["发刊词", "序栈宣言", "技术思辨", "底层原理", "极客精神"],
};

export default function ManifestoPage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-between overflow-hidden bg-background pt-20 pb-8 px-4 sm:px-6 select-text transition-colors duration-500">
      
      {/* 背景细密网格与渐变消隐遮罩以及液态流光 */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-grid bg-grid-mask opacity-60" />
        <div className="absolute top-[-10%] left-[-20%] w-[70vw] h-[70vw] sm:w-[60vw] sm:h-[60vw] bg-accent/[0.02] rounded-full blur-[100px] sm:blur-[120px] bg-glow-blur-1" />
        <div className="absolute bottom-[-10%] right-[-15%] w-[60vw] h-[60vw] sm:w-[50vw] sm:h-[50vw] bg-blue-500/[0.015] rounded-full blur-[100px] sm:blur-[120px] bg-glow-blur-2" />
      </div>

      <div className="z-10 flex flex-col items-start text-left max-w-2xl w-full mx-auto my-auto relative pt-8 sm:pt-12">
        
        {/* 返回首页 - 阻尼悬浮 */}
        <Link
          href="/"
          className="animate-spring-reveal group inline-flex items-center gap-1.5 text-xs font-semibold text-foreground/50 hover:text-foreground hover:scale-[1.02] active:scale-[0.98] mb-8 md:mb-12 transition-all duration-300 select-none"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
          返回主页
        </Link>

        {/* 标题美学重塑：粗体 Sans + 细斜 Serif 强烈对比，并引入强调色渐变 */}
        <h1 className="animate-spring-reveal delay-100 flex flex-col gap-2.5 mb-8 md:mb-12 select-none w-full leading-tight">
          <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-sans">
            代码是逻辑的
            <span className="bg-gradient-to-r from-foreground via-foreground to-accent bg-clip-text text-transparent">具象</span>，
          </span>
          <span className="text-xl sm:text-2xl font-light italic font-serif text-foreground/45 ml-0.5">
            安全是系统的边界线。
          </span>
        </h1>

        {/* 文章主体 - 印刷级学术排版 */}
        <div className="animate-spring-reveal delay-200 space-y-7 md:space-y-10 text-[14px] sm:text-[15.5px] text-foreground/75 font-serif leading-[1.88] tracking-wide font-normal">
          
          {/* I. 喧嚣 */}
          <section className="flex flex-col gap-2">
            <span className="text-[10px] font-mono tracking-widest text-accent font-bold uppercase select-none">I. 喧嚣 / The Clamor</span>
            <p className="first-letter:float-left first-letter:text-4xl sm:first-letter:text-5xl first-letter:font-sans first-letter:font-extrabold first-letter:mr-2.5 first-letter:mt-1 first-letter:text-foreground first-letter:leading-none">
              在无限膨胀的数字平原之上，我们往往遗忘了秩序的起点。今天的技术领域充斥着喧嚣的快餐式结论与过度包装的概念，开发者在层层堆叠的抽象层中奔波，逐渐丧失了拆解底层的耐心。我们不再探究信号如何穿过物理介质，不再关心数据在内存中怎样精巧地排列。
            </p>
          </section>

          {/* II. 秩序 */}
          <section className="flex flex-col gap-2">
            <span className="text-[10px] font-mono tracking-widest text-accent font-bold uppercase select-none">II. 秩序 / The Order</span>
            <p>
              代码从来不是玄妙的神谕，它是人类理性与数理逻辑在硅基芯片上的精确投射。「序栈」执着于探寻和解构那些最本源的技术实质，以极简的白纸黑字呈现计算机底层原理的推演。当剥离掉一切冗余的喧嚣与过度工程化，展现在我们眼前的，是由严谨秩序构筑的确定性之美。
            </p>
          </section>

          {/* III. 边界 */}
          <section className="flex flex-col gap-2">
            <span className="text-[10px] font-mono tracking-widest text-accent font-bold uppercase select-none">III. 边界 / The Boundary</span>
            <p>
              安全，是计算机系统面临外部扰动时最严苛的检验。没有绝对无瑕的架构，只有在规则边界上的反复博弈。从二进制防护、内核防御到分布式系统的一致性保证，我们在此探寻逻辑规则受外部输入偏置时的边界所在。守住边界，才是秩序得以维系的基础。
            </p>
          </section>

          {/* IV. 躬行 */}
          <section className="flex flex-col gap-2">
            <span className="text-[10px] font-mono tracking-widest text-accent font-bold uppercase select-none">IV. 躬行 / The Practice</span>
            <p>
              在泥沙俱下的信息洪流中，唯有躬行实践与底层清醒方可抵御虚无。我们不提供速成的指南，只沉淀严谨的逻辑与不加粉饰的代码。保持对技术细节的敬畏与敏锐，知行合一，是通往真实技术真理的唯一阶梯。
            </p>
          </section>

        </div>

        {/* 底部按钮重构：弹性外发光卡片 */}
        <div className="animate-spring-reveal delay-300 flex flex-col sm:flex-row items-center gap-4 w-full mt-8 pt-5 md:mt-14 md:pt-8 border-t border-divider/40 select-none">
          <Link
            href="/kb"
            className="group flex items-center justify-center gap-2.5 w-full sm:w-auto rounded-xs bg-foreground text-background px-8 py-3.5 text-xs font-mono tracking-widest hover:bg-foreground/90 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(2,132,199,0.18)] active:scale-[0.98] transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1)"
          >
            <LayoutTemplate className="w-3.5 h-3.5 stroke-[2]" />
            ENTER CONSOLE / 进入知识库
            <ChevronRight className="w-3.5 h-3.5 transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) group-hover:translate-x-1" />
          </Link>
        </div>

      </div>

      {/* 底部版权与备案 - relative 布局，杜绝矮屏手机重叠遮挡 */}
      <footer className="animate-spring-reveal delay-500 w-full text-center mt-16 select-none text-[10px] font-mono tracking-wider font-light text-foreground/35 uppercase py-6 border-t border-divider/20">
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-3.5">
          
          <div className="flex items-center gap-2">
            <span>© 2026 序栈</span>
            <span className="w-0.5 h-0.5 rounded-full bg-divider" aria-hidden="true" />
            <span>保留所有权利</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[10px]">
            {/* EdgeOne */}
            <span className="inline-flex items-center gap-1.5 bg-muted/65 px-2 py-0.5 rounded-sm">
              <svg className="w-3 h-3 text-foreground/30 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              EdgeOne 驱动
            </span>

            {/* ICP 备案 */}
            <a 
              href="https://beian.miit.gov.cn/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-foreground hover:opacity-100 transition-opacity"
            >
              <svg className="w-2.5 h-2.5 text-foreground/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
              </svg>
              鄂ICP备2025157857号
            </a>

            {/* 公网安备 */}
            <a 
              href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=42018502008592" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-foreground hover:opacity-100 transition-opacity"
            >
              <svg className="w-2.5 h-2.5 text-foreground/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
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

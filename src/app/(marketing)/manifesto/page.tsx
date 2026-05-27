import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, LayoutTemplate, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "发刊词：逻辑具象与系统边界 | 序栈",
  description: "序栈发刊词。在这个数字喧嚣的时代，我们寻求一块安静的空间，以底层的逻辑推演与系统架构分析为骨架，记录对计算机技术世界最纯粹的探寻与追问。",
  keywords: ["发刊词", "序栈宣言", "技术思辨", "数字自留地", "极客精神"],
};

export default function ManifestoPage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-between overflow-hidden bg-background pt-16 pb-8 px-6 select-text">
      
      {/* 背景模糊液态流光 - 呼吸微光 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
        <div className="absolute top-[-10%] left-[-20%] w-[70vw] h-[70vw] sm:w-[60vw] sm:h-[60vw] bg-accent/[0.025] dark:bg-accent/[0.04] rounded-full blur-[100px] sm:blur-[120px] bg-glow-blur-1" />
        <div className="absolute bottom-[-10%] right-[-15%] w-[60vw] h-[60vw] sm:w-[50vw] sm:h-[50vw] bg-purple-500/[0.018] dark:bg-purple-500/[0.03] rounded-full blur-[100px] sm:blur-[120px] bg-glow-blur-2" />
      </div>

      <div className="z-10 flex flex-col items-start text-left max-w-2xl w-full mx-auto my-auto relative">
        
        {/* 返回首页 - 动画显现 */}
        <Link
          href="/"
          className="animate-spring-reveal group inline-flex items-center gap-1.5 text-xs font-semibold text-foreground/50 hover:text-foreground mb-8 md:mb-12 transition-colors select-none"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
          返回主页
        </Link>

        {/* 标题美学重构：粗体 Sans + 细斜 Serif 强烈对比 */}
        <h1 className="animate-spring-reveal delay-100 flex flex-col gap-2 mb-8 md:mb-12 select-none w-full">
          <span className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground font-sans">
            代码是逻辑的具象，
          </span>
          <span className="text-xl sm:text-2xl md:text-3xl font-light italic font-serif text-foreground/45 ml-0.5">
            安全是系统的边界线。
          </span>
        </h1>

        {/* 文章主体 - 印刷级学术排版 */}
        <div className="animate-spring-reveal delay-200 space-y-6 md:space-y-10 text-sm md:text-base text-foreground/75 font-serif leading-[1.85] tracking-wide font-normal">
          
          {/* I. 秩序 */}
          <section className="flex flex-col gap-1.5 md:gap-2">
            <span className="text-[10px] font-mono tracking-widest text-foreground/35 uppercase select-none">I. 秩序</span>
            <p className="first-letter:float-left first-letter:text-4xl sm:first-letter:text-5xl first-letter:font-serif first-letter:font-normal first-letter:mr-2.5 first-letter:mt-1 first-letter:text-foreground first-letter:leading-none">
              在无限膨胀的数字平原上，我们往往遗忘了秩序的起点。今天的互联网世界充斥着喧嚣的快餐式结论与过度包装的技术名词，人们在层层堆叠的抽象层与脚手架中奔波，却在不知不觉中丧失了拆解底层的热忱与耐心。
            </p>
          </section>

          {/* II. 边界 */}
          <section className="flex flex-col gap-1.5 md:gap-2">
            <span className="text-[10px] font-mono tracking-widest text-foreground/35 uppercase select-none">II. 边界</span>
            <p>
              「序栈」是我的数字自留地。作为一个信息安全专业的学生，我执着于追索系统的物理边界，以及规则之内的精密秩序。代码从来不是某种玄妙的神谕，它是人类理性与数理逻辑在硅基芯片上的具象映射；而安全，则是这一映射规则受到外部扰动时最严苛的检验。
            </p>
          </section>

          {/* III. 实质 */}
          <section className="flex flex-col gap-1.5 md:gap-2">
            <span className="text-[10px] font-mono tracking-widest text-foreground/35 uppercase select-none">III. 实质</span>
            <p>
              在此，我将用白纸黑字解构那些被浮躁遮盖的技术实质：从操作系统的内存管理、网络协议 the 隐秘交互、二进制渗透的防御博弈，到现代全栈架构的优雅演进。我不提供速成的答案，只保留严谨的路径推演与不加粉饰的代码沉淀。
            </p>
          </section>

          {/* IV. 阶梯 */}
          <section className="flex flex-col gap-1.5 md:gap-2">
            <span className="text-[10px] font-mono tracking-widest text-foreground/35 uppercase select-none">IV. 阶梯</span>
            <p>
              保持警惕，保持对安全边界的敏感。在泥沙俱下的信息洪流中，清醒的底层逻辑与躬行实践的克制，是通往技术真理的唯一阶梯。
            </p>
          </section>

        </div>

        {/* 底部按钮重构：直角极细描边 */}
        <div className="animate-spring-reveal delay-300 flex flex-col sm:flex-row items-center gap-4 w-full mt-8 pt-5 md:mt-14 md:pt-8 border-t border-divider">
          <Link
            href="/kb"
            className="group flex items-center justify-center gap-2 w-full sm:w-auto border border-foreground/30 text-foreground bg-transparent px-8 py-3.5 text-xs font-mono tracking-widest hover:border-foreground hover:bg-foreground hover:text-background transition-all duration-300 rounded-none active:scale-[0.98] select-none"
          >
            <LayoutTemplate className="w-3.5 h-3.5 stroke-[1.5]" />
            ENTER CONSOLE (进入知识库)
            <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

      </div>

      {/* 底部版权与备案 - relative 布局，杜绝矮屏手机重叠遮挡 */}
      <footer className="animate-spring-reveal delay-500 w-full text-center mt-16 select-none text-[10px] font-mono tracking-wider font-light text-foreground/35 uppercase py-4">
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

# 序栈 · XSTACK

<p align="center">
  <a href="https://nextjs.org">
    <img src="https://img.shields.io/badge/Next.js-16.2.6--Turbopack-000000?style=flat-square&logo=next.js" alt="Next.js">
  </a>
  <a href="https://react.dev">
    <img src="https://img.shields.io/badge/React-19.2.4-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React">
  </a>
  <a href="https://www.typescriptlang.org">
    <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript" alt="TypeScript">
  </a>
  <a href="https://tailwindcss.com">
    <img src="https://img.shields.io/badge/Tailwind_CSS-4.0-06B6D4?style=flat-square&logo=tailwindcss" alt="Tailwind CSS">
  </a>
  <a href="https://velite.js.org">
    <img src="https://img.shields.io/badge/Velite-0.3.1-FF5A1F?style=flat-square" alt="Velite">
  </a>
</p>

---

## 📖 简介

**序栈（XStack）** 是一个专注于**计算机底层原理、系统安全对抗与现代架构演进**的轻量级技术知识库。

本站致力于抛弃互联网浮躁的碎片化信息，以理性、中性的视角，留存最严谨的白纸黑字逻辑推演与工程代码沉淀。系统采用全静态导出（SSG）架构，确保极致的响应速度、高品质的排版设计和沉浸式的阅读体验。

---

## ⚡ 核心设计与交互特性

### 🔍 亚毫秒级中文全文检索
- **中英混合分词**：基于 `FlexSearch` 定制研发了中文单字与英文单词混合切分的高性能分词算法，大幅提升中文短语的召回率与准确度。
- **120ms 输入防抖**：对高频输入流实施防抖处理，避免频繁渲染阻塞浏览器主线程。
- **关键词高亮与滚动锚定**：采用 `mark` 动态渲染匹配文本，支持键盘 `↑` `↓` 键平滑滚动聚焦选项。

### 📚 学术级极致排版系统
- **知性配色体系**：深度融合明快温润的浅蓝（Teal/Cyan）色系，支持深/浅色模式自适应切换。
- **字体合成保护**：应用 `font-synthesis: style` 属性，强制禁止浏览器低质量合成非原生中文字体，同时解决了 SVG 图标被浏览器强行加粗变形的排版隐患。
- **呼吸感版心控制**：段落行高收紧至 `1.72`，标题字号根据排版密度进行黄金比例缩减，在大屏下正文版心严格控制在 `820px`，呈现严肃且舒适的阅读质感。

### 🖱️ 沉浸式阅读交互
- **左右方向键导航**：在非输入状态下，可直接通过键盘 `←` 和 `→` 方向键，无缝且顺畅地在“上一篇”与“下一篇”技术推演之间进行翻页。
- **防抖大纲追踪 (TOC)**：具备防抖锁定的 TOC 滚动定位。点击大纲锚点时自动加锁，过滤掉跳转中间过程的干扰高亮；在组件销毁时提供完整的垃圾清理，避免 scrollend 内存残留。
- **极简底部导航**：重构并精简了底部的导航卡片，大幅压缩物理高度，在第一篇或最后一篇时自动在移动端隐去空白虚线框，释放小屏高度空间。

### 🎨 工业级视觉细节
- **高通透磨砂玻璃**：官网 Bento 栅格及侧边栏采用低圆角、高通透度的磨砂玻璃效果，搭配中心向外渐隐的 `40px` 细网格工业背景。
- **阻尼感物理特效**：交互按钮与看板链接在悬停时支持 `will-change` 硬件加速，伴有浅蓝色外发光、小图标弹性旋转及 `1px` 跟手平移。
- **扩展 MDX 渲染**：支持 GitHub Alerts (Note, Tip, Warning...) 解析渲染；拦截原生 `details/summary` 实现平滑的展开折叠卡片；自研基于毛玻璃背景的零依赖图片放大灯箱 (Lightbox)。

---

## 🛠️ 技术架构

系统采用纯静态构建管线，实现了从 markdown 源码到全量静态托管服务的极简流转：

```text
  Markdown 源码 (content/)
         │
         ▼
  Velite 静态解析 (.velite/) ────► 编译生成文档 HTML、TOC、元数据
         │
         ▼
  检索索引脚本 (scripts/) ──────► 抽取高频词生成 FlexSearch 序列化索引
         │
         ▼
  Next.js 编译导出 (out/) ──────► 输出纯静态资源，支持任何静态托管平台
```

---

## 📂 项目结构规范

```text
.
├── content/                # 知识库技术源文档 (Markdown / MDX)
│   ├── backend/            # 后端架构与分布式系统推演
│   ├── database/           # 数据库设计、索引与事务分析
│   ├── devops/             # 基础设施建设与持续集成交付
│   ├── frontend/           # 前端底层机制与现代全栈演进
│   └── security/           # 网络安全对抗、系统底层与边界防御
├── scripts/                # 构建辅助脚本
│   └── build-search-index.js # 自动化检索索引生成脚本
├── src/                    # 应用程序源代码
│   ├── app/                # App Router 路由节点与全局样式
│   ├── components/         # 核心交互组件 (Search, MDXRender, TOC 等)
│   ├── context/            # 全局 UI 状态上下文 (侧栏折叠、弹窗等)
│   └── utils/              # 目录树组装等辅助算法
├── velite.config.ts        # Velite 强类型 Schema 定义与配置
├── next.config.ts          # Next.js 静态打包编译配置
└── package.json            # 项目依赖声明与运行脚本
```

---

## 🚀 开发者与部署指南

### 本地开发

1. **环境准备**：
   确保安装 Node.js (v18+) 与 pnpm 包管理器。

2. **安装依赖**：
   ```bash
   pnpm install
   ```

3. **启动开发服务器**：
   此命令会同时拉起 Velite 内容热重载监听器与 Next.js 开发服务器。
   ```bash
   pnpm dev
   ```
   打开浏览器访问 [http://localhost:3000](http://localhost:3000)。

### 生产静态导出

1. **静态打包构建**：
   ```bash
   pnpm build
   ```
   运行该命令后，系统将依次进行数据集解析、FlexSearch 索引文件生成、TS 类型静态校验，并在项目根目录下生成 `out/` 目录。

2. **线上部署**：
   直接将 `out/` 文件夹中的静态页面和资源上传至 Nginx、GitHub Pages、Cloudflare Pages 或 Vercel 即可。

---

## 📜 提交与工程纪律

本项目严格遵守工程约束，保证代码的可维护性与提交历史的纯净：

- **变更验证**：所有功能迭代在提交前必须本地通过 `pnpm build` 全量静态编译。
- **Git 提交格式**：严格使用 Angular 格式进行原子化提交：
  ```text
  <type>(<scope>): <subject>
  ```
  *示例：`fix(search): 修复中文全文检索分词器 TS 类型报错`*

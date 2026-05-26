---
title: NextJS 渲染模式
date: 2026-05-26
category: frontend
description: 全面解析 Next.js 的各种渲染模式，对比 SSR、SSG、ISR 与 CSR 的技术细节与适用场景。
---

## 引言

在当今前端工程中，选择合适的渲染模式对首屏加载时间（FCP）、搜索引擎优化（SEO）以及用户交互体验至关重要。作为 React 生态中最主流的元框架，Next.js 提供了极其灵活的渲染策略，支持按页面甚至按组件维度选择最优方案。

## 核心渲染模式解析

### CSR (Client-Side Rendering)
- **机制**：标准的 React 应用开发模式。服务器只返回一个空的 HTML 壳和 JS 脚本，所有的页面渲染和数据获取完全在浏览器中完成。
- **缺点**：首屏白屏时间长，对 SEO 极不友好。

### SSR (Server-Side Rendering)
- **机制**：每次用户请求页面时，服务器都会在后端运行 React 代码，获取数据并渲染出完整的 HTML，然后返回给浏览器。
- **优点**：有利于 SEO，首屏呈现速度快。
- **缺点**：服务器压力大，每次请求都需要实时渲染。

### SSG (Static Site Generation)
- **机制**：在项目构建阶段（Build Time），将所有页面直接渲染为静态 HTML 文件。
- **优点**：加载速度极快，可直接通过 CDN 缓存，安全性高。
- **缺点**：不适合频繁更新的内容，且当页面量巨大时，构建时间会极其漫长。

### ISR (Incremental Static Regeneration)
- **机制**：结合了 SSG 和 SSR 的优势。允许开发者在后台增量生成静态页面，而无需重新构建整个网站。
- **配置方式**：
  ```javascript
  export async function getStaticProps() {
    const data = await fetchSomeData();
    return {
      props: { data },
      revalidate: 60, // 60秒内最多只重新生成一次
    };
  }
  ```

## React Server Components (RSC) 的引入

### 组件维度的服务器端渲染
在 Next.js 13+ 的 App Router 架构中，所有组件默认都是服务器组件（Server Components）。它们只在服务器端运行，其生成的中间结构被发送到浏览器，而它们的 JS 代码完全不会被打包进客户端 bundle 中。这极大地减小了客户端 JS 的体积。

### 服务端组件与客户端组件的混用
当组件需要使用浏览器特有 API（如 `window`）、React 状态（`useState`）或生命周期（`useEffect`）时，需在文件顶部添加 `"use client"` 指令，显式将其声明为客户端组件。

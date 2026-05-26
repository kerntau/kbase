---
title: 前端性能监控指标
date: 2026-05-26
category: frontend
description: 梳理现代前端性能监控指标（Web Vitals），探讨如何构建科学的性能监控与报警体系。
---

## 引言

“无法衡量的东西就无法被优化”。在前端工程中，仅仅依靠开发者本地的 Lighthouse 跑分是远远不够的，必须通过收集真实用户数据（RUM）建立全面的监控体系，以数据驱动页面性能的持续优化。

## Google Web Vitals 核心指标

Google 提出了以用户体验为核心的 Web Vitals 体系，并筛选出三个最核心的指标（Core Web Vitals）：

### LCP (Largest Contentful Paint)
- **定义**：最大内容绘制时间。衡量页面的加载速度，即页面上最大的文本块或图像渲染完成的时间。
- **标准**：优秀应当控制在 2.5 秒以内。

### FID 与 INP
- **FID (First Input Delay)**：首次输入延迟。衡量页面的交互响应性。
- **INP (Interaction to Next Paint)**：交互到下次绘制。这是 Google 用来替代 FID 的新指标，它衡量了用户在访问页面期间发生的所有交互的延迟，比 FID 更全面。
- **标准**：INP 优秀应当控制在 200 毫秒以内。

### CLS (Cumulative Layout Shift)
- **定义**：累积布局偏移。衡量页面的视觉稳定性，即页面在加载过程中是否发生意料之外的元素抖动。
- **标准**：优秀分值应小于 0.1。

## 性能数据的捕获方式

### PerformanceObserver API
在客户端，我们可以利用浏览器原生提供的 `PerformanceObserver` API 来实时捕获性能数据：
```javascript
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log(`${entry.name}: ${entry.startTime}`);
  }
});
observer.observe({ type: 'largest-contentful-paint', buffered: true });
```

### 异常上报与性能埋点
除了标准性能指标，还需要捕获 JS 错误、资源加载失败以及 API 请求耗时。所有捕获的数据应合并成一条心跳日志，通过 `navigator.sendBeacon` 在浏览器空闲或页面卸载时异步上报，以确保不会影响主线程的运行。

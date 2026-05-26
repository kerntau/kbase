---
title: React 并发渲染深挖
date: 2026-05-26
category: frontend
description: 深入解析 React 并发模式的工作原理，包括 Fiber 架构、Scheduler 调度机制以及 Transition 的底层原理。
---

## 引言

在现代前端开发中，用户体验的流畅度是衡量应用质量的核心指标。React 自 v18 引入并发渲染（Concurrent Rendering）以来，彻底改变了其底层的更新机制。本文将深入探讨并发渲染的底层架构与工作原理。

## Fiber 架构的演进

### 堆栈调和的局限性
在 React 16 之前，React 采用堆栈调和（Stack Reconciler）。堆栈调和的过程是同步且不可中断的。一旦更新开始，React 会一直占用主线程直至整个 DOM 树更新完毕。如果页面结构复杂，这种同步计算会导致浏览器掉帧，产生明显的卡顿。

### 双缓存 Fiber 树
为了解决中断与恢复的问题，React 引入了 Fiber 架构。Fiber 是一种链表数据结构，每个 Fiber 节点代表一个工作单元。React 会同时维护两棵树：
- **Current Fiber Tree**：代表当前在屏幕上呈现的视图。
- **WorkInProgress Fiber Tree**：正在内存中构建的新树。

通过这种双缓存机制，React 可以在内存中异步构建新树，在完全构建完成后一次性提交（Commit），从而避免了渲染过程中的不一致性。

## Scheduler 调度机制

### 时间分片原理
并发渲染的核心是时间分片（Time Slicing）。Scheduler（调度器）通过 `requestIdleCallback` 的 Polyfill 机制，利用浏览器空闲时间执行任务。它将一个大任务拆分为多个小任务，在每个小任务执行完毕后，检查是否超出了分配的时间片（通常为 5ms）。如果超时，则将控制权交还给浏览器进行渲染，并在下一次空闲时恢复执行。

### 任务优先级定义
Scheduler 定义了五种优先级，用以决定任务的调度顺序：
- **ImmediatePriority**：最高优先级，需立即执行。
- **UserBlockingPriority**：用户阻塞优先级，如点击、输入等交互。
- **NormalPriority**：普通优先级，如网络请求返回后的更新。
- **LowPriority**：低优先级，可延后执行的任务。
- **IdlePriority**：空闲优先级，完全不在意执行时间的后台任务。

## Transition 的底层机制

### startTransition 的作用
`startTransition` 允许开发者将某些更新标记为非紧急更新。例如，在搜索框输入时，输入框的显示是紧急的，而下方的搜索结果列表展示是非紧急的。

### 状态中断与切换
当高优先级的输入事件触发时，React 会立即中断正在进行的 WorkInProgress 树的非紧急构建，优先处理输入事件的更新。输入事件处理完成后，React 再重新开始或恢复非紧急任务的构建。这种能力使得界面在重度更新时依然能对用户交互做出即时响应。

---
title: CSS Grid 布局实战
date: 2026-05-26
category: frontend
description: 系统讲解 CSS Grid 网格布局的核心概念、高级属性及响应式布局的实战应用。
---

## 引言

CSS Grid 是 CSS 中最强大的二维布局系统。与 Flexbox 的一维布局（单行或单列）不同，Grid 能够同时处理行和列，这使它成为构建复杂网页结构和响应式界面的终极武器。

## Grid 核心概念

### 网格容器与网格项目
通过将容器的 `display` 属性设置为 `grid` 或 `inline-grid`，该容器的直接子元素就会自动变为网格项目（Grid Items）。

### 网格线与网格轨道
- **网格线（Grid Lines）**：构成网格结构的水平和垂直分割线，编号从 1 开始。
- **网格轨道（Grid Tracks）**：相邻两条网格线之间的空间，即网格的行或列。

## 常用属性与单位

### fr 单位与 repeat 函数
`fr`（Fraction）是 Grid 特有的弹性长度单位，代表网格容器剩余空间的分数。
```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 均分三列 */
}
```

### 网格间距 Gap
通过 `row-gap`、`column-gap` 或简写的 `gap` 属性，可以非常方便地定义网格轨道之间的间距，而无需像以前那样依赖复杂的 `margin` 计算。

## 响应式布局实战

### minmax 与 auto-fit
结合 `minmax()` 函数与 `auto-fit`/`auto-fill` 关键字，可以实现无需媒体查询（Media Queries）的自适应布局：
```css
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}
```
这段代码确保了每个子项目最小为 200px，当屏幕空间足够时自动填充并平分剩余空间。

### 命名网格区域 Grid Area
使用 `grid-template-areas` 可以用极其直观的可视化方式布局网页结构：
```css
.container {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-rows: 80px 1fr 60px;
  grid-template-columns: 200px 1fr;
}
.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }
```
这为后期的维护和页面重构提供了极高的可读性。

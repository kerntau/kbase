---
title: Vite 迁移指南
date: 2026-05-26
category: frontend
description: 从传统 Webpack 构建工具平滑迁移至构建利器 Vite 的实践方案与调优指南。
---

## 引言

随着前端项目的体积不断增加，传统的构建工具如 Webpack 在开发环境下的启动和热更新（HMR）速度变得越来越难以忍受。Vite 利用了浏览器原生支持 ESM 的特性，带来了极速的开发体验。本文将详细介绍如何从 Webpack 迁移到 Vite。

## 构建理念的差异

### 捆绑构建与原生 ESM
Webpack 在开发模式下需要将所有模块进行打包捆绑，生成 bundle 后才能提供服务。而 Vite 在开发模式下无需打包，它利用浏览器原生的 `import` 请求，按需加载和编译对应的模块。这使得 Vite 的启动速度几乎不受项目规模影响。

### 预构建机制
对于第三方依赖（如 React、lodash），Vite 采用 esbuild 进行预构建（Dependency Pre-bundling）。esbuild 使用 Go 语言编写，其编译速度比 JavaScript 构建工具快 10 到 100 倍。预构建不仅将 CommonJS 模块转换为 ESM，还将多文件依赖合并，减少 HTTP 请求数。

## 迁移步骤详解

### 第一步：修改依赖与配置文件
首先需要移除 Webpack 相关依赖，并安装 Vite 及其插件。
```bash
npm uninstall webpack webpack-cli webpack-dev-server
npm install vite @vitejs/plugin-react -D
```
在根目录下新建 `vite.config.js`，配置基础插件与路径别名：
```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

### 第二步：调整 index.html 位置
在 Webpack 中，`index.html` 通常作为模板存放在 `public` 目录中。在 Vite 中，`index.html` 被视为源码的一部分，应直接存放在项目根目录下。此外，需要在 `index.html` 中引入入口脚本：
```html
<script type="module" src="/src/main.jsx"></script>
```

### 第三步：环境变量的替换
Webpack 使用 `process.env` 获取环境变量，而 Vite 使用 `import.meta.env`。迁移时需进行批量替换：
- `process.env.NODE_ENV` 替换为 `import.meta.env.MODE`
- 自定义变量前缀从 `APP_` 或其他修改为 `VITE_`

## 常见兼容性问题

### CommonJS 依赖报错
部分老旧的 NPM 包仍在使用 CommonJS 格式，导致在 Vite 的 ESM 环境下报错。可以通过在 `vite.config.js` 中配置 `optimizeDeps.include` 显式将其纳入预构建。

### 样式表导入差异
Vite 默认支持 CSS Modules 和 CSS 预处理器，但对于使用了 CSS-in-JS 的复杂项目，可能需要配置专门的 Babel 插件。

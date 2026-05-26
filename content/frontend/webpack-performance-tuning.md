---
title: Webpack 性能调优
date: 2026-05-26
category: frontend
description: 全方位解析 Webpack 打包优化策略，涵盖打包速度提升、产物体积缩减以及缓存利用。
---

## 引言

虽然新兴构建工具不断涌现，但 Webpack 依然是目前企业级应用中最主流的打包工具。深入掌握 Webpack 的性能调优方法，能够显著提升团队的开发效率并优化线上用户的加载体验。

## 构建速度优化

### 缩小文件搜索范围
在 Webpack 配置中，限制 Loader 的作用范围可以大幅减少编译时间。利用 `include` 和 `exclude` 精准控制：
```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/
      }
    ]
  }
};
```

### 多进程并行构建
对于大型项目，利用多核 CPU 执行多进程打包能显著缩短时间。可以使用 `thread-loader` 将耗时的 Loader 操作放入单独的 worker 池中运行。

### 开启持久化缓存
Webpack 5 引入了功能强大的 `cache` 配置，可以将构建生成的 AST 和模块直接缓存到磁盘中，后续构建即可实现秒级热启动：
```javascript
module.exports = {
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename]
    }
  }
};
```

## 产物体积优化

### Tree Shaking 深度利用
Tree Shaking 能够剔除未使用的代码。要确保其发挥最大效用，需满足：
- 源码必须使用 ESM（`import` / `export`）语法。
- 在 `package.json` 中配置 `sideEffects: false`，告知 Webpack 哪些模块是可以安全裁剪的。

### 分包策略 SplitChunks
合理的代码分割能够避免生成单一的巨大 JS 文件。利用 `optimization.splitChunks` 将第三方库和业务代码分离：
```javascript
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        }
      }
    }
  }
};
```

## 线上加载性能调优

### 预加载指令 Preload 与 Prefetch
合理使用 `import(/* webpackPrefetch: true */ './module')` 可以在浏览器空闲时提前下载后续可能用到的静态资源，从而实现页面的无缝切换。

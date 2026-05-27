# 序栈 | Digital Space

> 秩序之始与技术之栈。
> 一个专注于网络安全、系统底层与现代全栈架构推演的数字自留地。
> 去除网络浮躁，留存白纸黑字的思考与代码沉淀。

---

## 核心设计特性

| 维度 | 设计实现 | 业务价值 |
| :--- | :--- | :--- |
| 视觉风格 | 现代暗色微光质感与经典衬线字体排版结合，自适应移动端布局 | 保证长文阅读的沉浸感与工程品质感 |
| 内容引擎 | 基于 Velite 将 Markdown/MDX 静态编译为强类型数据 | 提供零运行时代价的页面内容转换与极速加载 |
| 全文检索 | 利用 FlexSearch 在构建期对内容分词，生成客户端离线索引 | 实现亚毫秒级的前端全文检索，无需依赖外部搜索引擎服务 |
| 交互细节 | 包含精确到毫秒的渐变倒计时、无级收折侧边栏以及平滑微动画 | 提升交互反馈的响应性与愉悦度 |

---

## 技术架构

系统采用全静态化导出架构，整体数据流向如下所示：

```text
Markdown 源码 (content/)
       │
       ▼
Velite 静态编译 (.velite/) ───► 生成 HTML、TOC、Metadata
       │
       ▼
检索索引构建脚本 (scripts/) ───► FlexSearch 序列化索引 (public/search-index.json)
       │
       ▼
Next.js 静态导出 (out/) ─────► 纯静态资源部署 (HTML/CSS/JS)
```

### 核心技术栈

- 基础框架：Next.js 16.2.6 (App Router)
- 视图逻辑：React 19.2.4 + TypeScript
- 样式系统：Tailwind CSS 4.0
- 内容管理：Velite 0.3.1
- 全文检索：FlexSearch 0.8.212

---

## 项目目录结构

```text
.
├── content/              # 知识库 MD/MDX 源文件分类目录
│   ├── backend/          # 后端开发与架构设计
│   ├── database/         # 数据库设计与优化
│   ├── devops/           # 容器化与持续集成
│   ├── frontend/         # 前端底层与全栈推演
│   └── security/         # 网络安全与底层系统
├── scripts/              # 辅助构建脚本
│   └── build-search-index.js # 离线检索索引生成脚本
├── src/                  # Next.js 应用程序源码
│   ├── app/              # App Router 路由与全局样式
│   ├── components/       # 核心 UI 交互组件 (Countdown, Search, WikiShell 等)
│   ├── context/          # 全局 UI 状态上下文 (UIContext)
│   └── utils/            # 辅助工具函数 (文档树生成等)
├── velite.config.ts      # Velite 数据集及 Schema 配置文件
├── next.config.ts        # Next.js 编译与静态导出配置文件
└── package.json          # 依赖管理及构建脚本
```

---

## 开发与构建指南

### 本地开发环境启动

1. 安装依赖：
   ```bash
   npm install
   ```

2. 启动开发服务器（此命令会并行启动 Velite 监听器与 Next.js 开发服务）：
   ```bash
   npm run dev
   ```

3. 访问本地地址：
   打开浏览器访问 http://localhost:3000

### 生产静态导出构建

1. 执行全量静态构建：
   ```bash
   npm run build
   ```
   该构建命令会依次执行：
   - 调用 Velite 解析 `content` 并生成静态强类型 JSON。
   - 运行索引脚本抽取文本，编译生成 `public/search-index.json`。
   - 调用 Next.js 静态打包，最终在 `out/` 目录生成完整的静态网站。

2. 静态部署：
   直接将 `out/` 目录下的所有静态文件部署到 Nginx、Caddy、GitHub Pages 或 Cloudflare Pages 等托管服务即可。

---

## 工程约束说明

项目遵循严格的代码与提交宪法。所有代码变更均需通过静态构建验证，且 Git 提交应严格遵守原子化提交规范，格式限定为：

```text
<type>(<scope>): <subject>
```

允许的提交类型（Type）包括：feat（新功能）、fix（缺陷修复）、refactor（重构）、perf（性能优化）、docs（文档修改）、style（格式调整）、test（测试用例）、chore（构建工具/辅助任务）。

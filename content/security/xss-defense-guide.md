---
title: XSS 漏洞原理及防御
date: 2026-05-26
category: security
description: 系统讲解跨站脚本攻击（XSS）分类，剖析黑客攻击手法并提供前后端联防实战策略。
---

## 引言

跨站脚本攻击（Cross-Site Scripting, XSS）是前端安全领域最常见的顽疾。黑客通过在网页中注入恶意的 JavaScript 脚本，在受害者浏览器中执行。该脚本可窃取用户的 Cookie、Token，甚至假冒用户在当前网站发起任何越权操作，带来极高危害。

## XSS 攻击的经典分类

### 1. 存储型 XSS (Stored XSS)
恶意脚本被直接提交到数据库中（例如在论坛留言板中输入带有 `<script>` 的评论）。所有访问该评论页面的用户浏览器都会下载并执行这一恶意脚本，影响范围最大。

### 2. 反射型 XSS (Reflected XSS)
恶意脚本通过 URL 参数直接带入（如 `http://example.com/search?keyword=<script>...</script>`）。服务器在渲染搜索页面时直接将该关键字打印在页面上，只有诱导用户点击该特定链接时才会触发。

### 3. DOM 型 XSS (DOM-based XSS)
与服务器端无关，纯粹是前端 JavaScript 编写不当（例如直接在网页中通过 `eval()` 或 `innerHTML` 渲染不可信任的 URL 参数值），导致浏览器直接运行了注入的代码。

## 前后端联防实战

### 后端：严格的数据转义与过滤
对所有外部输入的数据，在写入数据库前必须做转义（HTML Entity Escape），将尖括号等特殊字符转成安全的展示实体：
```text
< 转换为 &lt;
> 转换为 &gt;
```
如果业务需要支持富文本（允许输入部分 HTML 标签），应使用专业的 HTML 过滤库（如 Java 的 `Jsoup`，Node.js 的 `DOMPurify`），使用严格的白名单机制，将 `<script>`、`onload`、`onerror` 等危险标签和属性剔除。

### HTTPOnly Cookie 属性
在登录成功设置 SessionID 或 Token 时，务必加上 `HttpOnly` 属性。这可以防止任何前端 JavaScript 通过 `document.cookie` 读取该 Cookie，即使网站不小心被攻入 XSS，黑客也无法直接窃取用户的登录态。

---
title: CSRF 漏洞原理及防御
date: 2026-05-26
category: security
description: 揭秘跨站请求伪造（CSRF）的工作原理，分享业界主流的防范策略如 CSRF Token。
---

## 引言

跨站请求伪造（Cross-Site Request Forgery, CSRF）被戏称为 Web 安全中的“借刀杀人”。攻击者利用用户在目标网站已经登录的身份凭证（通常是 Cookie），通过第三方恶意网页，在用户不知情的情况下，借用用户的浏览器向目标网站发送越权请求（如转账、修改个人邮箱）。

## CSRF 攻击的核心原理

1. 用户登录了合法网站 A，并在浏览器中留下了 A 的 Session Cookie。
2. 用户在未退出登录的情况下，不小心访问了黑客精心构造的恶意网站 B。
3. 网站 B 的网页中包含指向网站 A 敏感操作的隐藏请求（如 `<img src="http://bank.com/transfer?to=hacker&amount=1000">`）。
4. 用户的浏览器在解析该标签时，会自动带上网站 A 域名下的 Cookie，将转账请求发送给网站 A。
5. 网站 A 看到 Cookie 认为这确实是用户本人的操作，成功执行了敏感操作。

## 业界主流防御策略

### 1. CSRF Token 机制
这是最常用、也最稳健的防御手段。
- **工作流**：在用户登录或访问页面时，服务器生成一个随机的 CSRF Token（必须与 Session 关联并具备时效性）下发给前端。
- **校验流程**：前端在发起任何 `POST`/`PUT`/`DELETE` 等敏感修改请求时，必须在自定义请求头（如 `X-CSRF-Token`）中携带该 Token。服务器端拦截并校验请求头中的 Token 是否与 Session 存储一致。由于黑客的恶意网页只能跨域发送请求而无法读取目标网站的 DOM 资源，黑客无法拿到此 Token，攻击将直接失败。

### 2. Cookie 的 SameSite 属性
在现代浏览器中，设置 Cookie 时建议指定 `SameSite` 属性：
- **Strict**：完全禁止第三方网站带上该 Cookie。
- **Lax**：仅允许顶级导航（如链接点击）携带 Cookie，通过 AJAX 跨域发送请求时一律不带，这极大地防范了常规的 CSRF 攻击。

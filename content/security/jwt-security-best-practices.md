---
title: JWT 安全使用规范
date: 2026-05-26
category: security
description: 探讨 JSON Web Token（JWT）在分布式授权中的安全漏洞、防御措施及防重放攻击策略。
---

## 引言

JWT（JSON Web Token）作为一种无状态（Stateless）的令牌机制，被广泛用于前后端分离和微服务架构的身份校验。然而，由于很多开发者没有正确理解 JWT 的安全边界，导致项目中频频暴露 JWT 被伪造、篡改或盗用等高危安全漏洞。

## JWT 的底层构成与篡改机理

JWT 由三部分组成，通过圆点 `.` 隔开：
- **Header（头部）**：声明类型和签名算法（如 HS256、RS256）。
- **Payload（负载）**：包含声明的用户 ID、过期时间（exp）等真实数据。
- **Signature（签名）**：利用 Header 和 Payload 拼接后，使用密钥进行哈希计算得出的签名，用于验证数据是否被篡改。

### 致命的 "alg": "none" 漏洞
很多早期或编写不规范的 JWT 校验库在接收到 `alg`（算法）被修改为 `none` 的 Token 时，会跳过签名校验，直接信任 Payload 内的数据。攻击者通过伪造 Payload，并将 `alg` 设为 `none`，便能轻松冒充系统管理员。
- **防御机制**：务必在后端校验代码中明确限制允许的签名算法（如强行要求只能是 `HS256`），并升级所有的安全依赖库。

## JWT 安全防范最佳实践

### Payload 严禁存放敏感明文
JWT 的 Header 和 Payload 只是经过了 `Base64URL` 编码，任何人都可以直接在客户端解码还原。因此，千万不能在 Payload 中存储用户的密码、手机号等敏感隐私数据，只存储脱敏后的用户 ID 和角色信息。

### 短过期时间与双 Token 机制
由于 JWT 是无状态的，一旦生成，除非在服务器端引入黑名单（这会破坏无状态的初衷），否则在过期前是无法主动撤销的。
- **最佳实践**：采用双 Token（Access Token 和 Refresh Token）架构。
  - **Access Token**：用于业务调用，过期时间设为极短（如 15 分钟）。
  - **Refresh Token**：仅用于刷新 Access Token，存储在更安全的 Httponly Cookie 中，过期时间较长（如 7 天）。一旦用户注销，直接在后端将 Refresh Token 废弃，实现安全退出。

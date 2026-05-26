---
title: HTTPS 证书配置指南
date: 2026-05-26
category: security
description: 学习如何在 Nginx 等 Web 服务器上配置安全、高性能的 HTTPS 证书及 SSL/TLS 协议加固。
---

## 引言

传统的 HTTP 协议以明文形式在网络上传输数据，极易被中间人（MITM）进行监听和篡改。部署 HTTPS（即 HTTP over SSL/TLS）是当今 Web 应用的安全标配。本文将提供从证书获取、Nginx 配置到 TLS 协议安全加固的完整实践。

## 证书获取与申请

### Let's Encrypt 免费证书
对于大多数企业和个人项目，使用 Let's Encrypt 提供的免费 DV（域名验证）证书完全足够。可以通过自动化工具 `certbot` 极其方便地完成证书申请和自动续签：
```bash
sudo certbot --nginx -d example.com
```

### 通配符证书 (Wildcard Certificates)
如果你拥有多个子域名（如 `api.example.com`、`app.example.com`），建议申请通配符证书（`*.example.com`），以便一个证书同时保护所有子域，简化运维成本。

## Nginx 高性能配置实践

在 Nginx 中，需要配置监听 443 端口，并指定证书及私钥文件：
```nginx
server {
    listen 443 ssl http2;
    server_name example.com;

    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;

    # 仅允许安全的 TLS 协议版本
    ssl_protocols TLSv1.2 TLSv1.3;
    
    # 推荐的高安全密码套件 (Cipher Suites)
    ssl_ciphers 'ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384';
    ssl_prefer_server_ciphers on;

    # SSL 会话缓存提升性能
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 1d;
}
```

## SSL/TLS 安全加固

### HSTS 策略配置
通过启用 HSTS（HTTP Strict Transport Security），强制浏览器在后续访问中自动将所有 HTTP 请求转换为 HTTPS 请求，彻底避免因用户输入 `http://` 产生的中间人劫持风险：
```nginx
add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
```
配置该 Header 后，即使攻击者尝试建立明文链接，现代浏览器也会直接拒绝连接。

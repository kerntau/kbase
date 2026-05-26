---
title: Nginx 负载均衡配置
date: 2026-05-26
category: devops
description: 深入解析 Nginx 反向代理与负载均衡的配置要点，探讨不同的转发算法与容灾机制。
---

## 引言

高并发系统的核心法则之一就是“水平扩展”。而在多台服务器后端实例组成的集群前，必须有一层高并发、轻量级的负载均衡器来合理分发流量。Nginx 凭借其出色的事件驱动模型和低内存占用，成为了此位置的不二之选。

## 核心负载均衡算法

在 Nginx 中，通过在 `upstream` 块中配置服务节点，可以实现不同的转发调度算法：

### 1. 轮询 (Round Robin)
Nginx 默认的算法，将请求按顺序依次分发到后端服务器上。适合后端服务器性能完全一致的场景。

### 2. 加权轮询 (Weighted Round Robin)
根据服务器配置性能，手动指定权重。权重越高，分发的请求越多：
```nginx
upstream backend_servers {
    server 192.168.1.10:8080 weight=3;
    server 192.168.1.11:8080 weight=1;
}
```

### 3. ip_hash
根据客户端 IP 计算哈希值，然后将其路由到特定后端实例。这一算法确保了同一个 IP 的客户端请求始终落在同一台后端服务器上，能有效解决传统单机 Session 共享问题。

### 4. least_conn (最少连接)
每次将新请求分发到当前活跃连接数最少的那个服务器上，以此来避免某些节点因耗时任务产生积压而导致负载不均。

## 主动健康检查与容灾

Nginx 默认支持被动的健康检查。当后端节点不可用时，Nginx 可以暂时将其摘除，防止持续报错：
```nginx
upstream backend_servers {
    server 192.168.1.10:8080 max_fails=3 fail_timeout=30s;
    server 192.168.1.11:8080 max_fails=3 fail_timeout=30s;
}
```
- `max_fails=3`：在 `fail_timeout` 时间内累计失败达 3 次，则判定该节点挂掉。
- `fail_timeout=30s`：当判定挂掉后，在此 30 秒周期内 Nginx 不会再把任何请求分发给它，等过了 30 秒再尝试分发请求以检测是否恢复。

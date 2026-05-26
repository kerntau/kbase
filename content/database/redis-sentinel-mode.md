---
title: Redis 哨兵机制详解
date: 2026-05-26
category: database
description: 全方位解析 Redis Sentinel 哨兵模式，阐述监控、故障转移和共识判定的工作原理。
---

## 引言

在高并发生产环境中，我们不能容忍单机版 Redis 挂掉导致的服务中断。为了实现自动的高可用容灾，Redis 提供了 Sentinel（哨兵）架构。它能自动监控主节点状态，并在主节点挂掉时将从节点安全地提升为新主节点，从而保证服务不中断。

## 哨兵的核心职责

Redis Sentinel 是一个独立的运行进程，它负责以下三个核心任务：

### 1. 监控 (Monitoring)
哨兵会周期性地给所有 Redis Master、Slave 节点以及其他哨兵发送 `PING` 命令，检查它们是否处于正常运行状态。

### 2. 自动故障转移 (Failover)
如果 Master 节点挂了，哨兵集群会自动发起故障转移流程，从现有的 Slave 节点中选举出一个作为新的 Master，并通知其他 Slave 修改其复制配置指向新 Master。

### 3. 配置提供者 (Configuration Provider)
客户端（如 Jedis、Lettuce）在初始化时，并不需要硬编码 Master 的 IP 地址，而是直接连接哨兵集群询问当前的 Master 节点地址。当故障转移发生后，哨兵会将最新 Master 变更主动推送给客户端，实现透明的路由切换。

## 故障判定的科学共识

单个哨兵因为自身网络差，可能会误判 Master 挂掉。为此，哨兵集群采用了双重的判定共识机制：

### 主观下线 (SDOWN)
当单个哨兵连续在 `down-after-milliseconds` 设定的时间内未收到 Master 的正常响应，它会在本地将该 Master 标记为“主观下线”。

### 客观下线 (ODOWN)
当一个哨兵判定 Master 主观下线后，它会通过网络询问其他哨兵。只有当超过设定数量（即配置的 `quorum` 参数，通常是哨兵节点数的一半以上）的哨兵都一致判定 Master 异常时，Master 才会真正被标记为“客观下线”，进而启动故障转移流程。

## 领头哨兵选举 (Leader Election)
要执行故障转移，哨兵集群必须先选出一个“领头哨兵（Leader）”来主导后续工作。该选举基于 Raft 协议的思想实现：每个发现 Master 客观下线的哨兵都会尝试让自己成为 Leader，通过在其他哨兵中拉选票，只有拿到了超过半数（Majority）选票的哨兵节点才能成功当选 Leader，保障了脑裂（Split-Brain）情况下不会出现两个哨兵同时做故障转移的混乱情况。

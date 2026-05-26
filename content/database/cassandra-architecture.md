---
title: Cassandra 架构剖析
date: 2026-05-26
category: database
description: 深入解析无主分布式数据库 Apache Cassandra 的 Dynamo 环架构与高可用设计。
---

## 引言

在传统的分布式数据库（如 MySQL 主从、HBase）中，通常存在一个主节点（Master）负责协调管理。这种架构存在单点故障风险，且主节点的写入往往成为吞吐量瓶颈。Apache Cassandra 采用了完全去中心化的无主（Masterless）架构，提供了高容错和近乎无限的线性写扩展能力。

## Dynamo 环状拓扑结构

### 去中心化 Peer-to-Peer
Cassandra 没有主节点，所有的节点在地位上完全均等。它们构成了一个逻辑上的“环”。

### 一致性哈希 (Consistent Hashing)
- 环上的每个节点都被分配一个或多个哈希 Token 范围。
- 当写入一条数据时，Cassandra 会计算其分区键（Partition Key）的哈希值，根据哈希值找到环上对应的节点进行写入。
- 这种设计的优势在于，当有新节点加入或旧节点宕机时，只需要迁移环上极少一部分的哈希区间数据，而无需全量重分配。

### Gossip 协议
节点之间通过轻量级的 Gossip（谣言）协议周期性地交换彼此的运行状态和版本信息。整个集群能够在几十秒内自动感知到任何节点的故障或新节点的加入，而不需要依赖类似 ZooKeeper 的集中协调器。

## 可配置的一致性等级 (Tuneable Consistency)

Cassandra 最强大的特性之一是允许开发者在每次读写请求时，根据 CAP 原则动态微调一致性要求：

### 写入一致性 (Write Consistency)
- **ANY**：只要写入任意一个节点（即使是写入本地临时暗示信封 Hinted Handoff），就返回成功。
- **QUORUM**：必须写入超过半数（N/2 + 1）的副本节点才返回成功。

### 读取一致性 (Read Consistency)
- **ONE**：只要任何一个副本返回数据就响应客户端，响应最快。
- **QUORUM**：必须读取超过半数副本的数据进行版本对比，确认一致后再返回。

### 满足强一致性的公式
如果满足以下不等式，Cassandra 就能保证读取到最新的数据：
$$\text{Read Consistency} + \text{Write Consistency} > \text{Replication Factor}$$
例如，复制因子为 3，若读写都选择 QUORUM（2 + 2 > 3），则每次读必然能遇到至少一个拥有最新修改版数据的节点，实现强一致性。

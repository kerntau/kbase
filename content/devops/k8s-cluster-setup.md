---
title: Kubernetes 集群搭建
date: 2026-05-26
category: devops
description: 指导如何使用 kubeadm 工具从零搭建高可用 Kubernetes 集群，涉及网络插件选择和 Master 节点配置。
---

## 引言

Kubernetes（K8s）作为容器编排的事实标准，已经成为了云原生架构的核心基石。虽然各大云厂商提供了托管 K8s 服务，但对于私有云部署或架构演进，深入掌握 K8s 集群的底层搭建和配置是运维人员的必备技能。

## 集群架构与准备工作

### Master 与 Worker 节点规划
在开始搭建前，建议准备至少三台机器以保障基础可用性：
- `k8s-master1`：主控制节点，负责集群调度和管理，IP: 192.168.1.10
- `k8s-node1`：工作节点，运行实际业务容器，IP: 192.168.1.11
- `k8s-node2`：工作节点，运行实际业务容器，IP: 192.168.1.12

### 基础环境初始化限制
所有节点必须完成以下准备工作：
1. **禁用 Swap 分区**：K8s 调度器不建议使用 swap，否则会严重影响性能。通过 `swapoff -a` 关闭，并在 `/etc/fstab` 中注释相关行。
2. **关闭防火墙与 SELinux**：防止网络规则被系统防火墙拦截，禁用 SELinux 以免容器无法访问宿主机文件系统。
3. **配置内核转发参数**：修改 `/etc/sysctl.d/k8s.conf`，启用 `net.bridge.bridge-nf-call-iptables = 1` 以保证网桥网络流量正确通过 iptables。

## 使用 kubeadm 快速初始化

### 安装容器运行时
在安装 K8s 组件之前，必须在所有节点安装兼容 CRI（Container Runtime Interface）的运行时，目前最推荐的是 `containerd`。

### 初始化 Master 节点
在 Master 节点上执行初始化命令，并指定网段：
```bash
kubeadm init \
  --apiserver-advertise-address=192.168.1.10 \
  --image-repository registry.aliyuncs.com/google_containers \
  --kubernetes-version v1.28.0 \
  --service-cidr=10.96.0.0/12 \
  --pod-network-cidr=10.244.0.0/16
```
初始化成功后，系统会输出 `kubeadm join` 带有 Token 和证书哈希的命令，将其保存用于 Worker 节点的加入。

## 容器网络插件选择 (CNI)

K8s 本身并不提供容器间的网络互通，必须安装网络插件。最常用的两个插件对比：

### Flannel
- **机制**：简单的 Overlay 网络，通常采用 VXLAN 模式，通过在 UDP 包中封装 IP 报文来实现跨主机通信。
- **优点**：配置简单，开箱即用，特别适合初学者或中小型集群。
- **缺点**：不支持 NetworkPolicy（网络隔离安全规则），且性能略逊于 Calico。

### Calico
- **机制**：基于三层 BGP 协议构建路由网络，无需额外的封包解包。
- **优点**：性能极佳，原生支持丰富的网络安全隔离规则，是大中型生产环境的首选方案。

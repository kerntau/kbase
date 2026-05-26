---
title: Docker 容器化最佳实践
date: 2026-05-26
category: devops
description: 探讨 Docker 容器化部署的规范与优化，涵盖多阶段构建、镜像瘦身和安全加固。
---

## 引言

Docker 彻底改变了软件交付的模式，实现了“一次构建，到处运行”。但在实际生产中，不规范的 Dockerfile 会导致生成的镜像极其臃肿，构建时间冗长，甚至带来严重的系统安全漏洞。本文将深入分享容器化部署的最佳实践。

## 镜像瘦身：多阶段构建

### 单阶段构建的局限
很多初学者会在一个基础镜像中完成所有的编译、测试和最终运行，这导致大量与运行时无关的构建工具（如 Maven、Go 编译器、Node.js 包管理工具）和源码残留在镜像中，使得最终镜像动辄几百兆甚至上 G 大小。

### 多阶段构建原理与配置
多阶段构建（Multi-stage Builds）允许我们在同一个 `Dockerfile` 中定义多个阶段，利用前一个阶段编译出二进制文件，并仅将该编译产物拷贝到体积极小的运行时镜像中：
```dockerfile
# 编译阶段
FROM golang:1.20-alpine AS builder
WORKDIR /app
COPY . .
RUN go build -o main .

# 运行阶段
FROM alpine:latest
WORKDIR /app
COPY --from=builder /app/main .
EXPOSE 8080
CMD ["./main"]
```
通过这种做法，原本需要编译环境支持的大型镜像可以缩减为只有几十兆甚至几兆的轻量级镜像，从而大幅节约了拉取和存储成本。

## 选择精简的基础镜像

### 官方镜像的对比
- `ubuntu`、`debian`：包含大量标准系统命令行工具，体积通常在 100MB+，适合有复杂底层命令调用依赖的服务。
- `alpine`：基于 musl libc 和 busybox 构建的安全精简 Linux 发行版，体积通常只有 5MB 左右，是大多数服务的首选基础镜像。
- `distroless`：Google 开源的只包含应用程序及其运行时依赖的镜像，甚至没有 shell，极大减少了攻击面。

## 运行时安全加固

### 避免使用 root 用户运行
默认情况下，容器内部是以 root 用户身份执行进程的。如果在容器内被成功攻破，黑客可能借此获取宿主机的控制权。应显式声明非 root 用户：
```dockerfile
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser
```

### 限制容器的资源分配
为防止单个容器发生内存泄漏或死循环抢占宿主机的全部 CPU，在运行容器或编写 Compose/K8s 编排文件时，必须配置硬性的内存与 CPU 上限：
```bash
docker run -d --name app-service -m 512m --cpus="1.5" app:latest
```
通过硬性的资源限制，保障了宿主机和共存其他容器的稳定性。

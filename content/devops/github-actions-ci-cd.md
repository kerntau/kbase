---
title: GitHub Actions 实践
date: 2026-05-26
category: devops
description: 实战讲解如何配置 GitHub Actions 实现自动化测试与容器化部署（CI/CD）的完整流水线。
---

## 引言

持续集成与持续部署（CI/CD）是现代软件敏捷开发的关键环节。GitHub Actions 是 GitHub 官方提供的自动化工作流工具，它与代码仓库无缝集成，免去了搭建和维护 Jenkins 服务器的繁琐工作，极大降低了研发效能的门槛。

## GitHub Actions 核心概念

### 工作流与触发事件
- **Workflow**：一个自动化过程的完整定义，保存在项目的 `.github/workflows/` 目录下的 YAML 文件中。
- **Event**：触发工作流运行的事件，例如 `push` 代码、创建 `pull_request`，或者定时任务（Cron）。

### 任务与步骤
- **Job**：一个工作流可以包含多个并发或串行运行的 Job。每个 Job 都在一个独立的虚拟机环境（Runner）中执行。
- **Step**：Job 内包含的按顺序执行的具体操作，可以是执行命令行脚本，也可以是引用现成的第三方 Action。

## CI/CD 完整工作流配置

以下是一个典型的 Node.js 项目自动化构建、测试并打包 Docker 镜像并推送至仓库的完整配置：
```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main ]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Run Tests
        run: npm test

  deploy:
    needs: build-and-test
    runs-on: ubuntu-latest
    steps:
      - name: Login to DockerHub
        uses: docker/login-action@v2
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}

      - name: Build and Push Docker Image
        uses: docker/build-push-action@v4
        with:
          push: true
          tags: user/app-service:latest
```

## 秘钥与凭证管理

千万不能将密码、私钥、API Token 等敏感信息直接明文写在 YAML 文件中。应当利用 GitHub 的 `Settings -> Secrets and variables -> Actions` 功能，创建加密的 Repository Secrets。在脚本中，通过 `${{ secrets.SECRET_NAME }}` 的形式在运行时安全地引用它们。

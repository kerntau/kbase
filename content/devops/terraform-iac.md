---
title: Terraform 基础设施即代码
date: 2026-05-26
category: devops
description: 掌握云原生基础设施配置语言 Terraform，实现多云环境资源的声明式管理。
---

## 引言

随着云计算的普及，企业的基础设施环境变得庞大且多变。通过云厂商控制台手动点击创建资源（VM、网络、数据库）极难维护且无法进行版本控制。Terraform 倡导的“基础设施即代码”（IaC）理念，使得我们可以像编写业务代码一样管理云端资源。

## Terraform 的核心概念

### HCL 声明式配置语言
Terraform 采用 HashiCorp 独创的 HCL 语言来定义资源。开发人员只需声明“我需要什么样的基础设施状态”，Terraform 会自动分析当前状态并做出相应的增删改动作：
```hcl
resource "aws_instance" "web" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"

  tags = {
    Name = "HelloWorld"
  }
}
```

### 状态文件 State File
Terraform 执行完变更后，会本地或远端生成一个 `terraform.tfstate` 状态文件。它充当了系统当前真实云端资源映射的唯一可信源。在多人协同开发时，必须将状态文件存储于远端服务（如 AWS S3，并配置 Redis/DynamoDB 进行状态加锁），以防资源状态冲突。

## Terraform 工作流三部曲

### 1. terraform init
初始化当前工作目录。在此步骤中，Terraform 会根据配置文件中定义的 Provider（如阿里云、AWS、谷歌云）自动下载对应的插件驱动。

### 2. terraform plan
预览即将执行的变更。Terraform 会对比云端实际资源和本地代码定义，输出一个详细的增删改清单。这一步对于线上防灾极其关键。

### 3. terraform apply
真正执行配置变更。它会按照最优的依赖拓扑顺序，调用云厂商的 API 创建、修改或删除资源。

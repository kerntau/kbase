---
title: Ansible 自动化运维
date: 2026-05-26
category: devops
description: 全面解析轻量级运维配置管理工具 Ansible 的架构，并编写 Playbook 实战服务部署。
---

## 引言

在面对数十台甚至上百台服务器的集群时，传统的通过 SSH 手动逐台登录并执行命令的运维方式不仅效率极低，而且极易引入人为操作失误。Ansible 凭借其无需安装 Agent、基于 SSH 协议的轻量级特性，成为了自动化运维的黄金利器。

## Ansible 核心架构与原理

### 无 Agent (Agentless) 特性
传统的配置管理工具（如 Puppet、Chef）需要预先在被管理机器上安装常驻的 Agent 程序，维护成本较高。而 Ansible 直接使用 SSH 协议连接远程主机，在远程主机上生成并执行临时的 Python 脚本，执行完毕后自动删除。只要你的控制节点能够通过 SSH 连通被控端，且被控端装有 Python 环境，即可直接管理。

### 声明式与幂等性
Ansible 的模块设计绝大多数都支持**幂等性**。这意味着无论你执行多少次相同的任务，它只会执行必须的修改，在目标主机已经符合预期状态时，Ansible 不会做任何操作。这种机制使得配置的安全性大大提升。

## 主机清单与变量管理

### 编写 Inventory 文件
主机清单（Inventory）用于管理所有的被控服务器，支持分组配置：
```ini
[webservers]
web1.example.comansible_host=192.168.10.11
web2.example.comansible_host=192.168.10.12

[dbservers]
db1.example.comansible_host=192.168.10.20
```

## 实战：编写 Playbook 部署 Nginx

Playbook 是使用 YAML 格式编写的剧本，定义了要在哪些主机上执行哪些任务：
```yaml
---
- name: Deploy and Configure Nginx
  hosts: webservers
  become: yes
  vars:
    nginx_port: 80

  tasks:
    - name: Ensure Nginx is installed
      apt:
        name: nginx
        state: present
        update_cache: yes

    - name: Copy custom index.html
      copy:
        content: "Welcome to Ansible Web Server"
        dest: /var/www/html/index.html
        mode: '0644'

    - name: Ensure Nginx service is running and enabled
      service:
        name: nginx
        state: started
        enabled: yes
```
通过执行 `ansible-playbook -i hosts site.yml`，即可自动完成配置分发与部署。

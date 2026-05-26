---
title: Jenkins 流水线配置
date: 2026-05-26
category: devops
description: 精通 Jenkins Pipeline 流水线脚本，实现应用从代码提交到打包测试的自动化流水线。
---

## 引言

作为自动化运维领域的常青树，Jenkins 凭借其极其庞大的插件生态和高度的定制灵活性，依然是当今大中型企业私有云 CI/CD 平台的绝对首选。本文将讲解基于 Jenkinsfile 的 Pipeline 最佳配置方法。

## 声明式 Pipeline 规范

### 声明式语法结构
Jenkins 在 2.x 版本后全面转向了“Pipeline as Code”的理念，主推声明式（Declarative）语法。它的配置结构相比于旧版的脚本式语法更加清晰规范：
```groovy
pipeline {
    agent any
    
    environment {
        APP_NAME = 'demo-service'
    }
    
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/example/demo-service.git'
            }
        }
        stage('Build') {
            steps {
                sh 'mvn clean package -DskipTests'
            }
        }
        stage('Test') {
            steps {
                sh 'mvn test'
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
    }
}
```

### 节点声明 (Agent)
`agent` 指令指定了这一阶段的工作要在哪台构建机上执行。使用 `agent { label 'docker-node' }` 可以方便地将不同类型的构建任务（如 Java 编译和前端 Webpack 构建）分发到装有对应依赖的专用 Agent 节点上。

## 关键技术：凭据安全保护

在 Jenkinsfile 中严禁明文出现 API 密钥或发布账户。应在 Jenkins 凭据管理中心创建 Credentials（如账户密码、Secret Text、SSH 私钥），然后在脚本中安全绑定：
```groovy
stage('Deploy') {
    steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', passwordVariable: 'DOCKER_PWD', usernameVariable: 'DOCKER_USER')]) {
            sh "docker login -u ${DOCKER_USER} -p ${DOCKER_PWD}"
            sh "docker push user/app:latest"
        }
    }
}
```
`withCredentials` 会在控制台输出日志中自动对敏感变量进行脱敏处理，防止敏感信息泄露。

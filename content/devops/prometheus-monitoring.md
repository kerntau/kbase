---
title: Prometheus 监控告警
date: 2026-05-26
category: devops
description: 学习 Prometheus 的 Pull 监控架构与 PromQL，并配置 Alertmanager 实现异常告警。
---

## 引言

对于在生产环境运行的复杂系统，如果没有实时监控，无异于盲人摸象。Prometheus 凭借其强大的多维数据模型和极佳的云原生生态支持，已经成为了监控领域的事实标准。

## Prometheus 核心架构原理

### Pull 模式与 Push 模式的对决
不同于传统监控组件（如 Zabbix）采用的 Push（客户端主动推送）模式，Prometheus 核心采用的是 **Pull（拉取）** 模式。
- Prometheus 周期性地向被监控对象（Targets）暴露的 HTTP 接口（通常是 `/metrics`）发送请求，拉取指标数据。
- 这种设计的优势在于降低了客户端的计算开销，并且服务端可以灵活控制拉取频率，防止被监控节点在故障时因大量 Push 重试被二次压垮。

### 时序数据库与多维指标
Prometheus 内部自带一个高性能的时间序列数据库（TSDB）。每条数据由一个指标名（Metric Name）和一组键值对标签（Labels）共同标识：
```text
http_requests_total{method="POST", status="200"} 42
```
通过这种多维标签机制，我们可以对同一指标按不同维度进行极其灵活的分组和过滤。

## 熟练使用 PromQL 查询语言

PromQL 是 Prometheus 的核心查询语言，支持复杂的聚合和计算：

### 常用算子与函数
- **查询过去 5 分钟的每秒请求增长率**：
  ```promql
  rate(http_requests_total[5m])
  ```
- **计算请求的 99% 分位数耗时**：
  ```promql
  histogram_quantile(0.99, sum(rate(http_request_duration_seconds_bucket[5m])) by (le))
  ```

## 告警规则与 Alertmanager 配置

当监控指标异常时，需要通过告警规则（Alerting Rules）触发通知。告警文件使用 YAML 格式定义：
```yaml
groups:
  - name: node_alerts
    rules:
      - alert: InstanceDown
        expr: up == 0
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "Instance {{ $labels.instance }} has been down for more than 5 minutes."
```
当触发告警后，Prometheus 会将告警推送到 Alertmanager。Alertmanager 负责对告警进行去重、分组、静默（Silenes）处理，并分发到企业微信、钉钉或邮件中，以确保运维人员第一时间响应。

---
title: Spring Boot 优化
date: 2026-05-26
category: backend
description: 探讨企业级 Spring Boot 应用的性能调优方案，涉及启动速度优化、JVM 内存调优以及连接池配置。
---

## 引言

Spring Boot 以其开箱即用的特性成为 Java 生态的绝对主流。然而，随着业务复杂度的上升，其默认配置可能会面临启动慢、内存占用大以及高并发下吞吐量不足等挑战。本文将围绕性能调优提供全方位的实战方案。

## 启动速度优化

### 排除无用依赖与自动配置
Spring Boot 会根据类路径下的依赖自动加载大量配置。对于项目中未使用到的模块（如不需要的安全框架或数据库驱动），应当显式排除：
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <exclusions>
        <exclusion>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-tomcat</artifactId>
        </exclusion>
    </exclusions>
</dependency>
```

### 开启懒加载
在开发或测试环境，可以通过配置 `spring.main.lazy-initialization=true` 开启 Bean 的懒加载，使应用在启动时不初始化非必需的 Bean，从而将启动时间缩短 50% 以上。

## JVM 内存与垃圾回收调优

### 内存参数合理设置
根据服务器配置，合理配置 JVM 的堆大小，避免默认配置导致频繁的垃圾回收。例如，在 8G 内存服务器上运行核心服务：
```bash
java -Xms4g -Xmx4g -XX:+UseG1GC -jar app.jar
```
保持最小堆（`-Xms`）和最大堆（`-Xmx`）一致，可以防止 JVM 在运行过程中因堆扩容带来的额外开销。

### G1 垃圾回收器优化
G1（Garbage-First）是现代 Java 应用的首选 GC。通过合理设置 `-XX:MaxGCPauseMillis` 参数（如 200ms），让 G1 自动调整年轻代和老年代的比例，以满足预期的停顿时间目标。

## 连接池与线程池调优

### HikariCP 连接池优化
Spring Boot 默认采用的 HikariCP 是性能最强的数据库连接池之一。在生产环境中，需要根据数据库的实际承载能力微调参数：
- `maximum-pool-size`：通常建议设置为 `(CPU 核心数 * 2) + 磁盘连接数`，过大的连接池反而会因为上下文切换导致性能下降。
- `connection-timeout`：配置合理的连接超时时间（如 10000ms），避免因等待连接而导致大面积请求积压。

### 异步任务线程池定制
对于 `@Async` 异步操作，切忌使用默认的 SimpleAsyncTaskExecutor，它每次调用都会创建新线程。应定制自己的线程池：
```java
@Configuration
public class ThreadPoolConfig {
    @Bean
    public Executor taskExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(10);
        executor.setMaxPoolSize(50);
        executor.setQueueCapacity(100);
        executor.setThreadNamePrefix("async-task-");
        executor.initialize();
        return executor;
    }
}
```
通过这种方式可以避免高并发下无休止地创建线程导致 OOM。

---
title: SQL 注入漏洞防御
date: 2026-05-26
category: database
description: 剖析经典 SQL 注入攻击的注入手段与危害，提供在后端和数据库层面防范注入的规范。
---

## 引言

SQL 注入（SQL Injection）是互联网上最古老、最普遍且破坏性最大的安全漏洞之一。尽管现代开发框架提供了很多保护机制，但在某些复杂的动态查询或定制化开发中，不规范的代码依然可能给黑客留下致命的漏洞窗口。

## SQL 注入的攻击机理

### 字符串拼接的罪魁祸首
SQL 注入本质上是**将用户输入的恶意数据误解释为 SQL 语句的一部分并直接执行**。
例如，后端存在一段验证用户登录的拼凑代码：
```sql
SELECT * FROM users WHERE username = 'admin' AND password = 'user_input';
```
如果黑客输入 `1' OR '1'='1` 作为密码，拼凑后的 SQL 会变成：
```sql
SELECT * FROM users WHERE username = 'admin' AND password = '1' OR '1'='1';
```
由于 `OR '1'='1'` 恒成立，黑客将无需密码即可直接登录系统。

### 盲注与堆叠注入的危害
- **报错注入**：利用数据库报错信息直接打印内部敏感表名和列名。
- **时间盲注**：如果页面不返回错误，利用 `sleep()` 函数测试响应延迟，逐字推算数据库中的敏感数据。
- **堆叠注入**：在原 SQL 后面以分号结束，紧接着拼接一条全新的修改/删除指令（如 `; DROP TABLE users;`），直接摧毁数据库。

## 后端防御黄金法则：预编译 (Precompilation)

防范 SQL 注入最彻底、最有效的方法是**参数化查询（Parameterized Queries）**，通常称为 SQL 预编译：

### 预编译的工作原理
当使用预编译时，数据库驱动会在执行前先将 SQL 的主体结构发送给数据库进行编译，此时所有的占位符（如 `?` 或 `:param`）尚未填充。数据库会将结构固定下来。当后续传递具体参数值时，数据库只会将其作为纯粹的变量值处理，绝不会将参数内的任何 SQL 语法符号再当做代码来解析。

### 实战示例
在 Java 的 MyBatis 中，严禁使用会直接拼接字符串的 `${param}`，而必须使用代表预编译的 `#{param}`：
```xml
<!-- 错误做法，存在注入风险 -->
SELECT * FROM users WHERE name = '${username}'

<!-- 正确做法 -->
SELECT * FROM users WHERE name = #{username}
```

## 数据库层面的安全限制

- **最小权限原则**：运行业务应用程序的数据库连接账号，不应具有管理员（SA / root）权限。应当只赋予特定表或视图的 `SELECT`、`INSERT`、`UPDATE` 权限。
- **禁止堆叠查询**：在数据库驱动配置中，禁用允许多语句执行的参数（如在 MySQL 中配置 `allowMultiQueries=false`），从底层封堵堆叠注入的可能性。

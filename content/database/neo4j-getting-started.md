---
title: Neo4j 图数据库入门
date: 2026-05-26
category: database
description: 掌握面向网状社交关系或推荐系统的图数据库 Neo4j，并编写 Cypher 语言实战查询。
---

## 引言

现实世界中的许多数据并不是孤立的，而是有着复杂的关联。在面对海量网状社交关系（如“谁关注了谁”、“谁买了什么商品”）、反洗钱资金链路追踪、或者是知识图谱构建时，关系型数据库（需要写极其痛苦且耗能的数十层自连接 JOIN）会显得力不从心。Neo4j 作为顶尖的图数据库，为此提供了极其直观高效的解法。

## 属性图模型核心定义

Neo4j 基于属性图模型（Property Graph Model），其最核心的概念为：

### 节点 (Node)
代表图中的实体。例如一个“人（Person）”或一个“公司（Company）”。节点可以拥有多个标签（Labels）来分类，并且可以包含键值对属性（如 `name: "Alice", age: 30`）。

### 关系 (Relationship)
连接两个节点。关系必须是有向的（由一个节点指向另一个节点），必须具有唯一的类型（Type，如 `FRIEND_OF`、`WORKS_FOR`），并且关系本身也可以拥有属性（如 `since: 2020`）。

## Cypher 查询语言实战

Neo4j 的核心查询语言是 Cypher。它的语法具有极强的表现力，使用括号 `()` 代表节点，使用箭头 `->` 代表关系：

### 创建节点和关系
```cypher
CREATE (alice:Person {name: 'Alice', age: 30})
CREATE (bob:Person {name: 'Bob', age: 32})
CREATE (alice)-[:FRIEND_OF {since: 2022}]->(bob)
```

### 社交推荐查询
查找 Alice 朋友的朋友（二度好友），并推荐给 Alice：
```cypher
MATCH (alice:Person {name: 'Alice'})-[:FRIEND_OF]->(friend)-[:FRIEND_OF]->(fof)
WHERE NOT (alice)-[:FRIEND_OF]->(fof) AND alice <> fof
RETURN DISTINCT fof.name
```
这段查询不仅表现力极佳，而且在底层图引擎中，它是通过内存中的免索引邻接（Index-Free Adjacency）通过指针直接跳转，而不是像关系型数据库那样频繁在索引树中去检索主键，查询速度呈几何级提升。

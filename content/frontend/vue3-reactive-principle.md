---
title: Vue3 响应式原理
date: 2026-05-26
category: frontend
description: 剖析 Vue 3 基于 Proxy 的全新响应式系统，解密 reactive、ref 的核心实现与依赖收集机制。
---

## 引言

Vue 3 彻底重构了响应式系统，放弃了 Vue 2 中具有局限性的 `Object.defineProperty`，改用 ES6 的 `Proxy`。这一变革不仅带来了巨大的性能提升，也解决了之前无法监听对象新增属性和数组索引修改的历史难题。

## 为什么选择 Proxy

### Object.defineProperty 的缺陷
在 Vue 2 中，由于是通过属性劫持实现的响应式，初始化时需要递归遍历对象的所有属性。对于深层嵌套的巨大对象，这会导致显著的初始化延迟。此外，动态添加属性或通过索引修改数组是无法被动感知的，需要使用特殊的 `$set` API。

### Proxy 的底层优势
`Proxy` 是在对象层面建立了一层“代理”，可以拦截对象上的所有基本操作（如属性读取、赋值、删除、`in` 操作符等）。这不仅实现了真正的全方位拦截，而且由于是懒代理（只有在访问到深层对象时才会进行下一层的 Proxy 包装），大大提升了初始渲染性能。

## 核心实现：依赖收集与触发更新

### 依赖关系图的构建
Vue 3 内部使用了一张全局的弱引用映射表 `targetMap` 来存储所有的依赖关系。其数据结构为：
```text
targetMap (WeakMap)
  └─ target (Object)
       └─ keyMap (Map)
            └─ key (String/Symbol)
                 └─ dep (Set)
                      └─ reactiveEffect (Function)
```

### track (依赖收集)
在拦截器的 `get` 操作中，Vue 会调用 `track` 函数。若当前有正在运行的副作用函数（`activeEffect`），则将其加入到该属性对应的 `dep` 集合中。

### trigger (触发更新)
在拦截器的 `set` 操作中，当属性值发生变化时，Vue 会调用 `trigger` 函数。它会找到该属性对应的 `dep` 集合，并依次执行其中存储的所有副作用函数，进而触发界面的重新渲染或计算属性的更新。

## Ref 与 Reactive 的技术权衡

### Reactive 的局限性
`reactive` 只能用于对象和数组等引用类型。如果对其进行解构赋值，会使解构出来的变量丢失响应性。

### Ref 的底层实现
对于原始类型（如 `string`、`number`），Vue 3 提供了 `ref`。`ref` 的本质是创建一个包含 `value` 属性的对象，通过在其类属性的 `get value()` 和 `set value()` 中调用 `track` 和 `trigger` 来实现响应式劫持。

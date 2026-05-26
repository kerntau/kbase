---
title: TypeScript 类型体操
date: 2026-05-26
category: frontend
description: 深入浅出 TypeScript 高级类型系统，掌握条件类型、映射类型以及常用内置工具类型的实现原理。
---

## 引言

TypeScript 的类型系统本身是一门图灵完备的语言。通过运用高级类型操作，我们能够构建出高度动态且类型安全的 API。业内常将这些复杂的类型运算戏称为“类型体操”。本文将带你攻克这一技术难点。

## 条件类型与分布式条件类型

### 条件类型基本语法
条件类型（Conditional Types）的语法类似于三元运算符：
```typescript
T extends U ? X : Y
```
这允许我们根据输入类型的特征动态返回不同的类型。

### 分布式条件类型特性
当在条件类型中传入联合类型，且该联合类型是裸类型参数（Naked Type Parameter）时，TypeScript 会将其分发（Distribute）。
例如，对于 `type ToArray<T> = T extends any ? T[] : never;`，传入 `string | number` 会被解析为 `ToArray<string> | ToArray<number>`，即 `string[] | number[]`。

## 映射类型与键名重映射

### 映射类型基本概念
映射类型（Mapped Types）用于通过遍历联合类型的键来创建新的对象类型：
```typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
```

### 键名重映射 (Key Remapping)
在 TypeScript 4.1 中，引入了 `as` 子句，使得我们可以在遍历过程中对键名进行修改或过滤：
```typescript
type GetterName<T extends string> = `get${Capitalize<T>}`;
type Getters<T> = {
  [K in keyof T as GetterName<K & string>]: () => T[K];
};
```

## 实战：常用工具类型手动实现

### Exclude 与 Omit 的区别与实现
`Exclude` 用于从联合类型中排除特定成员，利用了分布式条件类型：
```typescript
type MyExclude<T, U> = T extends U ? never : T;
```
`Omit` 则用于从对象类型中剔除指定键，它是结合 `Pick` 和 `Exclude` 实现的：
```typescript
type MyOmit<T, K extends keyof any> = Pick<T, MyExclude<keyof T, K>>;
```

### ReturnType 的原理与 infer
`infer` 关键字只能在条件类型的 `extends` 子句中使用，用于声明一个待推断的类型变量：
```typescript
type MyReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
```
通过 `infer R`，TypeScript 可以在编译期自动推断并捕获函数的返回值类型。

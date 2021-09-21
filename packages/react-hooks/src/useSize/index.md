---
title: useSize
group:
  title: hooks
  path: /hooks
---
# useSize

一个用于监听 dom 节点尺寸变化的 Hook。

## 代码演示

### 基础用法

<code src="./Demo/demo1.tsx" />

### 传入 DOM 节点

<code src="./Demo/demo2.tsx" />

## API

```typescript
const size = useSize(target);
```

### 参数

| 参数    | 说明                                         | 类型                   | 默认值 |
|---------|----------------------------------------------|------------------------|--------|
| target | DOM 节点或者 Refs  | `HTMLElement` \| `(() => HTMLElement)` \| `MutableRefObject` | -      |

### 结果

| 参数     | 说明                                     | 类型       |
|----------|------------------------------------------|------------|
| size  | dom 节点的尺寸                         | `{ width: number, height: number }`    |
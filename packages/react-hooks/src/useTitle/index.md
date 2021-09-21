---
title: useTitle
group:
  title: hooks
  path: /hooks
  order: 2
---

# useTitle

设置页面标题

## 代码演示

### 基础用法

<code src="./Demo/index.tsx" />

## API

```typescript
useTitle(value: string, options?: Options);
```

### Params

| 参数  | 说明     | 类型     | 默认值 |
|-------|----------|----------|--------|
| value | 页面标题 | `string` | -      |


### Options

| 参数             | 说明         | 类型      | 默认值  |
|------------------|--------------|-----------|---------|
| restoreOnUnmount | 组件销毁时，恢复进入页面之前的页面标题 | `boolean` | `false` |

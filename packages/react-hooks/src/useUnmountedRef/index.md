---
title: useUnMountRef
group:
  title: hooks
  path: /hooks
---

# useUnmountedRef

获取当前组件是否已经卸载的 hook，用于避免因组件卸载后更新状态而导致的内存泄漏

## 代码演示

### 基础用法

<code src="./Demo/demo1.tsx" />

## API

```typescript
const unmountRef: { current: boolean } = useUnmountedRef;
```

### Result

| 参数 | 说明               | 类型         |
|------|--------------------|--------------|
| unmountRef | 对象的current属性可返回当前组件是否已经卸载 | `{ current: boolean }` |
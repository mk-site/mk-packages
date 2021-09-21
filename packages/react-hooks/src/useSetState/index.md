---
title: useSetState
group:
  title: hooks
  path: /hooks
  order: 2
---

# useSetState

管理 object 类型 state 的 Hooks，用法与 class 组件的 `this.setState` 基本一致。

## 代码演示

### 基础用法

<code src="./Demo/demo1.tsx" />

## API

```typescript

const [state, setState] = useSetState<T extends object>(
  initialState: T = {} as T
): [T, (patch: Partial<T> | ((prevState: T) => Partial<T>)) => void]
```


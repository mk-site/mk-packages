---
title: useSafeState
group:
  title: hooks
  path: /hooks
---

# useSafeState
用法与 React.useState 完全一样，但是在组件卸载后异步回调内的 setState 不再执行，避免因组件卸载后更新状态而导致的内存泄漏

## 代码演示

### 基础用法，与 React.useState 完全一样

<code src="./Demo/demo1.tsx" />

## API

```typescript
import useSafeState from 'mk-react-hooks';

const [state, setState] = useSafeState(initialState)
```
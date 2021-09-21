---
title: useDocumentShowEffect
group:
  title: hooks
  path: /hooks
---

# useDocumentShowEffect

可以获取页面显示状态的 Hook。

## 代码演示

### 基础用法

<code src="./Demo/demo1.tsx" />

## API

```typescript
import { useDocumentShowEffect } from 'mk-react-hooks';

useDocumentShowEffect(() => {
    console.log('页面显示回调')
});
```

### params

| 参数               | 说明                                 | 类型   |
|--------------------|--------------------------------------|--------|
| fn | 页面激活回调 | `function` |
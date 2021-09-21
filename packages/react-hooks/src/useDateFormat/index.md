---
title: useDateFormat
group:
  title: hooks
  path: /hooks
---

# useDateFormat

日期格式化

## 基本用法

<code src="./Demo/demo1.tsx" />

## API

```typescript
import { useDateFormat } from 'mk-react-hooks';
const dateFormat = useDateFormat();

const time = dateFormat(new Date(), 'yyyy-MM-dd');
```


### Result

| 参数            | 说明           | 类型                      |
| --------------- | -------------- | ------------------------- |
| dateFormat       | 日期格式化函数(time: Date, fmt: string) => any   | `function`               |
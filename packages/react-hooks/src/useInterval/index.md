---
title: useInterval
group:
  title: hooks
  path: /hooks
---

# useInterval

一个可以处理 setInterval 的 Hook。

## 代码演示

### 基础用法

<code src="./Demo/demo1.tsx" />

### 进阶使用

<!-- <code src="./Demo/demo2.tsx" /> -->

## API

```typescript
import { useInterval } from 'mk-react-hooks';

const [count, setCount] = useState(0);
const [run, cancel] = useInterval(() => {
    setCount(count + 1);
}, 1000);
```

### Params

| 参数    | 说明                                                    | 类型       |
|---------|---------------------------------------------------------|------------|
| fn      | 要重复调用的函数                                        | `() => void` |
| delay   | 间隔时间，当取值为 `null` 或 `undefined` 时会停止计时器 |   `number` \| `undefined` \| `null`    |
| immediate | 控制是否立即执行 默认:false                   | `boolean`     |
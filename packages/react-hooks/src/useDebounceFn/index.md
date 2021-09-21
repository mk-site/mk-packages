---
title: useDebounceFn
group:
  title: hooks
  path: /hooks
---

# useDebounceFn

用来处理防抖函数的 Hook。

## 代码演示

### 基础用法

<code src="./Demo/demo1.tsx" />

## API

```javascript
import { useDebounceFn } from 'mk-react-hooks';

const [value, setValue] = useState(0);
const [run] = useDebounceFn(() => {
    setValue(value + 1);
}, 500);
```

### Params

| 参数    | 说明                               | 类型                      | 默认值 |
|---------|------------------------------------|---------------------------|--------|
| fn      | 需要防抖执行的函数                 | `(...args: any[]) => any` | -      |
| wait | 等待时间 | `number`                 | `500`     |


### Result

| 参数   | 说明                               | 类型         |
|--------|------------------------------------|--------------|
| run    | 触发执行 fn，函数参数将会传递给 fn | `(...args: any[]) => any` |
| cancel | 取消当前防抖                       | `() => void` |

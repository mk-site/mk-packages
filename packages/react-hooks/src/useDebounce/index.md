---
title: useDebounce
group:
  title: hooks
  path: /hooks
---

# useDebounce

用来处理防抖值的 Hook。

## 代码演示

### 基础用法

<code src="./Demo/demo1.tsx" />

## API

```javascript
import { useDebounce } from 'mk-react-hooks';

const [value, setValue] = useState<string>();
const debouncedValue = useDebounce(value, 500);
```

### Params

| 参数    | 说明                               | 类型                      | 默认值 |
|---------|------------------------------------|---------------------------|--------|
| value      | 防抖的值                 | `T = any` | -      |
| wait | 等待时间 | `number`                 | `500`     |


### Result

| 参数   | 说明                               | 类型         |
|--------|------------------------------------|--------------|
| debouncedValue    | 防抖返回的值 | `T = any` |
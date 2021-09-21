---
title: useClickAway
group:
  title: hooks
  path: /hooks
---



# useClickAway

优雅的管理目标元素外点击事件的 Hook。

## 代码演示

### 基础用法

<code src="./Demo/demo1.tsx" />

### 自定义 DOM

<code src="./Demo/demo2.tsx" />

### 支持多个 DOM 对象

<code src="./Demo/demo3.tsx" />

### 监听其它事件

<code src="./Demo/demo4.tsx" />


## API

```ts
type Target = HTMLElement | React.MutableRefObject | () => HTMLElement;

useClickAway(
  onClickAway: (event: MouseEvent | TouchEvent) => void,
  target: Target | Target[],
  eventName?: string
);
```

### Params

| 参数    | 说明                                         | 类型                   | 默认值 |
|---------|----------------------------------------------|------------------------|--------|
| onClickAway | 触发事件的函数  | `(event) => void` | -      |
| target | DOM 节点或者 Ref 对象，支持数组 | `Target` \| `Target[]` | - |
| eventName | 指定需要监听的事件 | `string` | `click` |
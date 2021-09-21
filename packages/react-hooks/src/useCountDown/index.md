---
title: useCountDown
group:
  title: hooks
  path: /hooks
---

# useCountDown

倒计时hook，比如登录时间倒计时

## 基本用法

<code src="./Demo/demo.tsx" />

## 手动控制状态

## API

```typescript
const [
    isCountDownTiming,
    countDownTime,
    start,
    stop
] = useCountDown(60);
```


## Params

| 参数      | 说明           | 类型                                                    | 默认值      |
| --------- | -------------- | ------------------------------------------------------- | ----------- |
| time   | 时间(秒)     | `number`                                                 | `60` |


### Result

| 参数            | 说明           | 类型                      |
| --------------- | -------------- | ------------------------- |
| isCountDownTiming       | 是否正在倒计时   | `number`                  |
| countDownTime       | 倒计时时间 | `number` |
| start | 开始倒计时函数     | `function`           |
| stop | 停止倒计时函数     | `function`           |
---
title: Operations
---

# Operations

<code src="./Demo/index.tsx"/>

### Props

| 参数 | 说明| 必须 | 类型 |
|--|--|--| -- |
| meta | 渲染列表数据 | 必须 | `Array<Item>` |
| layout | 布局 | 可选 | `vertical | horizontal` |
| className | 而外类名 | 可选 | `string` |


#### Item

| 参数 | 说明| 必须 | 类型 | 默认值 |
|--|--|--| -- | -- |
| text | 名称 | 必须 | `string` | `无` |
| action | 点击执行函数 | 可选 | `function` | `无` |
| render | 自定义渲染 | 可选 | `function` | `无` |
| visible | 是否可见 | 可选 | `boolean` | `true` |
| disable | 是否禁用 | 可选 | `boolean` | `false` |
| style | 样式 | 可选 | `React.CSSProperties` | `{}` |

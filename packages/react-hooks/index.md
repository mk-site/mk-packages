---
title: mk-react-hooks
group:
  title: 开始
  path: /mk-react-hooks
---

## mk-react-hooks

### 开始使用

```bash
yarn add mk-react-hooks
```

```tsx | pure
import React,{useState} from 'react'
import { useWatch } from 'mk-react-hooks'

const App = () => {
    const [count, setCount] = useState(1)
    useWatch(count, prev => {
        console.log(prev, count)
    })

    return <div onClick={() => setCount(c => c+1)}>count:{count}</div>
}

export default App;
```


// 未完成   useRequest useStore
// useScroll useSize useVirtualList hooks 还需打磨
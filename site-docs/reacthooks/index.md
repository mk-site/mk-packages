---
title: mk-react-hooks
group:
  title: mk-react-hooks
  path: /mk-react-hooks
  order: 0
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
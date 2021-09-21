import { useMemo, useRef } from 'react';

// 监听依赖项变化
const useMemoWatch = (deps: any[]) => {
    const count = useRef<number>(0);
    return useMemo(() => {
        count.current += 1;
        return count.current;
    }, deps);
};

export default useMemoWatch;

import { useEffect, useRef } from 'react';

export interface Config {
    immediate: boolean;
}

// 延迟执行
const useWatch = <T = any>(
    dep: T,
    callback: (prev: T | undefined) => void,
    config: Config = { immediate: false },
) => {
    const { immediate } = config;
    const initRef = useRef(false);
    const prev = useRef<T>(dep);
    const stop = useRef(false);
    const cb = useRef<(val: T | undefined) => void>(callback);
    cb.current = callback;
    useEffect(() => {
        const execute = () => {
            cb.current(prev.current);
        };
        if (!stop.current) {
            if (!initRef.current) {
                initRef.current = true;
                if (config.immediate) {
                    execute(); // 初始化回调
                }
            } else {
                execute();
            }
            prev.current = dep;
        }
    }, [dep, immediate]);

    // 外部可停止观察值
    return () => {
        stop.current = true;
    };
};

export default useWatch;

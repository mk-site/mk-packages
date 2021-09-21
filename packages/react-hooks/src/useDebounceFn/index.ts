import { useCallback, useRef } from 'react';
import useUnmount from '../useUnmount';

const useDebounceFn = <T extends (...args: any) => any>(fn: T, wait = 500) => {
    const timer = useRef<any>();
    const fnRef = useRef<T>(fn);
    fnRef.current = fn;
    const run = useCallback((...args: any[]) => {
        if (timer.current) {
            clearTimeout(timer.current);
        }
        timer.current = setTimeout(() => {
            fnRef.current(...args);
            timer.current = null;
        }, wait);
    }, [wait]);
    const cancel = useCallback(() => {
        if (timer.current) {
            clearTimeout(timer.current);
        }
    }, []);
    useUnmount(() => {
        cancel();
    });
    return [run, cancel];
};

export default useDebounceFn;

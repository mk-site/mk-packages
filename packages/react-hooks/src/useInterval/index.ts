import { useRef, useCallback } from 'react';
import useUnmount from '../useUnmount';

const useInterval = <T extends () => void>(fn: T, delay: number, immediate: boolean = false) => {
    const timer = useRef<any>();
    const fnRef = useRef<T>();
    fnRef.current = fn;
    const cancel = () => {
        if (timer.current) {
            clearInterval(timer.current);
            timer.current = null;
        }
    };
    const run = useCallback(() => {
        if (delay === null || delay === undefined) {
            return;
        }
        if (timer.current) {
            return;
        }
        if (immediate) {
            fnRef.current?.();
        }
        timer.current = setInterval(() => {
            fnRef.current?.();
        }, delay);
    }, [delay, immediate]);

    useUnmount(() => {
        cancel();
    });
    return [run, cancel];
};
export default useInterval;

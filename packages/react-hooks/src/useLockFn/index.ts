import { useCallback, useRef } from 'react';

const useLockFn = <P extends any[] = any[], V extends any = any>(fn: (...args: P) => Promise<V>) => {
    const lockRef = useRef(false);
    return useCallback(async (...args: P) => {
        if (lockRef.current) {
            return;
        }
        lockRef.current = true;
        try {
            const ret = await fn(...args);
            lockRef.current = false;
            // eslint-disable-next-line consistent-return
            return ret;
        } catch (error) {
            lockRef.current = false;
            throw error;
        }
    }, [fn]);
};

export default useLockFn;

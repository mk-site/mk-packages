import { useEffect, useRef } from 'react';

const useUpdateEffect = <T extends (...args: any[]) => any>(fn: T, deps: any[]) => {
    const isMounted = useRef(false);
    useEffect(() => {
        if (!isMounted) {
            isMounted.current = true;
        } else {
            fn();
        }
    }, deps);
};
export default useUpdateEffect;

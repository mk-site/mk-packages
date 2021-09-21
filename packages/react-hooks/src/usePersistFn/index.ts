import { useRef } from 'react';

const usePersistFn = <T extends (...args: any[]) => any>(fn: T) => {
    const fnRef = useRef(fn);
    fnRef.current = fn;
    const persistFn = useRef<T>();
    if (!persistFn.current) {
        // eslint-disable-next-line func-names
        persistFn.current = function (...args) {
            return fnRef.current.apply(this, args);
        } as T;
    }
    return persistFn.current;
};

export default usePersistFn;

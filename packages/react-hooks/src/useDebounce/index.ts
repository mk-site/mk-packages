import { useState, useEffect } from 'react';
import useDebounceFn from '../useDebounceFn';

const useDebounce = <T = any>(value: T, ms?: number) => {
    const wait = ms || 500;
    const [val, setVal] = useState(value);
    const [run] = useDebounceFn(() => {
        setVal(value);
    }, wait);
    useEffect(() => {
        run();
    }, [value]);
    return val;
};

export default useDebounce;

import { useEffect } from 'react';

import PersistFn from '../usePersistFn';

const useUnmount = (fn: (...args: any[]) => any) => {
    const fnPersis = PersistFn(fn);
    useEffect(() => () => {
        fnPersis();
    }, []);
};

export default useUnmount;

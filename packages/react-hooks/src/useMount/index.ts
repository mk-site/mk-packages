import { useEffect } from 'react';

// 只执行一次
const useMount = (fn: () => void) => {
    useEffect(() => {
        fn();
    }, []);
};

export default useMount;

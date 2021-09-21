import { useState, useRef } from 'react';
import useUnMount from '../useUnmount';
import usePersistFn from '../usePersistFn';

const useCountDown = (time: number = 60) => {
    const timer = useRef<number>();
    const [remaning, setRemaning] = useState(time);
    const [isCountDowning, setIsCountDowning] = useState(false);
    const stop = usePersistFn(() => {
        if (timer.current) {
            clearTimeout(timer.current);
        }
    });
    const start = usePersistFn(() => {
        stop();
        setRemaning(time - 1);
        setIsCountDowning(true);
        const run = () => {
            timer.current = window.setTimeout(() => {
                setRemaning((prev) => {
                    if (prev - 1 > 0) {
                        run();
                    } else {
                        setIsCountDowning(false);
                    }
                    return prev - 1;
                });
            }, 1000);
        };
        run();
    });
    useUnMount(() => {
        stop();
    });
    return [isCountDowning, remaning, start, stop] as const;
};

export default useCountDown;

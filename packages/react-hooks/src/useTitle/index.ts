import { useEffect, useRef } from 'react';
import useUnmount from '../useUnmount';

type TConfig = {
    restoreOnUnmount?: boolean;
} | undefined

// @ts-ignore
const useTitle = (title: string, config?:TConfig = { restoreOnUnmount: false }) => {
    const titleRef = useRef(document.title);
    useEffect(() => {
        document.title = title;
    }, [title]);
    useUnmount(() => {
        if (config && config.restoreOnUnmount) {
            document.title = titleRef.current;
        }
    });
};
export default useTitle;

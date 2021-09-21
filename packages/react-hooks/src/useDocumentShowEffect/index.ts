import { useRef } from 'react';
import useWatch from '../useWatch';
import useDocumentVisibility from '../useDocumentVisibility';

const useDocumentShowEffect = <T extends (...args: any[]) => any>(cb: T, immediate: boolean = false) => {
    const visible = useDocumentVisibility();
    const cbRef = useRef<T>();
    cbRef.current = cb;
    useWatch(visible, () => {
        if (visible === 'visible') {
            cbRef.current();
        }
    }, {
        immediate,
    });
};

export default useDocumentShowEffect;

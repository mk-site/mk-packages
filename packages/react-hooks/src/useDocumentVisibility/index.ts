import { useState, useEffect } from 'react';

type VisibilityState = 'hidden' | 'visible' | 'prerender' | undefined;

const useDocumentVisibility = (): VisibilityState => {
    const [visible, setVisible] = useState(document.visibilityState);
    useEffect(() => {
        const listner = () => {
            setVisible(document.visibilityState);
        };
        document.addEventListener('visibilitychange', listner);
        return () => document.removeEventListener('visibilitychange', listner);
    }, []);

    return visible;
};

export default useDocumentVisibility;

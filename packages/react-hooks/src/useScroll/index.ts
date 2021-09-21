import { useEffect, useState } from 'react';
import usePersistFn from '../usePersistFn';
import { BasicTarget, getTargetElement } from '../utils';

interface Position {
  left: number;
  top: number;
}

export type Target = BasicTarget<HTMLElement | Document>;
export type ScrollListenController = (val: Position) => boolean;

const useScroll = (fn: ScrollListenController, target?: Target) => {
    const [position, setPosition] = useState<Position>({
        left: 0,
        top: 0,
    });
    const shouldUpdatePersist = usePersistFn(fn);
    useEffect(() => {
        const el = getTargetElement(target, document);
        if (!el) {
            return;
        }
        const updatePosition = (currentTarget: Target): void => {
            let newPosition: Position;
            if (currentTarget === document) {
                if (!document.scrollingElement) {
                    newPosition = {
                        left: document.scrollingElement.scrollLeft,
                        top: document.scrollingElement.scrollTop,
                    };
                }
            } else {
                newPosition = {
                    left: (currentTarget as HTMLElement).scrollLeft,
                    top: (currentTarget as HTMLElement).scrollTop,
                };
            }
            if (shouldUpdatePersist(newPosition)) {
                setPosition(newPosition);
            }
        };
        updatePosition(el as Target);
        function listener(event: Event): void {
            if (!event.target) return;
            updatePosition(event.target as Target);
        }
        el.addEventListener('scroll', listener);
        return () => {
            el.removeEventListener('scroll', listener);
        };
    }, [target, shouldUpdatePersist]);
    return position;
};

export default useScroll;

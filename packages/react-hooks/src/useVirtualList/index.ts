import { useState, useEffect, useMemo } from 'react';
import useSize from '../useSize';

export interface Options {
  itemHeight: number | ((index: number) => number);
  overscan?: number;
}

const useVirtualList = <T>(list: T[], options: Options) => {
  const [size, ref] = useSize();
  const [state, setState] = useState({ start: 0, end: 10 });
  const { itemHeight, overscan = 5 } = options;

  const totalHeight = useMemo(() => {
    if (typeof itemHeight === 'number') {
      return list.length * itemHeight;
    }
    return list.reduce((sum, _, index) => sum + itemHeight(index), 0);
  }, [list.length]);

  const getViewCapacity = (containerHeight: number) => {
    if (typeof itemHeight === 'number') {
      return Math.ceil(containerHeight / itemHeight);
    }
    const { start = 0 } = state;
    let sum = 0;
    let capacity = 0;
    for (let i = start; i < list.length; i += 1) {
      const height = itemHeight(i);
      sum += height;
      if (sum >= containerHeight) {
        capacity = i;
        break;
      }
    }
    return capacity - start;
  };

  const getOffset = (scrollTop: number) => {
    if (typeof itemHeight === 'number') {
      return Math.floor(scrollTop / itemHeight) + 1;
    }
    let sum = 0;
    let offset = 0;
    for (let i = 0; i < list.length; i += 1) {
      const height = (itemHeight as (index: number) => number)(i);
      sum += height;
      if (sum >= scrollTop) {
        offset = i;
        break;
      }
    }
    return offset + 1;
  };

  const calculateRange = () => {
    const element = ref.current;
    if (element) {
      const offset = getOffset(element.scrollTop);
      const viewCapacity = getViewCapacity(element.clientHeight);
      const from = offset - overscan;
      const to = offset + viewCapacity + overscan;
      setState({ start: from < 0 ? 0 : from, end: to > list.length ? list.length : to });
    }
  };
  const scrollTo = (index: number) => {
    if (ref.current) {
      ref.current.scrollTop = getDistanceTop(index);
      calculateRange();
    }
  };

  const getDistanceTop = (index: number) => {
    if (typeof itemHeight === 'number') {
      const height = index * itemHeight;

      return height;
    }
    const height = list.slice(0, index).reduce((sum, _, i) => sum + itemHeight(i), 0);

    return height;
  };

  useEffect(() => {
    calculateRange();
  }, [size.width, size.height]);

  return {
    list: list.slice(state.start, state.end).map((ele, index) => ({ data: ele, index: index + state.start })),
    scrollTo,
    containerProps: {
      ref,
      onScroll: (e) => {
        e.preventDefault();
        calculateRange();
      },
      style: { overflowY: 'auto' } as const
    },
    wrapperProps: {
      style: {
        width: '100%',
        height: totalHeight,
        paddingTop: getDistanceTop(state.start),
        boxSizing: 'border-box' as const
      }
    }
  };
};

export default useVirtualList;

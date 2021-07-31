import { useEffect, useRef } from 'react';

export interface Config {
    immediate: boolean;
}

const useWatch = <T = any>(
  dep: T,
  callback: (prevDep: T | undefined) => void,
  config: Config = { immediate: false }) => {
  const initied = useRef(false);
  const stoped = useRef(false);
  const prevDep = useRef<T>(dep);

  useEffect(() => {
    const execute = () => callback(prevDep.current);
    if (!initied.current) {
      initied.current = true;
      if (config.immediate) {
        execute(); // 初始化时也回调
      }
    } else if (!stoped.current) {
      execute();
    }
    prevDep.current = dep;
  }, [dep, config.immediate]);

  return () => {
    stoped.current = true;
  };
};

export default useWatch;

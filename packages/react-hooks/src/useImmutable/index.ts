import { useRef } from 'react';

const useImmutable = <T>(val: T) => useRef(val).current;

export default useImmutable;
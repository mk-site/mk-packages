import React, { useState, useRef } from 'react';
import { useClickAway } from 'mk-react-hooks';

export default () => {
    const [counter, setCounter] = useState(0);
    const ref = useRef<HTMLSpanElement>();
    useClickAway(
        () => {
            setCounter((s) => s + 1);
        },
        ref,
        'contextmenu',
    );

    return (
        <div>
            <span ref={ref}>
                <button type="button">box1</button>
            </span>
            <p>
                counter:
                {' '}
                {counter}
            </p>
        </div>
    );
};

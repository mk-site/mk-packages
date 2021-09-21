import React, { useState, useRef } from 'react';
import { useEventListener } from 'mk-react-hooks';

export default () => {
    const [value, setValue] = useState(0);

    const clickHandler = () => {
        setValue(value + 1);
    };

    const ref = useRef();
    useEventListener('click', clickHandler, { target: ref });

    return (
        <button ref={ref} type="button">
            You click
            {' '}
            {value}
            {' '}
            times
        </button>
    );
};

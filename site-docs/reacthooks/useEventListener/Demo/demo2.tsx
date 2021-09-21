import React, { useState } from 'react';
import { useEventListener } from 'mk-react-hooks';

export default () => {
    const [value, setValue] = useState('');

    const keyDownHandler = (ev: KeyboardEvent) => {
        setValue(ev.code);
    };
    useEventListener('keydown', keyDownHandler);

    return (
        <p>
            Your press key is
            {' '}
            {value}
        </p>
    );
};

import React, { useState } from 'react';
import { useClickAway } from 'mk-react-hooks';

export default () => {
    const [counter, setCounter] = useState(0);

    useClickAway(
        () => {
            setCounter((s) => s + 1);
        },
        () => document.getElementById('box2'),
    );

    return (
        <div>
            <button type="button" id="box2">
                box2
            </button>
            <p>
                counter:
                {' '}
                {counter}
            </p>
        </div>
    );
};

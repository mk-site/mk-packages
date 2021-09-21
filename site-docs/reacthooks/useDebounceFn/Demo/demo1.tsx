import React, { useState } from 'react';
import { useDebounceFn } from 'mk-react-hooks';

export default () => {
    const [value, setValue] = useState(0);
    const [run] = useDebounceFn(() => {
        setValue(value + 1);
    }, 500);

    return (
        <div>
            <p style={{ marginTop: 16 }}>
                {' '}
                Clicked count:
                {' '}
                {value}
                {' '}
            </p>
            <button type="button" onClick={run}>
                Click fast!
            </button>
        </div>
    );
};

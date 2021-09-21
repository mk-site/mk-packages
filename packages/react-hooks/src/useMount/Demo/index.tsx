/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import { useMount } from 'mk-react-hooks';

export default () => {
    const [count, setCount] = useState(0);
    useMount(() => {
        console.log('只执行一次');
    });

    return (
        <div onClick={() => {
            setCount(count + 1);
        }}
        >
            点击 -
            {' '}
            {count}
        </div>
    );
};

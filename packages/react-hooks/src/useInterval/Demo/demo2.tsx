/* eslint-disable react/jsx-indent-props */
import React, { useState } from 'react';
import { useInterval } from 'mk-react-hooks';
import { Button } from 'antd';

export default () => {
    const [count, setCount] = useState(0);
    const [interval, setInterval] = useState(1000);

    useInterval(
        () => {
            setCount(count + 1);
        },
        interval,
        { immediate: true },
    );

    return (
        <div>
            <p>
                {' '}
                count:
                {' '}
                {count}
                {' '}
            </p>
            <p style={{ marginTop: 16 }}>
                {' '}
                interval:
                {' '}
                {interval}
                {' '}
            </p>
            <Button onClick={() => setInterval(interval + 1000)} style={{ marginRight: 8 }}>
                interval + 1000
            </Button>
            <Button
                style={{ marginRight: 8 }}
                onClick={() => {
                    setInterval(1000);
                }}
            >
                reset interval
            </Button>
            <Button
                onClick={() => {
                    setInterval(null);
                }}
            >
                clear
            </Button>
        </div>
    );
};

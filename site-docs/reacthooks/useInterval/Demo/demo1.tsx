import React, { useState } from 'react';
import { useInterval } from 'mk-react-hooks';
import { Button } from 'antd';

export default () => {
    const [count, setCount] = useState(0);

    const [run, cancel] = useInterval(() => {
        setCount(count + 1);
    }, 1000);

    return (
        <div>
            <div style={{ marginBottom: 10 }}><Button onClick={run}>开始</Button></div>
            <div><Button onClick={cancel}>停止</Button></div>
            count:
            {' '}
            {count}
        </div>
    );
};

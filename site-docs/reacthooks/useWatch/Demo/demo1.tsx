import React, { useState } from 'react';
import { Button } from 'antd';
import { useWatch } from 'mk-react-hooks';

export default () => {
    const [count, setCount] = useState(0);
    useWatch(count, (prev) => {
        console.log(`useWatch-current: ${count}, prev: ${prev}`);
    });
    return (
        <>
            <Button onClick={() => setCount((c) => c + 1)}>
                点击
            </Button>
            <div>
                {`current: ${count}`}
            </div>
        </>
    );
};

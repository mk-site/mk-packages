import React, { useState } from 'react';
import { Button } from 'antd';
import { useWatch } from 'mk-react-hooks';
import 'antd/lib/button/style/css';

export default () => {
    const [count, setCount] = useState(0);

    useWatch(count, (prev) => {
        console.log(`useWatch-挂载立即执行: current: ${count}, prev: ${prev}`);
    }, { immediate: true });
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

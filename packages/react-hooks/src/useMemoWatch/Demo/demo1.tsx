import React, { useState } from 'react';
import { Button } from 'antd';
import { useMemoWatch } from 'mk-react-hooks';

export default () => {
    const [count, setCount] = useState(1);
    const [visible, setVisible] = useState(false);
    const res = useMemoWatch([count, visible]);
    console.log('值', res);
    return (
        <>
            <Button onClick={() => {
                setCount((c) => c + 1);
                setVisible((val) => !val);
            }}
            >
                点击
            </Button>
            <div>{count}</div>
            <div>
                显示隐藏：
                {visible && count}
            </div>
        </>
    );
};

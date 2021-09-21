import React, { useState } from 'react';
import { Button } from 'antd';
import { useTitle } from 'mk-react-hooks';

export default () => {
    const [title, setTitle] = useState('设置标题');
    useTitle(title);
    return (
        <>
            <Button onClick={() => setTitle((c) => c + 1)}>
                点击
            </Button>
        </>
    );
};

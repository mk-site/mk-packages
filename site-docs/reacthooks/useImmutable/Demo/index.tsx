import React, { useState } from 'react';
import { useImmutable } from 'mk-react-hooks';
import { Button } from 'antd';
import 'antd/lib/button/style/css';

export default () => {
    const [count, setCount] = useState(0);
    const value = useImmutable(count);

    return (
        <div>
            <Button onClick={() => setCount((c) => c + 1)}>点击</Button>
            <div>
                {`count: ${count}, vlaue: ${value}`}
            </div>
        </div>
    );
};

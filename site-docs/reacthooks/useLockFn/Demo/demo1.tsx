import React, { useState } from 'react';
import { Button } from 'antd';
import { useLockFn } from 'mk-react-hooks';

function mockApiRequest() {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, 2000);
    });
}

export default () => {
    const [count, setCount] = useState(0);

    const submit = useLockFn(async () => {
        console.log('Start to submit');
        await mockApiRequest();
        setCount((val) => val + 1);
        console.log('Submit finished');
    });

    return (
        <>
            <p>
                Submit count:
                {' '}
                {count}
            </p>
            <Button onClick={submit}>Submit</Button>
        </>
    );
};

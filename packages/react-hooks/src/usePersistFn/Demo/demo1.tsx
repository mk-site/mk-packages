/* eslint-disable react/jsx-indent-props */
import React, { useState, useCallback, useRef } from 'react';
import { message } from 'antd';
import { usePersistFn } from 'mk-react-hooks';

export default () => {
    const [count, setCount] = useState(0);

    const showCountPersistFn = usePersistFn(() => {
        message.info(`Current count is ${count}`);
    });

    const showCountCommon = useCallback(() => {
        message.info(`Current count is ${count}`);
    }, [count]);

    return (
        <>
            <button
                type="button"
                onClick={() => {
                    setCount((c) => c + 1);
                }}
            >
                Add Count
            </button>
            <p>You can click the button to see the number of sub-component renderings</p>

            <div style={{ marginTop: 32 }}>
                <h4>Component with persist function:</h4>
                {/* use persist function, ExpensiveTree component will only render once */}
                <ExpensiveTree showCount={showCountPersistFn} />
            </div>
            <div style={{ marginTop: 32 }}>
                <h4>Component without persist function:</h4>
                {/* without persist function, ExpensiveTree component will re-render on state change */}
                <ExpensiveTree showCount={showCountCommon} />
            </div>
        </>
    );
};

// some expensive component with React.memo
const ExpensiveTree = React.memo<{ [key: string]: any }>(({ showCount }) => {
    const renderCountRef = useRef(0);
    renderCountRef.current += 1;

    return (
        <div>
            <p>
                Render Count:
                {' '}
                {renderCountRef.current}
            </p>
            <button type="button" onClick={showCount}>
                showParentCount
            </button>
        </div>
    );
});

import React, { useState } from 'react';
import { useUnmountedRef } from 'mk-react-hooks';

const Button = ({ setVisible }) => {
    const unmountRef: { current: boolean } = useUnmountedRef();
    const [text, setText] = useState('I am mounted');
    const handleClick = async () => {
        await setVisible();
        if (!unmountRef.current) {
            setText('I am unmounted');
        }
    };
    // eslint-disable-next-line react/button-has-type
    return <button onClick={handleClick}>{text}</button>;
};

export default () => {
    const [visible, setVisible] = useState(true);
    return (
        <div>
            click the button to unmount it
            <br />
            {visible ? <Button setVisible={() => setVisible(false)} /> : 'nothing'}
        </div>
    );
};

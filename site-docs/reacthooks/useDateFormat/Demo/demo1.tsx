import React, { useState } from 'react';
import { Button } from 'antd';
import { useDateFormat } from 'mk-react-hooks';

export default () => {
    const [time, setTime] = useState('');
    const dateFormat = useDateFormat();

    return (
        <>
            <Button onClick={() => setTime(dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss'))}>点击倒计时</Button>
            <div>
                时间：
                {time}
            </div>
        </>
    );
};

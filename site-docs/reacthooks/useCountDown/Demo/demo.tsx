import React from 'react';
import { Button } from 'antd';
import { useCountDown } from 'mk-react-hooks';

export default () => {
    const [isCountDownTiming, countDownTime, start, stop] = useCountDown();

    return (
        <>
            <Button onClick={() => start()}>点击倒计时</Button>
            <Button style={{ marginLeft: 10 }} onClick={() => stop()}>暂停倒计时</Button>
            {isCountDownTiming && (
                <div>
                    时间：
                    {countDownTime}
                </div>
            )}
        </>
    );
};

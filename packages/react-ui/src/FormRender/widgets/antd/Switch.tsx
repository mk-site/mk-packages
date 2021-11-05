/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Switch } from 'antd';

const Component = ({
    onChange, value, element, widgetChildProps, ...rest
}) => {
    const changeFunction = (e) => {
        if (onChange) {
            onChange(e.target.checked);
        }
    };
    return (
        <Switch checked={value} onChange={changeFunction} {...rest} />
    );
};

export default Component;

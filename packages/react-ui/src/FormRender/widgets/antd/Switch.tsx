/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Switch } from 'antd';
import 'antd/es/switch/style/index';

const Component = ({
    onChange, value, element, widgetChildProps, ...rest
}) => {
    const changeFunction = (val) => {
        if (onChange) {
            onChange(val);
        }
    };
    return (
        <Switch checked={value} onChange={changeFunction} {...rest} />
    );
};

export default Component;

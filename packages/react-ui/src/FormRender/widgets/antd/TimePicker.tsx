/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import moment from 'moment';
import { TimePicker } from 'antd';
import { getFormat } from '../../utils';
import usePersistFn from '../../../hooks/usePersistFn';

const Component = ({
    onChange, handleChange, format, value, style, element, ...rest
}) => {
    const timeFormat = getFormat(format);
    const timeValue = value ? moment(value, timeFormat) : undefined;

    const changeFunction = usePersistFn((e, val) => {
        onChange(val);
        handleChange(val);
    });

    const timeParams = {
        value: timeValue,
        style: { width: '100%', ...style },
        onChange: changeFunction,
        ...rest,
    };

    return <TimePicker {...timeParams} />;
};

export default Component;

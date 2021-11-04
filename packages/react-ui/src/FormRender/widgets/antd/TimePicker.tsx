/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import moment from 'moment';
import { TimePicker } from 'antd';
import { getFormat } from '../../utils';
import 'antd/es/time-picker/style/index';

const Component = ({
    onChange, format, value, style, widgetChildProps, element, ...rest
}) => {
    const timeFormat = getFormat(format);
    const timeValue = value ? moment(value) : undefined;

    const timeParams = {
        value: timeValue,
        style: { width: '100%', ...style },
        onChange,
        ...rest,
    };

    return <TimePicker {...timeParams} />;
};

export default Component;

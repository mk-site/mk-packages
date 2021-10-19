/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import { getFormat } from '../../utils';

const { RangePicker } = DatePicker;

const Component = ({
    onChange, handleChange, format, value, style, element, ...rest
}) => {
    const dateFormat = getFormat(format);
    let [start, end] = Array.isArray(value) ? value : [];
    if (typeof start === 'string' && typeof end === 'string') {
        if (format === 'week') {
            start = start.substring(0, start.length - 1);
            end = end.substring(0, end.length - 1);
        }
    }

    let datevalue = [];

    if (start && end) {
        datevalue = [moment(start, dateFormat), moment(end, dateFormat)];
    }

    const changeFunction = (val, valArray) => {
        onChange(valArray);
        handleChange(valArray);
    };

    let dateProps: any = {
        value: datevalue,
        style: { width: '100%', ...style },
        onChange: changeFunction,
    };

    if (format === 'dateTime') {
        dateProps.showTime = true;
    }

    if (['week', 'month', 'year'].indexOf(format) > -1) {
        dateProps.picker = format;
    }

    dateProps = { ...dateProps, ...rest };

    return <RangePicker {...dateProps} />;
};

export default Component;

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import { getFormat } from '../../utils';

const { RangePicker } = DatePicker;

const Component = ({
    onChange, handleChange, format, value, style, element, ...rest
}) => {
    const dateFormat = getFormat(format);
    let _value = value || undefined;
    if (typeof _value === 'string') {
        if (format === 'week') {
            _value = _value ? _value.substring(0, _value.length - 1) : _value;
        }
    }
    if (_value) {
        _value = moment(_value, dateFormat);
    }

    const changeFunction = (c, val) => {
        onChange(val);
        handleChange(val);
    };

    const dateProps = {
        showTime: false,
        format: dateFormat,
        value: _value,
        style: { width: '100%', ...style },
        onChange: changeFunction,
        ...rest,
    };
    if (format === 'dateTime') {
        dateProps.showTime = true;
    }

    // if (['week', 'month', 'year'].indexOf(format) > -1) {
    //     dateProps.picker = format;
    // }
    return <DatePicker {...dateProps} />;
};

export default Component;

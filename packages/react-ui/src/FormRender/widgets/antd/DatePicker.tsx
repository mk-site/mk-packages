/* eslint-disable no-underscore-dangle */
import React from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import { getFormat } from '../../utils';
import 'antd/es/date-picker/style/index';

const Component = ({
    onChange, format, value, style, widgetChildProps, element, ...rest
}) => {
    const dateFormat = getFormat(format);
    let _value = value || undefined;
    if (typeof _value === 'string') {
        if (format === 'week') {
            _value = _value ? _value.substring(0, _value.length - 1) : _value;
        }
    }
    if (_value) {
        _value = moment(_value);
    }
    const dateProps = {
        showTime: false,
        format: dateFormat,
        value: _value,
        style: { width: '100%', ...style },
        onChange: (val) => {
            onChange(moment(val).format(dateFormat));
        },
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

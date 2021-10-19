/* eslint-disable react/no-danger */
import React from 'react';
import { Select } from 'antd';
import usePersistFn from '../../../hooks/usePersistFn';

const { Option } = Select;

const Component = ({
    onChange, handleChange, value, element, widgetChildProps, style, source, ...rest
}) => {
    const selectParams = {
        style: { width: '100%', ...style },
        ...rest,
    };
    const childParams = {
        ...widgetChildProps,
    };
    const changeFunction = usePersistFn((val) => {
        onChange(val);
        if (handleChange) {
            handleChange(val);
        }
    });
    return (
        <Select value={value} onChange={changeFunction} {...selectParams}>
            {
                (source || []).map((item, index) => {
                    const key = item.value || index;
                    let label = item[element.sourceLabelMap] || item.label;
                    const isHtml = typeof label === 'string' && label[0] === '<';
                    if (isHtml) {
                        label = <span dangerouslySetInnerHTML={{ __html: label }} />;
                    }
                    return (
                        <Option
                            key={key}
                            value={item[element.sourceValueMap] || item.value}
                            {...childParams}
                        >
                            {label}
                        </Option>
                    );
                })
            }
        </Select>
    );
};

const ComponentSelect = Component;

export const MultiSelect = (props) => <ComponentSelect {...props} mode="multiple" />;

export default ComponentSelect;

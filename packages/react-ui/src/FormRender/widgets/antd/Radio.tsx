import React from 'react';
import { Radio } from 'antd';
/* eslint-disable react/no-danger */
import usePersistFn from '../../../hooks/usePersistFn';

const Component = ({
    onChange, handleChange, value, element, widgetChildProps, style, source, ...rest
}) => {
    const radioProps = {
        style: { width: '100%', ...style },
        ...rest,
    };
    const radioItemProps = {
        ...widgetChildProps,
    };
    const changeFunction = usePersistFn((val) => {
        onChange(val);
        handleChange(val);
    });
    return (
        <Radio.Group value={value} onChange={changeFunction} {...radioProps}>
            {
                (source || []).map((item, index) => {
                    const key = item.value || index;
                    let label = item[element.sourceLabelMap] || item.label;
                    const isHtml = typeof label === 'string' && label[0] === '<';
                    if (isHtml) {
                        label = <span dangerouslySetInnerHTML={{ __html: label }} />;
                    }
                    return (
                        <Radio
                            key={key}
                            value={item[element.sourceValueMap] || item.value}
                            {...radioItemProps}
                        >
                            {label}
                        </Radio>
                    );
                })
            }
        </Radio.Group>
    );
};

export default Component;

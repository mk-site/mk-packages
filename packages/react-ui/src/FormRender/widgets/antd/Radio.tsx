import React from 'react';
import { Radio } from 'antd';
import 'antd/es/radio/style/index';

const Component = ({
    onChange, value, element, widgetChildProps, style, source, ...rest
}) => {
    const radioProps = {
        style: { width: '100%', ...style },
        ...rest,
    };
    const radioItemProps = {
        ...widgetChildProps,
    };
    return (
        <Radio.Group value={value} onChange={onChange} {...radioProps}>
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

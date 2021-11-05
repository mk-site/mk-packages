import React from 'react';
import { Checkbox } from 'antd';
import 'antd/es/checkbox/style/index';

const Component = ({
    onChange, value, element, widgetChildProps, style, source, ...rest
}) => {
    const checkboxProps = {
        style: { width: '100%', ...style },
        ...rest,
    };
    const radioItemProps = {
        ...widgetChildProps,
    };
    return (
        <Checkbox.Group value={value} onChange={onChange} {...checkboxProps}>
            {
                (source || []).map((item, index) => {
                    const key = item.value || index;
                    let label = item[element?.sourceLabelMap] || item.label;
                    const isHtml = typeof label === 'string' && label[0] === '<';
                    if (isHtml) {
                        label = <span dangerouslySetInnerHTML={{ __html: label }} />;
                    }
                    return (
                        <Checkbox
                            key={key}
                            value={item[element?.sourceValueMap] || item.value}
                            {...radioItemProps}
                        >
                            {label}
                        </Checkbox>
                    );
                })
            }
        </Checkbox.Group>
    );
};

export default Component;

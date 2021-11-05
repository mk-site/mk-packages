import React from 'react';
import { Input } from 'antd';
import { isUrl } from '../../utils';

const LinkNode = ({ value }) => {
    const useUrl = isUrl(value);
    if (useUrl) {
        return (
            <a target="_blank" href={value} rel="noreferrer">
                测试链接
            </a>
        );
    }
    return <div>测试链接</div>;
};

const UrlInput = ({
    onChange, value, element, widgetChildProps, ...rest
}) => <Input onChange={onChange} value={value} addonAfter={<LinkNode value={value} />} {...rest} />;

export default UrlInput;

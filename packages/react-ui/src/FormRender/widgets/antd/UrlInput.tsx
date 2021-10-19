/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Input } from 'antd';
import { isUrl } from '../../utils';
import usePersistFn from '../../../hooks/usePersistFn';

const TestNode = ({ value }) => {
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
    onChange, handleChange, value, element, ...rest
}) => {
    const changeFunction = usePersistFn((val) => {
        onChange(val);
        handleChange(val);
    });
    return <Input onChange={changeFunction} value={value} addonAfter={<TestNode value={value} />} {...rest} />;
};

export default UrlInput;

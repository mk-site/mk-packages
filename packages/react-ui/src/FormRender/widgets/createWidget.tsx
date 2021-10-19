/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import usePersistFn from '../../hooks/usePersistFn';

const createBaseWidget = (onProps?: (obj: Record<string, any>) => any) => (Component: any): any => (props: any) => {
    const {
        onChange, handleChange, value, element, children, ...rest
    } = props;
    const changeFunction = usePersistFn((...args) => {
        onChange(...args);
        handleChange(...args);
    });
    let widgetsProps = {
        value,
        onChange: changeFunction,
    };
    const widgetsMapProps = typeof onProps === 'function' ? onProps({ element, widgetsProps, ...rest }) || {} : {};

    widgetsProps = {
        ...widgetsProps,
        ...widgetsMapProps,
        ...rest,
    };

    return <Component {...widgetsProps}>{children}</Component>;
};

export {
    createBaseWidget,
};

/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import usePersistFn from '../../hooks/usePersistFn';

const createBaseWidget = (onProps?: (obj: Record<string, any>) => any) => (Component: any): any => (props: any) => {
    const {
        element, children, ...rest
    } = props;
    const widgetsMapProps = typeof onProps === 'function' ? onProps({ element, ...rest }) || {} : {};

    const widgetsProps = {
        ...widgetsMapProps,
        ...rest,
    };

    return <Component {...widgetsProps}>{children}</Component>;
};

export {
    createBaseWidget,
};

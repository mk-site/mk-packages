import React from 'react';
import { FormRender } from './index';

export default () => {
    const schema = {
        meta: [
            {
                type: 'Input',
                name: 'userName',
                label: '用户名',
                required: true,
            },
        ],
    };
    return <FormRender schema={schema} />;
};

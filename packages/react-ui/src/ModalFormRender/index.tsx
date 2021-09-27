// 模态框加入form表单
import React from 'react';
import { FormRender } from '../FormRender';

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

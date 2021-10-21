import React, { useMemo, useState } from 'react';
import { Button } from 'antd';
import { FormRender } from './index';

export default () => {
    const [required, setRequired] = useState(false);
    const schema = useMemo(() => ({
        meta: [
            {
                type: 'Input',
                name: 'userName',
                label: '用户名',
                required,
            },
        ],
    }), [required]);
    return (
        <>
            <FormRender schema={schema} />
            <Button onClick={() => {
                setRequired(!required);
            }}
            >
                更改必填
            </Button>
        </>
    );
};

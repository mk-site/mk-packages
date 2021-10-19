import React, { useMemo, useState } from 'react';
import { Button } from 'antd';
import { FormRender, IFormSchema } from './index';

export default () => {
    const [showCity, setShowCity] = useState(false);
    const [showArea, setShowArea] = useState(true);
    const schema = useMemo((): IFormSchema => ({
        onValuesChange: (changedValues) => {
            console.log('变化', changedValues);
            if (Object.prototype.hasOwnProperty.call(changedValues, 'province')) {
                setShowCity(!!changedValues.province);
            }
        },
        column: 1,
        gutter: 50,
        labelCol: { span: 6 },
        wrapperCol: { span: 12 },
        meta: [
            {
                type: 'Input',
                name: 'province',
                label: '省份',
            },
            {
                visible: showCity,
                type: 'Input',
                name: 'city',
                label: '城市',
                required: true,
                // dependencies: ['province'],
                // onVisible: (obj) => {
                //     console.log(obj.form);
                //     const values = obj.form.getFieldsValue();
                //     console.log('渲染', obj.element, values);
                //     if (values.userName && values.userName.length > 1) {
                //         return true;
                //     }
                //     return false;
                // },
            },
            {
                type: 'Input',
                name: 'area',
                label: '县',
                display: showArea ? 'block' : 'none',
            },
            {
                type: 'TextArea',
                name: 'problem',
                label: '问题',
            },
        ],
    }), [showCity, showArea]);
    return (
        <>
            <FormRender schema={schema} />
            <Button onClick={() => {
                setShowCity(!showCity);
            }}
            >
                {showCity ? '隐藏' : '显示'}
                城市(remove - 不占空间)
            </Button>
            <Button
                style={{ marginLeft: 10 }}
                onClick={() => {
                    setShowArea(!showArea);
                }}
            >
                {showArea ? '隐藏' : '显示'}
                县(style - 占空间)
            </Button>
        </>
    );
};

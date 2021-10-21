import React, { useMemo, useState, useCallback } from 'react';
import { Button, Form } from 'antd';
import { FormRender, IFormSchema } from './index';

export default () => {
    // const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const schema = useMemo((): IFormSchema => ({
        onValuesChange: (changedValues, values) => {
            console.log('变化', changedValues, values);
        },
        onFinish(values) {
            console.log('完成', values);
        },
        column: 1,
        gutter: 50,
        debug: false,
        labelCol: { span: 6 },
        wrapperCol: { span: 12 },
        meta: [
            {
                type: 'Input',
                name: 'text',
                label: '文本',
                required: true,
                initialValue: '123',
            },
            {
                type: 'Button',
                wrapperCol: { offset: 6, span: 12 },
                buttonMeta: [
                    {
                        type: 'primary',
                        btnType: 'reset',
                        children: '重置',
                    },
                    {
                        type: 'primary',
                        // childType: 'submit',
                        children: '提交',
                        loading,
                        style: {
                            margin: '0 12px',
                        },
                        onClick: async ({ form }) => {
                            console.log('form', form);
                            setLoading(true);
                            try {
                                await form.submit();
                                console.log('values:', form.getFieldsValue());
                                setTimeout(() => {
                                    setLoading(false);
                                }, 2000);
                            } catch (error) {
                                console.log(error);
                                setLoading(false);
                            }
                        },
                    },
                    {
                        children: '点击获取参数',
                        onClick({ form }) {
                            console.log('点击', form.getFieldsValue());
                        },
                    },
                ],
            },
        ],
    }), [loading]);
    return (
        <>
            <FormRender schema={schema} />
        </>
    );
};

import React, { useState } from 'react';
import { Form, Button, Input } from 'antd';
// import { FormInstance } from 'antd/es/form';
import { FormRender, IFormSchema } from './index';

import 'antd/dist/antd.css';

export default () => {
    const [form] = Form.useForm();
    const onClick = async () => {
        // console.log(form.getFieldsValue());
        await form.submit();
        console.log('结束');
    };
    const [schema, setSchema] = useState<IFormSchema>({
        column: 1,
        widgets: {}, // 自定义组件
        onFinish: (values) => {
            console.log('values', values);
        },
        // onValuesChange: (changedValues) => {
        //     console.log('变化', changedValues);
        //     if (changedValues.userName) {
        //         setSchema({
        //             ...schema,
        //             meta: schema.meta.map((item) => {
        //                 if (item.name === 'enName') {
        //                     return {
        //                         ...item,
        //                         visible: changedValues.userName.length > 2,
        //                     };
        //                 }
        //                 return { ...item };
        //             }),
        //         });
        //     }
        // },
        labelCol: { span: 4 },
        wrapperCol: { span: 16 },
        meta: [
            {
                type: 'Input',
                name: 'userName',
                label: '用户名',
                required: true,
                onChange(e, obj) {
                    console.log(e, obj);
                },
            },
            {
                visible: true, // 控制表单数据联动
                type: 'Input',
                name: 'enName',
                label: 'en姓名',
                required: true,
                dependencies: ['userName'],
                onVisible: (obj) => {
                    const values = obj.form.getFieldsValue();
                    if (values.userName && values.userName.length >= 1) {
                        return true;
                    }
                    return false;
                },
            },
            {
                type: 'Input',
                name: 'userName2',
                label: '用户名2',
                required: true,
            },
            {
                type: 'Input',
                name: 'userName3',
                label: '用户名3',
                required: true,
                render: (obj) => {
                    const { formItemProps } = obj;
                    return (
                        <obj.Form.Item {...formItemProps}>
                            <Input />
                        </obj.Form.Item>
                    );
                },
            },
        ],
    });
    return (
        <div>
            <FormRender form={form} schema={schema} />
            <Button onClick={onClick}>点击</Button>
        </div>
    );
};

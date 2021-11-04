import React from 'react';
import { Form } from 'antd';
import { FormRender, IFormSchema } from './index';

export default () => {
    const [form] = Form.useForm();
    const schema: IFormSchema = {
        onFinish(obj) {
            console.log('完成', obj);
        },
        column: 2,
        // gutter: 10,
        debug: false,
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
        // marginBottom: 10,
        meta: [
            {
                type: 'Input',
                name: 'userName',
                label: '用户名',
                onChange(val) {
                    console.log('外部变化', val);
                },
                // required: true,
            },
            {
                type: 'TextArea',
                name: 'TextArea',
                label: '输入值',
            },
            {
                type: 'InputNumber',
                name: 'number',
                label: '数字',
                // required: true,
            },
            {
                type: 'Checkbox',
                name: 'genderCheckboxBoolean',
                label: '勾选',
                children: '请同意协议',
                // valuePropName: 'checked',
                onChange: (val) => {
                    console.log('Checkbox值变化', val);
                },
            },
            {
                type: 'Radio',
                name: 'genderRadio',
                label: '单选',
                enumLabels: ['男', '女'],
                enumValues: [1, 2],
            },
            {
                type: 'CheckboxGroup',
                name: 'gender',
                label: '多选',
                enumLabels: ['男', '女'],
                // @ts-ignore
                enumValues: [1, 2],
                onChange: (val) => {
                    console.log('Checkbox值变化', val);
                },
            },
            {
                type: 'MultiSelect',
                name: 'kecheng',
                label: '选择课程',
                enumLabels: ['英语', '语文'],
                // @ts-ignore
                enumValues: ['en', 'cn'],
                // widgetProps: {
                //     mode: 'multiple',
                // },
            },
            {
                type: 'UrlInput',
                name: 'url',
                label: '输入连接',
                onChange: (val) => {
                    console.log('UrlInput值变化', val);
                },
            },
            {
                type: 'Color',
                name: 'color',
                label: '颜色选择器',
                onChange: (val) => {
                    console.log('Color值变化', val);
                },
            },
            {
                type: 'TimePicker',
                name: 'time',
                format: 'time',
                label: '时间',
                onChange: (val) => {
                    console.log('time值变化', val);
                },
            },
            {
                type: 'DatePicker',
                name: 'DatePicker-日期',
                // format: 'dateTime',
                label: '单日期',
                onChange: (val) => {
                    console.log('值变化', val);
                },
            },
            {
                type: 'DateRangePicker',
                name: 'date-range',
                // format: 'dateTime',
                label: '日期范围',
                onChange: (val) => {
                    console.log('DateRangePicker 值变化', val);
                },
            },
            {
                type: 'Cascader',
                name: 'province-city',
                // format: 'dateTime',
                label: '省市联动',
                source: [
                    {
                        label: '江苏省',
                        value: 'js',
                        children: [
                            {
                                label: '南京',
                                value: 'nj',
                            },
                            {
                                label: '苏州',
                                value: 'sz',
                            },
                        ],
                    },
                ],
                widgetProps: {
                    placeholder: '请选择',
                },
                onChange: (val) => {
                    console.log('省市联动 值变化', val);
                },
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
                        btnType: 'submit',
                        children: '提交',
                        style: {
                            margin: '0 12px',
                        },
                        // onClick: async ({ form }) => {
                        //     console.log('form', form);
                        //     setLoading(true);
                        //     try {
                        //         await form.submit();
                        //         console.log('values:', form.getFieldsValue());
                        //         setTimeout(() => {
                        //             setLoading(false);
                        //         }, 2000);
                        //     } catch (error) {
                        //         console.log(error);
                        //         setLoading(false);
                        //     }
                        // },
                    },
                ],
            },
        ],
    };
    return (
        <FormRender
            form={form}
            schema={schema}
            onValuesChange={(a, b) => {
                console.log('formchange', a, b);
            }}
        />
    );
};

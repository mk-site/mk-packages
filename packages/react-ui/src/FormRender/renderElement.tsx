import React from 'react';
import {
    Form, FormInstance, FormItemProps, Space,
} from 'antd';
import { IFormSchemaMetaItem, IFormSchema } from './types';
import widgets from './widgets';
import { pickProps, FormItemPropsPickArray } from './helper';

type PickRules = Pick<FormItemProps, 'rules'>

const rulesRequired = (rules, element) => {
    if (!Array.isArray(rules) || rules.length <= 0) {
        if (element.required) {
            return {
                rules: [{ required: true, message: `${element.label}不可为空` }],
            };
        }
        return { rules: [] };
    }
    return {
        rules: rules.map((item) => {
            if (!item.hasOwnproperty('required') && element.required) {
                return { ...item, message: `${element.label}不可为空` };
            }
            return item;
        }),
    };
};

const pickSource = (element: IFormSchemaMetaItem) => {
    const { enumNames, enums } = element;
    const options = (enums || []).map((item, idx) => {
        const label = enumNames && Array.isArray(enumNames) ? enumNames[idx] : item;
        return { label, value: item };
    });
    return [...options, ...(element.source || [])];
};

const renderElement = (form: FormInstance, element: IFormSchemaMetaItem, schema: IFormSchema) => {
    if (element.visible === false) {
        return null;
    }
    const pickRules: PickRules = rulesRequired(element.rules, element);
    const formItemProps = {
        ...pickProps(element, FormItemPropsPickArray),
        ...pickRules,
        ...(element.props || {}),
    };
    formItemProps.labelCol = {
        ...(schema.labelCol || {}),
        ...(formItemProps.labelCol || {}),
    };
    formItemProps.wrapperCol = {
        ...(schema.wrapperCol || {}),
        ...(formItemProps.wrapperCol || {}),
    };
    let Comp = widgets[element.type] || (schema.widgets || {})[element.type];
    if (element.childType) {
        Comp = Comp[element.childType];
    }
    if ((Array.isArray(element.dependencies) && element.dependencies.length > 0)) {
        return (
            <Form.Item dependencies={element.dependencies || []}>
                {() => {
                    if (typeof element.renderVisible === 'function') {
                        if (element.renderVisible({
                            form, formItemProps, element, Form,
                        }) && Comp) {
                            return (
                                <Form.Item style={{ marginBottom: 0 }} {...formItemProps}>
                                    <Comp
                                        source={pickSource(element)}
                                        disabled={schema.disabled || element.disabled}
                                        {...(element.widgetProps || {})}
                                    />
                                </Form.Item>
                            );
                        }
                        return null;
                    }
                    if (typeof element.render === 'function') {
                        return element.render.call({
                            form, formItemProps, element, Form,
                        });
                    }
                    if (schema.debug) {
                        console.warn('组件未渲染成功', element);
                    }
                    return null;
                }}
            </Form.Item>
        );
    }
    if (element.shouldUpdate) {
        return (
            <Form.Item shouldUpdate={element.shouldUpdate}>
                {() => {
                    if (typeof element.renderVisible === 'function') {
                        if (element.renderVisible({
                            form, formItemProps, element, Form,
                        }) && Comp) {
                            return (
                                <Form.Item style={{ marginBottom: 0 }} {...formItemProps}>
                                    <Comp
                                        source={pickSource(element)}
                                        disabled={schema.disabled || element.disabled}
                                        {...(element.widgetProps || {})}
                                    />
                                </Form.Item>
                            );
                        }
                        if (schema.debug) {
                            console.warn('组件未渲染成功', element);
                        }
                        return null;
                    }
                    if (typeof element.render === 'function') {
                        return element.render.call(element, {
                            form, formItemProps, element, Form,
                        });
                    }
                    if (schema.debug) {
                        console.warn('组件未渲染成功', element);
                    }
                    return null;
                }}
            </Form.Item>
        );
    }
    if (typeof element.render === 'function') {
        return element.render.call(element, {
            form, formItemProps, element, Form,
        });
    }
    if (!Comp) {
        if (schema.debug) {
            console.warn('组件未渲染成功', element);
        }
        return null;
    }
    return (
        <>
            <Form.Item {...formItemProps}>
                <Comp
                    source={pickSource(element)}
                    disabled={schema.disabled || element.disabled}
                    {...(element.widgetProps || {})}
                />
            </Form.Item>
        </>
    );
};
export default renderElement;

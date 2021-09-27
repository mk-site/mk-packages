/* eslint-disable react/no-array-index-key */
import React, { memo } from 'react';
import {
    Form,
    FormInstance,
    FormItemProps,
    Button,
} from 'antd';
import { IFormSchemaMetaItem, IFormSchema } from './types';
import widgets from './widgets';
import { pickProps, FormItemPropsPickArray, isFunction } from './helper';

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
export interface IRenderElementProps {
    form: FormInstance,
    element: IFormSchemaMetaItem,
    schema: IFormSchema
}

const renderElement: React.FC<IRenderElementProps> = memo(({ form, element, schema }) => {
    const pickRules: PickRules = rulesRequired(element.rules, element);
    const formItemProps = {
        ...pickProps(element, FormItemPropsPickArray),
        ...pickRules,
        ...(element.props || {}),
    };
    let Comp = widgets[element.type] || (schema.widgets || {})[element.type];
    if (element.childType) {
        Comp = Comp ? Comp[element.childType] : null;
    }
    const renderFunction = () => element.render.call(element, {
        form, formItemProps, element, Form,
    });
    const renderJsx = () => {
        if (!Comp) {
            if (schema.debug) {
                console.warn('组件未渲染成功', element);
            }
            return null;
        }
        return (
            <Form.Item {...formItemProps}>
                <Comp
                    source={pickSource(element)}
                    disabled={schema.disabled || element.disabled}
                    {...(element.widgetProps || {})}
                />
            </Form.Item>
        );
    };
    if ((Array.isArray(element.dependencies) && element.dependencies.length > 0)) {
        return (
            <Form.Item noStyle dependencies={element.dependencies || []}>
                {() => {
                    if (typeof element.renderVisible === 'function') {
                        if (element.renderVisible({
                            form, formItemProps, element, Form,
                        })) {
                            return renderJsx();
                        }
                        return null;
                    }
                    if (typeof element.render === 'function') {
                        return renderFunction();
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
            <Form.Item noStyle shouldUpdate={element.shouldUpdate}>
                {() => {
                    if (typeof element.renderVisible === 'function') {
                        if (element.renderVisible({
                            form, formItemProps, element, Form,
                        })) {
                            return renderJsx();
                        }
                        if (schema.debug) {
                            console.warn('组件未渲染成功', element);
                        }
                        return null;
                    }
                    if (typeof element.render === 'function') {
                        return renderFunction();
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
        return renderFunction();
    }

    // 渲染按钮
    if (element.type === 'Button') {
        return (
            <Form.Item {...formItemProps}>
                {(element.buttonMeta || []).map((item, index: number) => {
                    const {
                        children, childType, buttonClick, ...rest
                    } = item;
                    return (
                        <React.Fragment key={index}>
                            <Button
                                onClick={async (e) => {
                                    e.preventDefault();
                                    if (childType === 'reset') {
                                        form.resetFields();
                                        if (isFunction(schema.onReset)) {
                                            schema.onReset({
                                                form,
                                                buttonItem: item,
                                                element,
                                            });
                                        }
                                        return;
                                    }
                                    if (childType === 'submit') {
                                        try {
                                            await form.submit();
                                        } catch (error) {
                                            console.log(error);
                                        }
                                        return;
                                    }
                                    if (typeof buttonClick === 'function') {
                                        buttonClick({
                                            form,
                                            buttonItem: item,
                                            element,
                                        });
                                        return;
                                    }
                                    console.warn('请传入onClick函数');
                                }}
                                {...rest}
                            >
                                {children}
                            </Button>
                        </React.Fragment>
                    );
                })}
            </Form.Item>
        );
    }
    return renderJsx();
});
export default renderElement;

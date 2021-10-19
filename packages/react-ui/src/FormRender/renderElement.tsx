/* eslint-disable react/no-array-index-key */
import React, { memo } from 'react';
import {
    Form,
    FormInstance,
    FormItemProps,
    Button,
} from 'antd';
import { IFormSchemaMetaItem, IFormSchema, ISchemaEventObj } from './types';
import widgets from './widgets';
import {
    pickProps, FormItemPropsPickArray, isFunction, defaultGetValueFromEvent, hasOwnProperty,
} from './helper';
import usePersistFn from '../hooks/usePersistFn';

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
    const { enumLabels, enumValues } = element;
    const options = (enumValues || []).map((item, idx) => {
        const label = enumLabels && Array.isArray(enumLabels) ? enumLabels[idx] : item;
        return { label, value: item };
    });
    return [...options, ...(element.source || [])];
};
export interface IRenderElementProps {
    form: FormInstance,
    element: IFormSchemaMetaItem,
    schema: IFormSchema,
    onSearch?: (obj: ISchemaEventObj) => any,
}

const renderElement: React.FC<IRenderElementProps> = memo(({
    form, element, schema, onSearch,
}) => {
    const pickRules: PickRules = rulesRequired(element.rules, element);
    const formItemProps = {
        ...(schema.marginBottom ? { style: { marginBottom: schema.marginBottom } } : {}),
        ...pickProps(element, FormItemPropsPickArray),
        ...pickRules,
        ...(element.props || {}),
    };
    // // 优先使用本地传递的组件进行覆盖, 没有再查找系统自带功能
    let Comp: any;
    // element 有组件
    if (element.widget) {
        Comp = element.widget;
    } else {
        Comp = (schema.widgets || {})[element.type] || widgets[element.type];
        // if (element.childType) {
        //     Comp = Comp ? Comp[element.childType] : null;
        // }
    }
    const handleChange = usePersistFn((val) => {
        if (isFunction(element.onChange)) {
            let valuePropName = 'value';
            if (element.valuePropName && typeof element.valuePropName === 'string') {
                valuePropName = element.valuePropName;
            }
            const newVal = defaultGetValueFromEvent(valuePropName, val);
            element.onChange(newVal, {
                e: val,
                form,
                formItemProps,
                element,
                Form,
            });
        }
    });
    const renderFunction = () => element.render.call(element, {
        form, formItemProps, element, Form,
    });
    const renderJsx = () => {
        if (!Comp) {
            console.warn('组件未渲染成功', element);
            return null;
        }
        let compProps: any = {
            element,
            handleChange,
            // source: ,
            // format: element.format,
            // widgetChildProps: element.widgetChildProps,
            // disabled: schema.disabled || element.disabled,
            // readonly: schema.readonly || element.readonly,
            ...(element.widgetProps || {}),
        };
        const source = pickSource(element);
        if (source.length > 0) {
            compProps.source = source;
        }
        if (hasOwnProperty(element, 'format')) {
            compProps.format = element.format;
        }
        if (hasOwnProperty(element, 'widgetChildProps')) {
            compProps.widgetChildProps = element.widgetChildProps;
        }
        if (hasOwnProperty(schema, 'disabled') || hasOwnProperty(element, 'disabled')) {
            compProps.disabled = schema.disabled || element.disabled;
        }
        if (hasOwnProperty(schema, 'readonly') || hasOwnProperty(element, 'readonly')) {
            compProps.readonly = schema.readonly || element.readonly;
        }
        // 渲染组件前处理widgetProps
        if (isFunction(element.onWidgetProps)) {
            const result = element.onWidgetProps(compProps, { form, element, schema });
            if (result) {
                compProps = result;
            }
        }
        return (
            <Form.Item {...formItemProps}>
                <Comp
                    // source={pickSource(element)}
                    // disabled={schema.disabled || element.disabled}
                    // {...(element.widgetProps || {})}
                    {...compProps}
                >
                    {element.children}
                </Comp>
            </Form.Item>
        );
    };
    if ((Array.isArray(element.dependencies) && element.dependencies.length > 0)) {
        return (
            <Form.Item noStyle dependencies={element.dependencies || []}>
                {() => {
                    if (typeof element.onVisible === 'function') {
                        if (element.onVisible({
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
                    if (typeof element.onVisible === 'function') {
                        if (element.onVisible({
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
                        children, btnType, render, onClick, ...rest
                    } = item;
                    if (typeof render === 'function') {
                        return render.call(item, {
                            form,
                            buttonItem: item,
                            element,
                        });
                    }
                    return (
                        <React.Fragment key={index}>
                            <Button
                                onClick={async (e) => {
                                    e.preventDefault();
                                    if (btnType === 'reset') {
                                        form.resetFields();
                                        if (isFunction(schema.onReset)) {
                                            schema.onReset({
                                                form,
                                                buttonItem: item,
                                                element,
                                                values: {},
                                            });
                                        }
                                        return;
                                    }
                                    if (btnType === 'search') {
                                        const values = form.getFieldsValue();
                                        if (onSearch) {
                                            onSearch({
                                                values,
                                                form,
                                                buttonItem: item,
                                                element,
                                            });
                                            return;
                                        }
                                        if (schema.onSearch) {
                                            schema.onSearch({
                                                values,
                                                form,
                                                buttonItem: item,
                                                element,
                                            });
                                        }
                                        return;
                                    }
                                    if (btnType === 'submit') {
                                        try {
                                            await form.submit();
                                        } catch (error) {
                                            console.log(error);
                                        }
                                        return;
                                    }
                                    if (typeof onClick === 'function') {
                                        onClick({
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

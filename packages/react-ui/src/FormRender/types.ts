import React, { ReactNode } from 'react';
import {
    FormProps, FormItemProps, FormInstance, RowProps, ColProps, ButtonProps,
} from 'antd';
import { Gutter } from 'antd/lib/grid/row';

export type TNoopObject = Record<string, any>;
export type TNoopFunction = (...args: any) => any;

export interface IFormSourceItem {
    label: string,
    value: any,
    children?: IFormSourceItem[]
}

export interface IFormItemRulesItem {
    [key: string]: any
}

export interface IButtonMetaItem extends ButtonProps {
    btnType?: string, // 按钮类型 reset | submit
    children?: React.ReactNode | string,
    onClick?: (...args: any[]) => any;
    // buttonClick?: (obj: {
    //     form: FormInstance,
    //     element: IFormSchemaMetaItem,
    //     buttonItem: IButtonMetaItem,
    // }) => any,
    render?: TNoopFunction,
}

export interface ISchemaEventObj {
    values?: any,
    form?: FormInstance,
    buttonItem?: IButtonMetaItem,
    element?: IFormSchemaMetaItem
}

export interface IFormSchemaMetaItem extends FormItemProps {
    key?: string,
    type: string,
    initialValue?: any,
    name?: string, // 显示的字段名
    enumLabels?: string[], // 枚举值需要与source进行合并进行显示,value值会进行去重
    enumValues?: any[],
    format?: string, // 日期格式化，使用moment
    source?: IFormSourceItem[],
    props?: FormItemProps, // 用在子组件上
    onWidgetProps?: TNoopFunction, // 处理组件props
    widget?: React.ReactNode,
    widgetProps?: TNoopObject, // 用在组件上属性
    widgetChildProps?: TNoopObject, // 用在 Option 或者 Radio 或者 Checkbox等组件上
    disabled?: boolean,
    readonly?: boolean,
    display?: string,
    children?: React.ReactNode,
    required?: boolean, // 是否必传, 提示语：${title}不可为空, 为true，rules规则不显示required
    visible?: boolean,
    onChange?: (a: any, obj: {
        e: any,
        form: FormInstance,
        formItemProps: FormItemProps,
        element: IFormSchemaMetaItem,
        Form: {
            Item: React.ReactNode
            [key: string]: any
        } | React.ReactNode,
    }) => any,
    onVisible?: (obj: {
        form: FormInstance,
        formItemProps: FormItemProps,
        element: IFormSchemaMetaItem,
        Form: {
            Item: React.ReactNode
            [key: string]: any
        } | React.ReactNode,
    }) => boolean;
    render?: TNoopFunction, // 自定义函数，组件不支持的情况可使用
    buttonMeta?: IButtonMetaItem[]
}

export interface IFormSchema extends FormProps {
    props?: FormProps,
    column?: number,
    marginBottom?: string | number,
    gutter?: Gutter | [Gutter, Gutter], // 表单数据间距
    RowProps?: RowProps, // column > 1
    ColProps?: ColProps, // column > 1
    widgets?: TNoopObject,
    disabled?: boolean, // 全局控制禁用状态
    readonly?: boolean,
    width?: string | number,
    debug?: boolean, // debug为true，控制台显示日志,process.env.NODE_ENV === 'development' && debug
    initialValues?: TNoopObject,
    onMount?: TNoopFunction, // 表单初始化
    onSearch?: (obj: ISchemaEventObj) => any;
    onReset?: TNoopFunction, // 重置回调
    meta?: IFormSchemaMetaItem[],
}

export interface IFormRender {
    form?: FormInstance,
    schema?: IFormSchema,
    onSearch?: (obj: ISchemaEventObj) => any,
    onValuesChange?: (changedValues: Record<string, any>, allValues: Record<string, any>) => void;
    onFinish?: TNoopFunction,
    onFinishFailed?: TNoopFunction,
    onFieldsChange?: TNoopFunction,
}

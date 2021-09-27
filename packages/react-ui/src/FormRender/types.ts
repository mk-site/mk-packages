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
    childType?: string, // 按钮类型 reset | submit
    children?: React.ReactNode | string
    buttonClick?: (obj: {
        form: FormInstance,
        element: IFormSchemaMetaItem,
        buttonItem: IButtonMetaItem,
    }) => any
}

export interface IFormSchemaMetaItem extends FormItemProps {
    visible?: boolean,
    key?: string,
    type: string,
    childType?: string,
    initialValue?: any,
    name?: string, // 显示的字段名
    enums?: string[], // 枚举值需要与source进行合并进行显示,value值会进行去重
    enumNames?: any[],
    format?: string, // 日期格式化，使用moment
    source?: IFormSourceItem[],
    props?: FormItemProps, // 用在子组件上
    widgetProps?: TNoopObject, // 用在组件上属性
    widgetChildProps?: TNoopObject, // 用在 Option 或者 Radio 或者 Checkbox等组件上
    disabled?: boolean,
    display?: string,
    required?: boolean, // 是否必传, 提示语：${title}不可为空, 为true，rules规则不显示required
    renderVisible?: (obj: {
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
    gutter?: Gutter | [Gutter, Gutter], // 表单数据间距
    RowProps?: RowProps, // column > 1
    ColProps?: ColProps, // column > 1
    widgets?: TNoopObject,
    disabled?: boolean, // 全局控制禁用状态
    width?: string | number,
    debug?: boolean, // debug为true，控制台显示日志,process.env.NODE_ENV === 'development' && debug
    initialValues?: TNoopObject,
    onReset?: TNoopFunction, // 重置回调
    meta?: IFormSchemaMetaItem[],
}

export interface IFormRender {
    form?: FormInstance,
    schema?: IFormSchema
}

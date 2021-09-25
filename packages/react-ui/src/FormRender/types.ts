import {
    FormProps, FormItemProps, FormInstance, RowProps, ColProps, Gutter,
} from 'antd';
// import Form from 'antd/lib/form/index';

type TNoopObject = Record<string, any>;
type TNoopFunction = (...args: any) => any;

export interface IFormSourceItem {
    label: string,
    value: any
}

export interface IFormItemRulesItem {
    [key: string]: any
}

export interface IFormSchemaMetaItem extends FormItemProps {
    visible?: boolean,
    key?: string,
    type: string,
    childType?: string,
    // title?: string,
    initialValue?: any,
    name: string, // 显示的字段名
    enums?: string[], // 枚举值需要与source进行合并进行显示,value值会进行去重
    enumNames?: any[],
    source?: IFormSourceItem[],
    // debounce?: number, // 默认为300，自动开启节流，输入框需要
    props?: FormItemProps, // 用在子组件上
    widgetProps?: TNoopObject, // 用在组件上属性
    widgetChildProps?: TNoopObject, // 用在 Option 或者 Radio 或者 Checkbox等组件上
    disabled?: boolean,
    required?: boolean, // 是否必传, 提示语：${title}不可为空, 为true，rules规则不显示required
    renderVisible?: (obj: {
        form: FormInstance,
        formItemProps: FormItemProps,
        element: IFormSchemaMetaItem,
        Form: any,
    }) => boolean;
    render?: TNoopFunction, // 自定义函数，组件不支持的情况可使用
    space?: number | boolean, // true 或者数字，表示往下空多少间距
}

export interface IFormSchema extends FormProps {
    props?: FormProps,
    column?: number,
    gutter?: Gutter | [Gutter, Gutter],
    // gutter?: number;
    RowProps?: RowProps,
    ColProps?: ColProps,
    widgets?: TNoopObject,
    disabled?: boolean,
    width?: string | number,
    labelWidth?: string | number,
    debug?: boolean, // debug为true，控制台显示日志,process.env.NODE_ENV === 'development' && debug
    onFinish?: TNoopFunction, // form.submit的回调
    initialValues?: TNoopObject,
    onReset?: TNoopFunction, // 重置回调
    onSearch?: TNoopFunction, // 搜索调用form.submit()回调
    meta?: IFormSchemaMetaItem[],
}

export interface IFormRender {
    form?: FormInstance,
    schema?: IFormSchema
}

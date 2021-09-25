function pickProps(source: Record<string, any>, props: string[]) {
    const target = {};
    props.forEach((propName) => {
        if (Object.prototype.hasOwnProperty.call(source, propName)) {
            target[propName] = source[propName];
        }
    });
    return target;
}

const FormPropsPickArray = [
    'style',
    'colon',
    'component',
    'fields',
    'initialValues',
    'labelAlign',
    // 'labelCol',
    'layout',
    'name',
    'preserve',
    'requiredMark',
    'scrollToFirstError',
    'size',
    'validateMessages',
    'validateTrigger',
    // 'wrapperCol',
    'onFieldsChange',
    'onFinish',
    'onFinishFailed',
    'onValuesChange',
];
const FormItemPropsPickArray = [
    'style',
    'colon',
    'dependencies',
    'extra',
    'getValueFromEvent',
    'getValueProps',
    'hasFeedback',
    'help',
    'hidden',
    'htmlFor',
    'initialValue',
    'label',
    'labelAlign',
    'labelCol',
    'messageVariables',
    'name',
    'normalize',
    'noStyle',
    'preserve',
    // 'required',
    // 'rules',
    'shouldUpdate',
    'tooltip',
    'trigger',
    'validateFirst',
    'validateStatus',
    'validateTrigger',
    'valuePropName',
    'wrapperCol',
];

const getArray = (arr: any, defaultValue = []) => {
    if (Array.isArray(arr)) return arr;
    return defaultValue;
};

const isFunction = (val: any) => {
    if (typeof val === 'function') {
        return true;
    }
    return false;
};

export {
    pickProps,
    FormPropsPickArray,
    FormItemPropsPickArray,
    getArray,
    isFunction,
};
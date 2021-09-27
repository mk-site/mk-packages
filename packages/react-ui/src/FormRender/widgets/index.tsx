import { Input, Rate } from 'antd';

// 组件列表

const widgets = {
    Input,
    Rate,
};
export const setWidgets = (key: string, val: any) => {
    widgets[key] = val;
};
export default widgets;

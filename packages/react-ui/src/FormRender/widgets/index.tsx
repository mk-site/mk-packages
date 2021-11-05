import {
    Input, Rate, InputNumber, Switch, Slider,
} from 'antd';
import { createBaseWidget } from './createWidget';
import CheckboxGroup from './antd/Checkbox';
import Radio from './antd/Radio';
import Select, { MultiSelect } from './antd/Select';
import UrlInput from './antd/UrlInput';
import Color from './antd/Color';
import TimePicker from './antd/TimePicker';
import DatePicker from './antd/DatePicker';
import DateRangePicker from './antd/DateRangePicker';
import CheckSingle from './antd/CheckSingle';
import Cascader from './antd/Cascader';

import 'antd/es/input/style/index';
import 'antd/es/Rate/style/index';
import 'antd/es/input-number/style/index';
import 'antd/es/switch/style/index';

// 组件列表

const widgets = {
    Input: createBaseWidget()(Input),
    TextArea: createBaseWidget(({ autoSize }) => ({
        autoSize: autoSize || { minRows: 3 },
    }))(Input.TextArea),
    InputNumber: createBaseWidget(({ style }) => ({ style: { width: '100%', ...style } }))(InputNumber),
    Checkbox: CheckSingle,
    Rate: createBaseWidget()(Rate),
    Slider: createBaseWidget()(Slider),
    Switch: createBaseWidget()(Switch),
    CheckboxGroup,
    DatePicker,
    DateRangePicker,
    TimePicker,
    Select,
    MultiSelect,
    Radio,
    Color,
    UrlInput,
    Cascader,
};
export const setWidgets = (key: string, val: any) => {
    widgets[key] = val;
};
export default widgets;

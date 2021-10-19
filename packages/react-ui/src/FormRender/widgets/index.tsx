import {
    Input, Rate, Checkbox, InputNumber, Switch,
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

// 组件列表

const widgets = {
    Input: createBaseWidget()(Input),
    TextArea: createBaseWidget(({ autoSize }) => ({
        autoSize: autoSize || { minRows: 3 },
    }))(Input.TextArea),
    InputNumber: createBaseWidget(({ style }) => ({ style: { width: '100%', ...style } }))(InputNumber),
    Checkbox: createBaseWidget(({ widgetsProps }) => {
        // eslint-disable-next-line no-param-reassign
        delete widgetsProps.value;
        return {};
    })(Checkbox),
    Rate: createBaseWidget()(Rate),
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
};
export const setWidgets = (key: string, val: any) => {
    widgets[key] = val;
};
export default widgets;

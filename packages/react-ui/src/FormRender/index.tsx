/* eslint-disable react/no-array-index-key */
import React, {
    ReactElement,
    useMemo,
    memo,
} from 'react';
import {
    Form, FormProps, Row, Col,
} from 'antd';
import 'antd/lib/form/style/css';
import { setWidgets } from './widgets';
import { IFormRender, TNoopObject } from './types';
import { FormPropsPickArray, pickProps } from './helper';
import RenderElement from './renderElement';
import usePersistFn from '../hooks/usePersistFn';

export * from './types';

const FormRender: React.FC<IFormRender> = memo((props) => {
    const { schema } = props;
    const [form] = props.form ? useMemo(() => [props.form], [props.form]) : Form.useForm();
    const {
        column = 1,
        meta,
        gutter = 0,
    } = schema;
    if (!meta) {
        return null;
    }
    const formProps: FormProps = {
        ...pickProps(schema, FormPropsPickArray),
        ...(schema.props || {}),
    };
    const renderRowLayout = usePersistFn((elements) => {
        if (column === 1) {
            return elements;
        }
        // eslint-disable-next-line no-param-reassign
        elements = elements.filter(Boolean); // 过滤不渲染的元素
        const rows: ReactElement[] = [];
        const colospan = 24 / column;
        for (let i = 0; i < elements.length; i += column) {
            const cols: ReactElement[] = [];
            for (let j = 0; j < column; j += 1) {
                cols.push(
                    <Col key={j} span={colospan} {...(schema.ColProps || {})}>
                        {elements[i + j] as any}
                    </Col>,
                );
            }
            rows.push(
                <Row key={i} gutter={gutter} {...(schema.RowProps || {})}>
                    {cols}
                </Row>,
            );
        }
        return rows;
    });
    if (schema.debug) {
        console.log('schema => ', schema, '\n', ' form => ', form);
    }
    return (
        <Form
            {...formProps}
            form={form}
            onFinish={schema?.onFinish}
            onValuesChange={schema?.onValuesChange}
            onFinishFailed={schema?.onFinishFailed}
            onFieldsChange={schema?.onFieldsChange}
        >
            {
                renderRowLayout(meta.map((element, index) => {
                    const key = element.key || element.name || index;
                    const ElementEl = <RenderElement form={form} element={element} schema={schema} />;
                    if (element.display) {
                        return (
                            <div key={key} style={{ display: element.display }}>
                                {ElementEl}
                            </div>
                        );
                    }
                    if (Object.prototype.hasOwnProperty.call(element, 'visible')) {
                        if (element.visible) {
                            return (
                                <React.Fragment key={index}>
                                    {ElementEl}
                                </React.Fragment>
                            );
                        }
                        return null;
                    }

                    return (
                        <React.Fragment key={key}>
                            {ElementEl}
                        </React.Fragment>
                    );
                }))
            }
        </Form>
    );
});

// 设置全局组件
const FormRenderSetGlobalWidgets = (widget: TNoopObject) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const key in widget) {
        if (Object.prototype.hasOwnProperty.call(widget, key)) {
            setWidgets(key, widget[key]);
        }
    }
};

export {
    FormRender,
    FormRenderSetGlobalWidgets,
};

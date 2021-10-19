/* eslint-disable react/no-array-index-key */
import React, {
    ReactElement,
    useMemo,
    memo,
    useEffect,
} from 'react';
import {
    Form, FormProps, Row, Col,
} from 'antd';
import 'antd/lib/form/style/css';
import { setWidgets } from './widgets';
import { IFormRender, TNoopObject } from './types';
import { FormPropsPickArray, pickProps, hasOwnProperty } from './helper';
import RenderElement from './renderElement';
import usePersistFn from '../hooks/usePersistFn';
import { createBaseWidget } from './widgets/createWidget';

export * from './types';

const FormRender: React.FC<IFormRender> = memo((props) => {
    const {
        schema, onSearch, onFinish, onFinishFailed, onFieldsChange, onValuesChange,
    } = props;
    const [form] = props.form ? useMemo(() => [props.form], [props.form]) : Form.useForm();
    const {
        column = 1,
        meta,
        gutter = 0,
    } = schema;
    if (!meta) {
        console.warn('未配置schema meta');
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
        const colspan = 24 / column;
        for (let i = 0; i < elements.length; i += column) {
            const cols: ReactElement[] = [];
            for (let j = 0; j < column; j += 1) {
                cols.push(
                    <Col key={j} span={colspan} {...(schema.ColProps || {})}>
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
    // 销毁重置字段
    useEffect(() => {
        // 表单初始化回调，可设置表单字段默认值等
        if (typeof schema.onMount === 'function') {
            schema.onMount({ form });
        }
        return () => {
            form.resetFields();
        };
    }, []);
    return (
        <Form
            {...formProps}
            form={form}
            onFinish={onFinish || schema?.onFinish}
            onValuesChange={onValuesChange || schema?.onValuesChange}
            onFinishFailed={onFinishFailed || schema?.onFinishFailed}
            onFieldsChange={onFieldsChange || schema?.onFieldsChange}
        >
            {
                renderRowLayout(meta.map((element, index) => {
                    const key = element.key || element.name || index;
                    const ElementEl = <RenderElement onSearch={onSearch} form={form} element={element} schema={schema} />;
                    if (element.display) {
                        return (
                            <div key={key} style={{ display: element.display }}>
                                {ElementEl}
                            </div>
                        );
                    }
                    if (hasOwnProperty(element, 'visible')) {
                        if (element.visible) {
                            return (
                                <React.Fragment key={key}>
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
        if (hasOwnProperty(widget, key)) {
            setWidgets(key, widget[key]);
        }
    }
};

export {
    createBaseWidget,
    FormRender,
    FormRenderSetGlobalWidgets,
};

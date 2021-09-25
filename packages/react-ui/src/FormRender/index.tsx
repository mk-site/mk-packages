/* eslint-disable react/no-array-index-key */
import React, { ReactElement } from 'react';
import {
    Form, FormProps, Row, Col,
} from 'antd';
import 'antd/lib/form/style/css';
import { IFormRender } from './types';
import { FormPropsPickArray, pickProps } from './helper';
import renderElement from './renderElement';
import usePersistFn from '../hooks/usePersistFn';

export * from './types';

const FormRender: React.FC<IFormRender> = (props) => {
    const { schema } = props;
    const [form] = [props.form] || Form.useForm();
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
                    return <React.Fragment key={key}>{renderElement(form, element, schema)}</React.Fragment>;
                }))
            }
        </Form>
    );
};

export {
    FormRender,
};

export default FormRender;

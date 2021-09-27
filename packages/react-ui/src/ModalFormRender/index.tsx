// 模态框加入form表单
import React, { useImperativeHandle } from 'react';
import { Form, FormInstance } from 'antd';
import { FormRender, IFormSchema } from '../FormRender';
import useModal, { IUseModal } from '../hooks/useModal';

export interface IModalFormRender<T, K> {
    show: (childData?: T, modalData?: K) => () => void,
    hide: () => void,
    visible: boolean,
    RenderModal: any,
    form: FormInstance,
    customref: {
        current: any
    }
}

export interface IModalFormRenderProps {
    schema?: IFormSchema,
    modalRef?: any,
    beforeChildren?: any,
}

// 组件用法
const ModalFormRender: React.FC<IModalFormRenderProps> = ({
    schema, modalRef, children, beforeChildren,
}) => {
    const { RenderModal, ...rest } = useModal({});
    const [form] = Form.useForm();
    useImperativeHandle(modalRef, () => ({
        ...rest,
        form,
    }));
    return (
        <RenderModal>
            <>
                {beforeChildren}
                <FormRender form={form} schema={schema} />
                {children}
            </>
        </RenderModal>
    );
};

const ModalFormRenderBtn = () => {};

// hooks用法
function useModalFormRender<T= any, K = IUseModal>(props: IModalFormRenderProps): IModalFormRender<T, K> {
    const { schema } = props;
    const { RenderModal, ...rest } = useModal({});
    const [form] = Form.useForm();
    const ModalComp = () => (
        <RenderModal>
            <FormRender form={form} schema={schema} />
        </RenderModal>
    );
    return {
        ...rest,
        form,
        RenderModal: ModalComp,
    };
}

export {
    ModalFormRender,
    ModalFormRenderBtn,
    useModalFormRender,
};

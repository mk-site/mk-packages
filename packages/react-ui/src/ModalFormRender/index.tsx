// 模态框加入form表单
import React, { useImperativeHandle } from 'react';
import { Form, FormInstance } from 'antd';
import { FormRender, IFormSchema } from '../FormRender';
import useModal, { IUseModal } from '../hooks/useModal';
import usePersistFn from '../hooks/usePersistFn';

export interface IModalFormRender<T, K> {
    show: (modalData?: K, childData?: T) => () => void,
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
/**
 * 组件用法，使用ref获取组件实例
 */
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
            {
                (childProps) => (
                    <>
                        {beforeChildren}
                        <FormRender form={form} schema={schema} {...childProps} />
                        {children}
                    </>
                )
            }
        </RenderModal>
    );
};

/**
 * 推荐使用  hooks用法
 */
function useModalFormRender<T= any, K = IUseModal>(props: IModalFormRenderProps): IModalFormRender<T, K> {
    const { schema } = props;
    const { RenderModal, ...rest } = useModal({});
    const [form] = Form.useForm();
    const ModalComp = usePersistFn((modalProps?: any) => {
        // eslint-disable-next-line no-shadow
        const { children, beforeChildren } = modalProps || {};
        return (
            <RenderModal>
                {
                    (childProps) => (
                        <>
                            {beforeChildren}
                            <FormRender form={form} schema={schema} {...childProps} />
                            {children}
                        </>
                    )
                }
            </RenderModal>
        );
    });
    return {
        ...rest,
        form,
        RenderModal: ModalComp,
    };
}

export {
    ModalFormRender,
    useModalFormRender,
};

import React, { useState, useCallback, useRef } from 'react';
import { Modal } from 'antd';
import { ModalProps } from 'antd/es/modal';
import useImmutable from '../useImmutable';
import 'antd/lib/modal/style/css';

export interface IUseModal extends ModalProps {}

export interface IuseModalReturn<T, K> {
    show: (modalData?: K, childData?: T) => () => void,
    hide: () => void,
    visible: boolean,
    RenderModal: any,
    customref: {
        current: any
    }
}

function useModal<T = any, K = IUseModal>(options: IUseModal = {}):IuseModalReturn<T, K> {
    const [visible, setVisible] = useState(false);
    const childRef = useRef<T>(null);

    const optionsRef = useRef(options);
    optionsRef.current = options;

    const modalDataRef = useRef({});

    const visibleRef = useRef(visible);
    visibleRef.current = visible;

    const customref = useRef();

    const hide = useCallback(() => setVisible(false), []);

    const show = useCallback((modalData?: K, childData?: T) => {
        childRef.current = childData || {} as T;
        modalDataRef.current = modalData || {};
        setVisible(true);
        return hide;
    }, []);

    const RenderModal = useImmutable(({ children, ...rest }) => {
        if (!visibleRef.current) {
            return null;
        }
        const props = {
            destroyOnClose: true,
            onCancel: hide,
            onOk: hide,
            cancelText: '取消',
            onText: '确定',
            keyboard: false,
            maskClosable: false,
            visible: visibleRef.current,
            ...rest,
            ...optionsRef.current,
            ...modalDataRef.current,
        };
        // 自定注入customRef
        if (props.footer && typeof props.footer !== 'string') {
            props.footer = React.cloneElement(props.footer as any, {
                customref,
            });
        }
        // 自定注入customRef
        if (props.title && typeof props.title !== 'string') {
            props.title = React.cloneElement(props.title as any, {
                customref,
            });
        }
        const childProps = {
            ...(childRef.current || {}),
            customref,
        };
        let node;
        if (typeof children === 'string') {
            node = children;
        } else if (typeof children === 'function') {
            node = children(childProps);
        } else {
            node = React.cloneElement(children, childProps);
        }
        return (
            <Modal
                {...props}
            >
                {node}
            </Modal>
        );
    });

    return {
        hide,
        show,
        visible,
        RenderModal,
        customref,
    };
}

export default useModal;

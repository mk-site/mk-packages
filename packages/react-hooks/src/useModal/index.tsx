import React, { useState, useCallback, useRef } from 'react';
import { Modal } from 'antd';
import { ModalProps } from 'antd/es/modal';
import useImmutable from '../useImmutable';
import 'antd/lib/modal/style/css';

interface UseMdoal extends ModalProps {}

function useModal<T = any>(options: UseMdoal = {}) {
  const [visible, setVisible] = useState(false);
  const dataRef = useRef<T>(null);

  const propsRef = useRef(options);
  propsRef.current = options;
  const visibleRef = useRef(visible);
  visibleRef.current = visible;

  const show = useCallback((data?: T) => {
    dataRef.current = data;
    setVisible(true);
  }, []);

  const hide = useCallback(() => setVisible(false), []);

  const RenderModal = useImmutable(({ children, ...rest }) => {
    const props = {
      destroyOnClose: true,
      onCancel: hide,
      onOk: hide,
      visible: visibleRef.current,
      ...rest,
      ...propsRef.current
    };
    const node =
      typeof children === 'function'
        ? children(dataRef.current || {})
        : React.cloneElement(children, dataRef.current || {});
    return <Modal {...props}>{node}</Modal>;
  });

  return {
    hide,
    show,
    visible,
    RenderModal
  };
}

export function createUseComponent<T = any, P = any>(
  WrappedComponent: React.ComponentType<
    T & {
      customRef: React.MutableRefObject<P | undefined>;
    }
  >
) {
  return (modalOptions: ModalProps = {}) =>
    (options: ModalProps = {}) => {
      const { RenderModal, ...rest } = useModal(options);
      const ref = useRef<P>();

      const Render = useImmutable((data: T) => {
        const WrappedComponentProps = {
          ...data,
          customRef: ref
        };
        return (
          <RenderModal {...modalOptions}>
            <WrappedComponent {...WrappedComponentProps} />
          </RenderModal>
        );
      });

      return { ...rest, Render, ref };
    };
}

export default useModal;

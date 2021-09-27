import React, {
    useMemo, useRef, useCallback, useState,
} from 'react';
import { Button } from 'antd';
import { useModalFormRender, ModalFormRender, IFormSchema } from './index';

export default () => {
    const modalRef = useRef(null);
    const [required, setRequired] = useState(false);
    const schema: IFormSchema = useMemo(() => ({
        meta: [
            {
                type: 'Input',
                name: 'userName',
                label: '用户名',
                required,
            },
        ],
    }), [required]);
    const modal = useModalFormRender({ schema });
    const onClick = useCallback(() => {
        console.log(modal.show({
            title: '标题',
            onOk() {
                modal.form.submit();
            },
        }, {}));
    }, []);

    const onClickComp = useCallback(() => {
        console.log(modalRef.current);
        modalRef.current.show({
            title: '标题',
            onOk() {
                modalRef.current.form.submit();
            },
        }, {});
    }, []);
    return (
        <div>
            <Button onClick={onClick} style={{ marginRight: 15 }}>打开弹框(hooks用法)</Button>
            <modal.RenderModal />
            <Button onClick={onClickComp}>打开弹框(组件用法)</Button>
            <ModalFormRender schema={schema} modalRef={modalRef}>
                <Button onClick={() => setRequired(!required)}>必填非必填切换</Button>
            </ModalFormRender>
        </div>
    );
};

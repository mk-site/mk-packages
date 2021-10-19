import React, {
    useMemo, useRef, useCallback, useState,
} from 'react';
import { Button } from 'antd';
import { useModalFormRender, ModalFormRender, IFormSchema } from './index';

export default () => {
    const modalRef = useRef(null);
    const [required, setRequired] = useState(false);
    const schema: IFormSchema = useMemo(() => ({
        // onFinish(val) {
        //     console.log('调用', val);
        // },
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
    const onClickHooks = useCallback(() => {
        modal.show({
            title: '标题',
            onOk() {
                console.log('点击');
                modal.form.submit();
            },
        }, {
            a: 1,
            b: 2,
            onFinish(val) {
                console.log('调用22', val);
            },
        });
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
            <Button onClick={onClickHooks} style={{ marginRight: 15 }}>打开弹框(hooks用法)</Button>
            <modal.RenderModal />
            <Button onClick={onClickComp}>打开弹框(组件用法)</Button>
            <ModalFormRender schema={schema} modalRef={modalRef}>
                <Button onClick={() => setRequired(!required)}>必填非必填切换</Button>
            </ModalFormRender>
        </div>
    );
};

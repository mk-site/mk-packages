import React, { useImperativeHandle} from 'react';
import { Button } from 'antd';
import { usePersistFn, useModal } from 'mk-react-hooks';
// import useModal from '../index';

const Child = (props) => {
    console.log('子组件', props);
    useImperativeHandle(props.customref, () => {
        return {
            childab: 'child send data'
        }
    });
    return (
        <div>child 组件</div>
    );
}

const Footer = (props) => {
    console.log('footer', props);
    return (
        <Button type="primary" onClick={() => {
            console.log('获取child组件的数据', props.customref)
        }}>获取child组件的数据</Button>
    );
}


export default () => {
    const modal = useModal({
        title: <div>标题来了</div>,
        footer: <Footer test={123} data={{a: 1}}></Footer>
    }, true);
    const { RenderModal } = modal;

    const clickOpen = usePersistFn(() => {
        let close = modal.show({ a: 123 }, {
            afterClose() {
                console.log('关闭回调');
            },
            onOk() {
                console.log('点击确定');
                close();
                close = null;
            }
        });
    });

    return (
        <>
            <Button type="primary" onClick={clickOpen} >Open Modal</Button>
            <RenderModal>
                <Child />
            </RenderModal>
        </>
    );
};

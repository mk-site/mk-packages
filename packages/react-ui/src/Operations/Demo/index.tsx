import React, { useState } from 'react';
import { Operations } from 'mk-react-ui';
import Button from 'antd/lib/button';
import Popconfirm from 'antd/lib/popconfirm';
import 'antd/lib/button/style';
import 'antd/lib/popconfirm/style';

export default () => {
    const [layout, setLayout] = useState<'horizontal' |'vertical'>('horizontal');
    return (
        <div>
            <Button style={{ marginBottom: 20 }} onClick={() => setLayout(layout === 'vertical' ? 'horizontal' : 'vertical')}>
                {layout === 'vertical' ? 'horizontal' : 'vertical'}
            </Button>
            <Operations
                layout={layout}
                meta={[
                    { text: '查看', action() { console.log('查看'); } },
                    { text: '编辑', action() { console.log('编辑'); } },
                    {
                        text: '删除',
                        render(children) {
                            return (
                                <Popconfirm
                                    key="删除"
                                    title="确定删除吗?"
                                    onConfirm={() => console.log('删除')}
                                >
                                    {children}
                                </Popconfirm>
                            );
                        },
                    },
                ]}
            />
        </div>
    );
};

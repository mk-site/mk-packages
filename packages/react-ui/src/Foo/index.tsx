import React from 'react';

type TFoo = {
    onClick?: (...args: any[]) => any
}

const Foo: React.FC<TFoo> = (props) => (
    <>
        <h1 onClick={props?.onClick}>
            Foo组件
        </h1>
    </>
);

export default Foo;

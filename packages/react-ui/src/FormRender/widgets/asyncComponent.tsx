import React from 'react';

const asyncComponent = (importComponent) => React.forwardRef((props, ref) => {
    const [Comp, setComp] = React.useState(null);
    React.useEffect(() => {
        importComponent()
            .then((cmp) => {
                setComp(cmp.default);
            });
    }, []);
    return Comp ? <Comp ref={ref} {...props} /> : null;
});

export {
    asyncComponent,
};

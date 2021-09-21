import React, { useRef } from 'react';
import { useSize } from 'mk-react-hooks';

export default () => {
    const ref = useRef();
    const size = useSize(ref);
    return (
        <div ref={ref}>
            try to resize the preview window
            {' '}
            <br />
            dimensions -- width:
            {' '}
            {size.width}
            {' '}
            px, height:
            {' '}
            {size.height}
            {' '}
            px
        </div>
    );
};

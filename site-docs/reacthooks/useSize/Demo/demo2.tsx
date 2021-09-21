import React from 'react';
import { useSize } from 'mk-react-hooks';

export default () => {
    const dom = document.querySelector('body');
    const size = useSize(dom);
    return (
        <div>
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

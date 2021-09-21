import React, { useEffect } from 'react';
import { useDocumentShowEffect } from 'mk-react-hooks';

export default () => {
    useDocumentShowEffect(() => {
        console.log('页签激活回调');
    });
};

import React from 'react';
import { ButtonList, IButtonListItem } from 'mk-react-ui';

export default () => {
    const btnMeta: IButtonListItem[] = [
        {
            text: '驳回',
            visible: true,
            disabled: false,
            onClick: () => {
                console.log('驳回');
            },
        },
        {
            text: '审核',
            type: 'primary',
            visible: true,
            disabled: false,
            onClick: () => {
                console.log('审核');
            },
        },
    ];
    return (
        <div>
            <ButtonList
                meta={btnMeta}
            />
        </div>
    );
};

import React, { ReactElement } from 'react';
import './index.css';

interface Operation {
    text: string;
    action?: (...args: any[]) => void;
    visible?: boolean;
    disable?: boolean;
    style?: React.CSSProperties;
    render?: (children: ReactElement, item: Operation) => ReactElement;
}

const Operations = ({ meta, className, layout }: { className?: string; layout?: 'horizontal' | 'vertical'; meta: Array<Operation> }) => (
    <div className={`${className} site-hook-operation-list`}>
        {
            meta
                .filter((item) => item.visible !== false)
                .map((item, index) => {
                    const {
                        text, action, render, disable = false, style = {},
                    } = item;

                    const children = (
                        <span
                            role="button"
                            tabIndex={index}
                            key={text}
                            style={style}
                            onClick={() => action?.()}
                            onKeyPress={() => action?.()}
                            className={`item ${layout} ${disable ? 'disabled' : ''}`}
                        >
                            {text}
                        </span>
                    );

                    if (typeof render === 'function') {
                        return render(children, item);
                    }
                    return children;
                })
        }
    </div>
);

Operations.defaultProps = {
    className: '',
    layout: 'horizontal',
};

export default Operations;

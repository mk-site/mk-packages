/* eslint-disable react/no-array-index-key */
import React, { ReactElement } from 'react';
import './index.css';

interface Operation {
    text: string | ReactElement | React.ReactNode;
    action?: (...args: any[]) => void;
    visible?: boolean;
    onVisible?: (...args: any[]) => void;
    disabled?: boolean;
    style?: React.CSSProperties;
    render?: (children: ReactElement, item: Operation) => ReactElement;
}

const Operations = ({ meta, className, layout }: { className?: string; layout?: 'horizontal' | 'vertical'; meta: Array<Operation> }) => (
    <div className={`${className} site-hook-operation-list`}>
        {
            meta
                .filter((item) => item.visible || (typeof item.onVisible === 'function' && item.onVisible()))
                .map((item, index) => {
                    const {
                        text, action, render, disabled = false, style = {},
                    } = item;

                    const children = (
                        <span
                            role="button"
                            tabIndex={index}
                            key={index}
                            style={style}
                            onClick={() => {
                                if (disabled) {
                                    return;
                                }
                                action?.();
                            }}
                            className={`item ${layout} ${disabled ? 'disabled' : ''}`}
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

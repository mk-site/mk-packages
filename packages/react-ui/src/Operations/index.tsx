/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
import React, { ReactElement } from 'react';
import './index.css';

export interface IOperationItem {
    text: string | ReactElement | React.ReactNode;
    action?: (...args: any[]) => void;
    visible?: boolean;
    onVisible?: (...args: any[]) => boolean;
    disabled?: boolean;
    style?: React.CSSProperties;
    className?: string,
    render?: (children: ReactElement, item: IOperationItem) => ReactElement;
}

const Operations = (props:
    { className?: string; style?:React.CSSProperties, layout?: 'horizontal' | 'vertical'; meta: Array<IOperationItem> }) => {
    const { meta, layout } = props;
    return (
        <div
            className={`${props.className}`}
            style={props.style}
        >
            {
                meta
                    .filter((item) => {
                        if (typeof item.onVisible === 'function') {
                            return item.onVisible(item);
                        }
                        if (Object.prototype.hasOwnProperty.call(item, 'visible')) {
                            return item.visible;
                        }
                        return true;
                    })
                    .map((item, index) => {
                        const {
                            text, action, render, disabled = false, style = {}, className = '',
                        } = item;

                        const children = (
                            <span
                                key={index}
                                style={style}
                                onClick={() => {
                                    if (disabled) {
                                        return;
                                    }
                                    action?.();
                                }}
                                className={`mk-operation-list-item ${layout} ${className} ${disabled ? 'disabled' : ''}`}
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
};

Operations.defaultProps = {
    className: '',
    layout: 'horizontal',
    style: {},
};

export default Operations;

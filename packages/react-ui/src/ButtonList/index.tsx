/* eslint-disable react/no-array-index-key */
import React, { ReactElement } from 'react';
import { Button, ButtonProps } from 'antd';

// 按钮列表

export interface IButtonListItem extends ButtonProps {
    text: string | ReactElement | React.ReactNode;
    onClick?: (...args: any[]) => void;
    visible?: boolean;
    onVisible?: (...args: any[]) => void;
    disabled?: boolean;
    style?: React.CSSProperties;
    render?: (children: ReactElement, item: IButtonListItem) => ReactElement;
}
const hasOwnProperty = (obj: Record<string, any>, key: string) => Object.prototype.hasOwnProperty.call(obj, key);

const ButtonList = (props: { className?: string; meta: IButtonListItem[]; style?:React.CSSProperties; }) => {
    const { meta, className } = props;
    return (
        <div className={`${className}`} style={props.style}>
            {
                meta
                    .filter((item) => {
                        if (hasOwnProperty(item, 'visible')) {
                            return item.visible;
                        }
                        if (typeof item.onVisible === 'function') {
                            return item.onVisible(item);
                        }
                        return true;
                    })
                    .map((item, index) => {
                        const {
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                            text, onClick, render, visible, onVisible, disabled = false, style, ...rest
                        } = item;

                        const children = (
                            <Button
                                disabled={disabled}
                                key={index}
                                style={{
                                    marginRight: 5,
                                    marginLeft: 5,
                                    ...(style || {}),
                                }}
                                {...(rest)}
                                onClick={() => {
                                    if (disabled) {
                                        return;
                                    }
                                    onClick?.();
                                }}
                            >
                                {text}
                            </Button>
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

ButtonList.defaultProps = {
    className: '',
    style: {},
};

export {
    ButtonList,
};

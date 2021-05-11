import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Spinner } from 'components';

import styles from './styles.module.scss';

const Button = forwardRef(({ id, title, type, component: Component, ...props }, ref) => {
    const {
        disabled, className, titleClassName, onClick, icon,
        isPending, testid, form, disabledClassName, loaderClassName, ...rest
    } = props;

    const getTitle = () => (
        <div className={titleClassName}>
            <span>{title}</span>
            {icon && icon}
        </div>
    );

    return (
        <Component
            ref={ref}
            id={id}
            type={type}
            disabled={disabled || isPending}
            className={classNames(
                styles.button,
                { [styles.disabled]: disabled },
                className,
                disabled ? disabledClassName : '',
            )}
            onClick={onClick}
            form={form}
            testid={testid}
            {...rest}
        >
            {isPending ? <Spinner loaderClassName={classNames(styles.loader, loaderClassName)} /> : getTitle()}
        </Component>
    );
});

Button.propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    loaderClassName: PropTypes.string,
    disabledClassName: PropTypes.string,
    titleClassName: PropTypes.string,
    title: PropTypes.string.isRequired,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    isPending: PropTypes.bool,
    icon: PropTypes.node,
    testid: PropTypes.string,
    form: PropTypes.string,
    component: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
};

Button.defaultProps = {
    component: 'button',
    className: '',
    loaderClassName: '',
    disabledClassName: '',
    titleClassName: '',
    id: undefined,
    type: 'button',
    disabled: false,
    onClick: () => {},
    isPending: false,
    icon: undefined,
    testid: undefined,
    form: undefined,
};

export default Button;

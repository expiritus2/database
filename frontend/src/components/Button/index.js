import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Spinner } from 'components';

import styles from './styles.module.scss';

const Button = (props) => {
    const { id, title, type, disabled, className, titleClassName, onClick, icon, isPending, testid, form } = props;

    const getTitle = () => (
        <div className={titleClassName}>
            <span>{title}</span>
            {icon && icon}
        </div>
    );
    return (
        <button
            id={id}
            type={type}
            disabled={disabled || isPending}
            className={classNames(styles.button, { [styles.disabled]: disabled }, className)}
            onClick={onClick}
            form={form}
            testid={testid}
        >
            {isPending ? <Spinner loaderClassName={styles.loader} /> : getTitle()}
        </button>
    );
};

Button.propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    titleClassName: PropTypes.string,
    title: PropTypes.string.isRequired,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    isPending: PropTypes.bool,
    icon: PropTypes.node,
    testid: PropTypes.string,
    form: PropTypes.string,
};

Button.defaultProps = {
    className: '',
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

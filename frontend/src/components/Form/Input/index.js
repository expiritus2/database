import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TextField from '@material-ui/core/TextField';

import styles from './styles.module.scss';

const Input = (props) => {
    const { variant, className, value, type, size, ...otherProps } = props;

    return (
        <TextField
            type={type}
            className={classNames(styles.input, className)}
            value={value}
            variant={variant}
            size={size}
            autoComplete="off"
            {...otherProps}
        />
    );
};

Input.propTypes = {
    className: PropTypes.string,
    variant: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    size: PropTypes.string,
};

Input.defaultProps = {
    className: '',
    variant: 'outlined',
    type: 'text',
    value: '',
    size: 'small',
};

export default Input;

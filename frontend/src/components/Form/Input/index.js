import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TextField from '@material-ui/core/TextField';
import { formatNumber } from 'helpers';

import styles from './styles.module.scss';

const Input = (props) => {
    const { variant, className, isNumberFormat, value, type, size, ...otherProps } = props;

    const getValue = () => {
        if (type === 'number' && value) {
            return formatNumber(value);
        }

        return value;
    };

    return (
        <TextField
            className={classNames(styles.input, className)}
            value={getValue()}
            variant={variant}
            size={size}
            {...otherProps}
        />
    );
};

Input.propTypes = {
    className: PropTypes.string,
    variant: PropTypes.string,
    type: PropTypes.string,
    isNumberFormat: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    size: PropTypes.string,
};

Input.defaultProps = {
    className: '',
    variant: 'outlined',
    type: 'text',
    isNumberFormat: false,
    value: '',
    size: 'small',
};

export default Input;

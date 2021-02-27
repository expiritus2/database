import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import TextField from '@material-ui/core/TextField';

import styles from './styles.module.scss';

const Input = (props) => {
    const { variant, className, ...otherProps } = props;
    return (
        <TextField className={classNames(styles.input, className)} variant={variant} {...otherProps} />
    );
};

Input.propTypes = {
    className: PropTypes.string,
    variant: PropTypes.string,
};

Input.defaultProps = {
    className: '',
    variant: 'standard',
};

export default Input;

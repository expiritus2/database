import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import NumberFormat from 'react-number-format';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import { Input } from 'components';

import styles from './styles.module.scss';

const NumberInput = (props) => {
    const { className, label, inputClassName, thousandSeparator, value, onChange, ...otherProps } = props;
    const [focus, setFocus] = useState(false);

    return (
        <FormControl className={classNames(styles.formControl, className)}>
            <InputLabel
                className={classNames(styles.label, { [styles.focus]: focus || !!value })}
                variant="outlined"
                color="primary"
                shrink={focus || !!value}
                focused={focus}
            >
                {label}
            </InputLabel>
            <NumberFormat
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                thousandSeparator={thousandSeparator}
                className={classNames(styles.input, inputClassName)}
                customInput={Input}
                value={value}
                onChange={onChange}
                {...otherProps}
            />
        </FormControl>
    );
};

NumberInput.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    inputClassName: PropTypes.string,
    thousandSeparator: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
};

NumberInput.defaultProps = {
    className: '',
    label: '',
    inputClassName: '',
    thousandSeparator: true,
    value: '',
    onChange: () => {},
};

export default NumberInput;

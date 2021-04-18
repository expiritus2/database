import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import NumberFormat from 'react-number-format';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { Input } from 'components';

import styles from './styles.module.scss';

const NumberInput = (props) => {
    const {
        className, label, inputClassName, thousandSeparator, value, onChange, interval, allowNegative, name,
    } = props;
    const [focus, setFocus] = useState(false);

    const onPlus = () => {
        onChange(value + interval);
    };

    const onMinus = () => {
        if (!allowNegative && value <= 0) return onChange(0);
        onChange(value - interval);
    };

    const onChangeHandler = (values) => {
        const numberValue = values?.floatValue;
        onChange(numberValue);
    };

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
            <div className={styles.inputWrapper}>
                <NumberFormat
                    name={name}
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                    thousandSeparator={thousandSeparator}
                    className={classNames(styles.input, inputClassName)}
                    customInput={Input}
                    value={value}
                    onValueChange={onChangeHandler}
                    allowNegative={allowNegative}
                />
                <div className={styles.actions}>
                    <AiOutlineMinus onClick={onMinus} className={styles.minus} />
                    <AiOutlinePlus onClick={onPlus} className={styles.plus} />
                </div>
            </div>
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
    interval: PropTypes.number,
    name: PropTypes.string,
    allowNegative: PropTypes.bool,
};

NumberInput.defaultProps = {
    className: '',
    label: '',
    inputClassName: '',
    thousandSeparator: true,
    value: 0,
    onChange: () => {},
    interval: 1,
    name: undefined,
    allowNegative: false,
};

export default NumberInput;

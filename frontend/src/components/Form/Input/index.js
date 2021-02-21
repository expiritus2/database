/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import NumberFormat from 'react-number-format';

import { isFloatStr } from 'helpers';

import styles from './styles.module.scss';

const Input = (props) => {
    const { id, name, type, label, value, onChange, className, removeHandler, testid } = props;
    const { placeholder, disabled, error, variant, altLabel, icon, autofocus, classAltLabel } = props;
    const { isNumberFormat, prefix, thousandSeparator, numberFormatOptions } = props;
    const [inputValue, setInputValue] = useState(value);
    const [typeValue, setTypeValue] = useState(type);

    useEffect(() => setInputValue(value), [value]);

    const onChangeHandler = useCallback((event) => {
        const { value: inputVal } = event.target;

        if (typeValue === 'number' && !isFloatStr(inputVal) && inputVal !== '') {
            return;
        }

        setInputValue(inputVal);
        onChange(event, inputVal);
    }, [onChange, typeValue]);

    const onChangePasswordMode = () => {
        if (typeValue === 'text') {
            setTypeValue('password');
        }

        if (typeValue === 'password') {
            setTypeValue('text');
        }
    };

    return (
        <div testid="wrapper" className={classNames(styles.inputWrapper, styles[variant], className)}>
            {label && (
                <label htmlFor={id}>
                    <span>{label}</span>
                    {altLabel && <span className={classNames(styles.altLabel, classAltLabel)}>{altLabel}</span>}
                </label>
            )}
            <div className={styles.inputHolder}>
                {isNumberFormat ? (
                    <NumberFormat
                        value={inputValue}
                        prefix={prefix}
                        thousandSeparator={thousandSeparator}
                        placeholder={placeholder}
                        onValueChange={(val) => {
                            onChangeHandler({ target: { value: val.value, name } }, val.value, val);
                        }}
                        testid={testid}
                        {...numberFormatOptions}
                    />
                ) : (
                    <input
                        testid={testid}
                        id={id}
                        name={name}
                        className={type === 'search' ? styles.searchInput : ''}
                        disabled={disabled}
                        type={typeValue === 'number' ? 'text' : typeValue}
                        value={inputValue}
                        onChange={onChangeHandler}
                        placeholder={placeholder}
                        autoFocus={autofocus}
                    />
                )}
                {type === 'password' && (
                    <div
                        onClick={onChangePasswordMode}
                        className={classNames(styles.passwordIcon, styles[typeValue])}
                        // mode={typeValue === 'text' ? PasswordIcon.ON : PasswordIcon.OFF}
                    >
                        Password Icon
                    </div>
                )}
                {type === 'search' && <div>Search Icon</div>}
                {icon && icon}
                {!!removeHandler && (
                    <button className={styles.removeBtn} onClick={removeHandler} type="button">
                        <div>Remove Icon</div>
                    </button>
                )}
            </div>
            {error && <div testid="validation" className={styles.error}>{error}</div>}
        </div>
    );
};

Input.LIGHT = 'light';
Input.LIGHT_FULL = 'lightFull';
Input.FULL = 'full';

Input.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    type: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    disabled: PropTypes.bool,
    error: PropTypes.string,
    variant: PropTypes.string,
    altLabel: PropTypes.string,
    icon: PropTypes.node,
    autofocus: PropTypes.bool,
    removeHandler: PropTypes.func,
    classAltLabel: PropTypes.string,
    testid: PropTypes.string,
    isNumberFormat: PropTypes.bool,
    prefix: PropTypes.string,
    thousandSeparator: PropTypes.bool,
    numberFormatOptions: PropTypes.shape({}),
};

Input.defaultProps = {
    id: undefined,
    name: undefined,
    placeholder: undefined,
    className: '',
    classAltLabel: '',
    type: 'text',
    label: undefined,
    onChange: () => {},
    value: undefined,
    disabled: false,
    error: undefined,
    variant: Input.FULL,
    altLabel: undefined,
    icon: undefined,
    autofocus: undefined,
    removeHandler: undefined,
    testid: undefined,
    isNumberFormat: false,
    prefix: undefined,
    thousandSeparator: true,
    numberFormatOptions: {},
};

export default Input;

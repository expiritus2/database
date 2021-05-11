/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import NumberFormat from 'react-number-format';

import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineSearch } from 'react-icons/ai';
import { BiTrash } from 'react-icons/bi';
import { isFloatStr } from 'helpers';

import styles from './styles.module.scss';

const Input = (props) => {
    const { id, name, type, label, value, onChange, className, removeHandler, testid } = props;
    const { placeholder, disabled, error, variant, altLabel, icon, autofocus, classAltLabel } = props;
    const { isNumberFormat, prefix, thousandSeparator, numberFormatOptions, inputClassName } = props;
    const { inputHolderClassName, onKeyPress, onFocus, onBlur, maxNumber, minNumber } = props;
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

    const onChangePasswordMode = useCallback(() => {
        if (typeValue === 'text') {
            setTypeValue('password');
        }

        if (typeValue === 'password') {
            setTypeValue('text');
        }
    }, [typeValue]);

    const isAllowed = (values) => {
        if (!maxNumber && !minNumber) return true;

        const { value: val, floatValue } = values;

        if (val === '') return true;

        if (minNumber && maxNumber) { return floatValue >= minNumber && floatValue <= maxNumber; }
        if (minNumber) { return floatValue >= minNumber; }
        if (maxNumber) { return floatValue <= maxNumber; }
        return true;
    };

    return (
        <div testid="wrapper" className={classNames(styles.inputWrapper, styles[variant], className)}>
            {label && (
                <label htmlFor={id}>
                    <span>{label}</span>
                    {altLabel && <span className={classNames(styles.altLabel, classAltLabel)}>{altLabel}</span>}
                </label>
            )}
            <div className={classNames(styles.inputHolder, inputHolderClassName)}>
                {isNumberFormat ? (
                    <NumberFormat
                        value={inputValue}
                        prefix={prefix}
                        thousandSeparator={thousandSeparator}
                        placeholder={placeholder}
                        onValueChange={(val) => {
                            onChangeHandler({ target: { value: val.value, name } }, val.value, val);
                        }}
                        disabled={disabled}
                        testid={testid}
                        onKeyPress={onKeyPress}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        {...numberFormatOptions}
                        isAllowed={isAllowed}
                    />
                ) : (
                    <input
                        testid={testid}
                        id={id}
                        name={name}
                        className={classNames(type === 'search' ? styles.searchInput : '', inputClassName)}
                        disabled={disabled}
                        type={typeValue === 'number' ? 'text' : typeValue}
                        value={inputValue}
                        onChange={onChangeHandler}
                        placeholder={placeholder}
                        autoFocus={autofocus}
                        onKeyPress={onKeyPress}
                        onFocus={onFocus}
                        onBlur={onBlur}
                    />
                )}
                {type === 'password' && (
                    typeValue === 'text'
                        ? <AiOutlineEye onClick={onChangePasswordMode} />
                        : <AiOutlineEyeInvisible onClick={onChangePasswordMode} />
                )}
                {type === 'search' && <AiOutlineSearch className={styles.searchIcon} />}
                {icon && icon}
                {!!removeHandler && (
                    <button testid="input_remove" className={styles.removeBtn} onClick={removeHandler} type="button">
                        <BiTrash />
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
    inputHolderClassName: PropTypes.string,
    inputClassName: PropTypes.string,
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
    onKeyPress: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    maxNumber: PropTypes.number,
    minNumber: PropTypes.number,
};

Input.defaultProps = {
    id: undefined,
    name: undefined,
    placeholder: undefined,
    className: '',
    inputHolderClassName: '',
    inputClassName: '',
    classAltLabel: '',
    type: 'text',
    label: undefined,
    onChange: () => {},
    value: '',
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
    onKeyPress: () => {},
    onFocus: () => {},
    onBlur: () => {},
    maxNumber: undefined,
    minNumber: undefined,
};

export default Input;

/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState, useCallback, useEffect, forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.module.scss';

const Textarea = forwardRef((props, ref) => {
    const { id, testid, name, label, rows, value, onChange, className, disabled, variant } = props;
    const { placeholder, error, inputFieldClassName, onKeyDown, onClick, textareaStyle, autoFocus } = props;

    const [inputValue, setTextareaValue] = useState(value);

    useEffect(() => setTextareaValue(value), [value]);

    const onChangeHandler = useCallback((event) => {
        const { value: inputVal } = event.target;

        setTextareaValue(inputVal);
        onChange(event, inputVal);
    }, [onChange]);

    return (
        <div testid="wrapper" className={classNames(styles.inputWrapper, styles[variant], className)}>
            {label && <label htmlFor={id}>{label}</label>}
            <textarea
                style={textareaStyle}
                ref={ref}
                id={id}
                name={name}
                disabled={disabled}
                rows={rows}
                value={inputValue}
                className={classNames(styles.inputField, inputFieldClassName)}
                onChange={onChangeHandler}
                placeholder={placeholder}
                testid={testid}
                onKeyDown={onKeyDown}
                onClick={onClick}
                autoFocus={autoFocus}
            />
            {error && <div testid="validation" className={styles.error}>{error}</div>}
        </div>
    );
});

Textarea.LIGHT = 'light';
Textarea.LIGHT_FULL = 'lightFull';
Textarea.FULL = 'full';

Textarea.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    error: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    inputFieldClassName: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    rows: PropTypes.number,
    disabled: PropTypes.bool,
    variant: PropTypes.string,
    testid: PropTypes.string,
    onKeyDown: PropTypes.func,
    onClick: PropTypes.func,
    textareaStyle: PropTypes.shape({}),
    autoFocus: PropTypes.bool,
};

Textarea.defaultProps = {
    id: undefined,
    name: undefined,
    placeholder: undefined,
    className: '',
    inputFieldClassName: '',
    label: undefined,
    onChange: () => {},
    value: '',
    rows: 5,
    disabled: false,
    variant: Textarea.LIGHT_FULL,
    error: undefined,
    testid: undefined,
    onKeyDown: () => {},
    onClick: () => {},
    textareaStyle: undefined,
    autoFocus: false,
};

export default Textarea;

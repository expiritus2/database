import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.module.scss';

const Textarea = (props) => {
    const { id, testid, name, label, rows, value, onChange, className, disabled, variant } = props;
    const { placeholder, error } = props;

    const [inputValue, setTextareaValue] = useState(value);

    const onChangeHandler = useCallback((event) => {
        const { value: inputVal } = event.target;

        setTextareaValue(inputVal);
        onChange(event, inputVal);
    }, [onChange]);

    return (
        <div testid="wrapper" className={classNames(styles.inputWrapper, styles[variant], className)}>
            {label && <label htmlFor={id}>{label}</label>}
            <textarea
                id={id}
                name={name}
                disabled={disabled}
                rows={rows}
                value={inputValue}
                className={styles.inputField}
                onChange={onChangeHandler}
                placeholder={placeholder}
                testid={testid}
            />
            {error && <div testid="validation" className={styles.error}>{error}</div>}
        </div>
    );
};

Textarea.LIGHT = 'light';
Textarea.LIGHT_FULL = 'lightFull';
Textarea.FULL = 'full';

Textarea.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    error: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    rows: PropTypes.number,
    disabled: PropTypes.bool,
    variant: PropTypes.string,
    testid: PropTypes.string,
};

Textarea.defaultProps = {
    id: undefined,
    name: undefined,
    placeholder: undefined,
    className: '',
    label: undefined,
    onChange: () => {},
    value: '',
    rows: 5,
    disabled: false,
    variant: Textarea.FULL,
    error: undefined,
    testid: undefined,
};

export default Textarea;

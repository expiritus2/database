import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import { BiTrash } from 'react-icons/bi';

import styles from './styles.module.scss';
import './styles.scss';

const Phone = (props) => {
    const { id, testid, name, label, value, onChange, className, countryCodeEditable, removeHandler } = props;
    const { disabled, error, options, variant, placeholder } = props;
    const [inputValue, setInputValue] = useState(value);

    const onChangeHandler = useCallback((val, country) => {
        setInputValue(val);
        onChange({ target: { value: val, name } }, val, country);
    }, [onChange, name]);

    return (
        <div testid={testid} className={classNames(styles.inputWrapper, styles[variant], className)}>
            {label && <label htmlFor={id}>{label}</label>}
            <PhoneInput
                inputClass={styles.phone}
                buttonClass={styles.dropdownButton}
                enableAreaCodes
                preferredCountries={['us']}
                country="us"
                value={inputValue}
                onChange={onChangeHandler}
                disabled={disabled}
                autocompleteSearch
                placeholder={placeholder}
                countryCodeEditable={countryCodeEditable}
                disableDropdown
                {...options}
            />
            {!!removeHandler && (
                <button testid="remove_phone" className={styles.removeBtn} onClick={removeHandler} type="button">
                    <BiTrash />
                </button>
            )}
            {error && <div testid="validation" className={styles.error}>{error}</div>}
        </div>
    );
};

Phone.LIGHT = 'light';
Phone.FULL = 'full';

Phone.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    className: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func,
    removeHandler: PropTypes.func,
    value: PropTypes.string,
    disabled: PropTypes.bool,
    countryCodeEditable: PropTypes.bool,
    error: PropTypes.string,
    options: PropTypes.shape({}),
    variant: PropTypes.string,
    placeholder: PropTypes.string,
    testid: PropTypes.string,
};

Phone.defaultProps = {
    id: undefined,
    name: undefined,
    className: '',
    label: undefined,
    removeHandler: null,
    onChange: () => {},
    value: '',
    disabled: false,
    countryCodeEditable: true,
    error: undefined,
    options: {},
    variant: Phone.FULL,
    placeholder: '( _ _ _ ) _ _ _ - _ _ _ _',
    testid: undefined,
};

export default Phone;

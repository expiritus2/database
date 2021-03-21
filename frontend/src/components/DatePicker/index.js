import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import InputLabel from '@material-ui/core/InputLabel';
import Flatpickr from 'react-flatpickr';

import 'flatpickr/dist/themes/material_blue.css';
import styles from './styles.module.scss';

const DatePicker = (props) => {
    const { className, name, label, dataEnableTime, onChange, options, value, inputClassName, defaultOptions } = props;

    const [optionsValue] = useState({ ...defaultOptions, defaultDate: value, ...options });
    const [focus, setFocus] = useState(false);
    const inputRef = useRef();

    useEffect(() => {
        inputRef?.current?.node.setAttribute('autocomplete', 'off');
    }, []);

    const onChangeHandler = (date, stringValue) => {
        const fakeEvent = { target: { value: date, name } };
        onChange(fakeEvent, date, stringValue);
    };

    const isEnableTime = dataEnableTime ? { 'data-enable-time': true } : {};

    return (
        <div className={classNames(styles.datePicker, className)}>
            <InputLabel
                className={classNames(styles.label, {
                    [styles.focus]: focus || !!value || !!optionsValue?.defaultDate,
                })}
                variant="outlined"
                color="primary"
                shrink={focus || !!value || !!optionsValue?.defaultDate}
                focused={focus}
            >
                {label}
            </InputLabel>
            <Flatpickr
                {...isEnableTime}
                ref={inputRef}
                className={classNames(styles.dateInput, inputClassName)}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                name={name}
                onChange={onChangeHandler}
                options={optionsValue}
            />
        </div>
    );
};

DatePicker.propTypes = {
    className: PropTypes.string,
    inputClassName: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func,
    dataEnableTime: PropTypes.bool,
    options: PropTypes.shape({}),
    defaultOptions: PropTypes.shape({}),
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.instanceOf(Date)),
        PropTypes.number,
        PropTypes.arrayOf(PropTypes.number),
    ]),
};

DatePicker.defaultProps = {
    className: '',
    inputClassName: '',
    name: '',
    label: '',
    value: '',
    onChange: () => {},
    dataEnableTime: false,
    options: {},
    defaultOptions: {
        dateFormat: 'd M Y',
    },
};

export default DatePicker;

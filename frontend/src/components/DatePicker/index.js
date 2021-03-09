import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import InputLabel from '@material-ui/core/InputLabel';
import Flatpickr from 'react-flatpickr';

import 'flatpickr/dist/themes/material_blue.css';
import styles from './styles.module.scss';

const DatePicker = (props) => {
    const { className, name, label, value, dataEnableTime, onChange, options, inputClassName } = props;

    const [focus, setFocus] = useState(false);

    const onChangeHandler = (date, stringValue) => {
        const fakeEvent = { target: { value: date, name } };
        onChange(fakeEvent, date, stringValue);
    };

    const isEnableTime = dataEnableTime ? { 'data-enable-time': true } : {};

    return (
        <div className={classNames(styles.datePicker, className)}>
            <InputLabel
                className={classNames(styles.label, { [styles.focus]: focus || !!value })}
                variant="outlined"
                color="primary"
                shrink={focus || !!value}
                focused={focus}
            >
                {label}
            </InputLabel>
            <Flatpickr
                {...isEnableTime}
                className={classNames(styles.dateInput, inputClassName)}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                name={name}
                value={value}
                onChange={onChangeHandler}
                options={options}
            />
        </div>
    );
};

DatePicker.propTypes = {
    className: PropTypes.string,
    inputClassName: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.instanceOf(Date)), PropTypes.number]),
    onChange: PropTypes.func,
    dataEnableTime: PropTypes.bool,
    options: PropTypes.shape({}),
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
};

export default DatePicker;

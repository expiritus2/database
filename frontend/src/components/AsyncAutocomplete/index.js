import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Autocomplete } from 'components';

import { merge } from 'lodash-es';

import styles from './styles.module.scss';

const AsyncAutocomplete = (props) => {
    const { className, onChange, value, multiple, defaultValue, getThrottle, createOptions, label } = props;

    const [open, setOpen] = useState(false);
    const [optionsValue, setOptionsValue] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);

    const onInputChange = (event) => {
        const newValue = event?.target?.value;

        setInputValue(newValue);

        if (newValue) {
            setLoading(true);
            const promise = getThrottle(newValue);

            if (promise?.then) {
                getThrottle(newValue)
                    .then((response) => {
                        setOptionsValue(merge(optionsValue, createOptions(response?.data)));
                        setLoading(false);
                    }).catch(() => setLoading(false));
            }
        }
    };

    const onChangeHandler = (event, val) => {
        onChange(event, val);
        setInputValue('');
    };

    return (
        <div className={classNames(styles.wrapper, className)}>
            <Autocomplete
                multiple={multiple}
                loading={loading}
                label={label}
                options={optionsValue}
                open={open}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                value={value}
                defaultValue={defaultValue}
                inputValue={inputValue}
                onChange={onChangeHandler}
                onInputChange={onInputChange}
                getOptionSelected={(option, val) => option?.value === val?.value}
            />
        </div>
    );
};

AsyncAutocomplete.propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.arrayOf(PropTypes.shape({})),
    multiple: PropTypes.bool,
    defaultValue: PropTypes.arrayOf(PropTypes.shape({})),
    getThrottle: PropTypes.func.isRequired,
    createOptions: PropTypes.func.isRequired,
    label: PropTypes.string,
};

AsyncAutocomplete.defaultProps = {
    className: '',
    onChange: () => {},
    value: undefined,
    multiple: true,
    defaultValue: undefined,
    label: '',
};

export default AsyncAutocomplete;

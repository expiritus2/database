import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Autocomplete } from 'components';

import { uniqBy, snakeCase } from 'lodash-es';
import { titleCase } from 'helpers/utils';

import styles from './styles.module.scss';

const AsyncAutocomplete = (props) => {
    const { className, onChange, value, multiple, defaultValue, getThrottle, createOptions, label } = props;
    const { convertTitleCaseIfNew } = props;

    const [open, setOpen] = useState(false);
    const [optionsValue, setOptionsValue] = useState(value);
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [defaultValueVal] = useState(value || defaultValue);

    const onInputChange = (event) => {
        const newValue = event?.target?.value;

        setInputValue(newValue);

        if (newValue) {
            setLoading(true);
            const promise = getThrottle(newValue);

            if (promise?.then) {
                getThrottle(newValue)
                    .then((response) => {
                        setOptionsValue(uniqBy([...optionsValue, ...createOptions(response?.data)], 'value'));
                        setLoading(false);
                    }).catch(() => setLoading(false));
            }
        }
    };

    const onChangeHandler = (event, newValue) => {
        const filteredNewValue = optionsValue.filter((option) => newValue.every((o) => o.value === option.value));
        if (!filteredNewValue.length) {
            setOptionsValue((prevState) => [...prevState, ...newValue]);
        }
        onChange(event, newValue);
        setInputValue('');
    };

    const onFilterOptions = (options, params) => {
        const filtered = options.filter((option) => option?.value?.includes(params.inputValue));
        const isOptionInOptions = optionsValue.some((option) => option.value.includes(params.inputValue));

        if (params.inputValue !== '' && !isOptionInOptions) {
            const newOption = {
                label: convertTitleCaseIfNew ? titleCase(params.inputValue) : params.inputValue,
                value: snakeCase(params.inputValue),
            };
            filtered.push(newOption);
        }

        return filtered;
    };

    const getOptionLabel = (option) => {
        if (typeof option === 'string') {
            return option;
        }

        if (option.inputValue) {
            return option.inputValue;
        }

        return option.label;
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
                defaultValue={defaultValueVal}
                inputValue={inputValue}
                onChange={onChangeHandler}
                onInputChange={onInputChange}
                filterOptions={onFilterOptions}
                getOptionLabel={getOptionLabel}
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
    convertTitleCaseIfNew: PropTypes.bool,
};

AsyncAutocomplete.defaultProps = {
    className: '',
    onChange: () => {},
    value: undefined,
    multiple: true,
    defaultValue: undefined,
    label: '',
    convertTitleCaseIfNew: true,
};

export default AsyncAutocomplete;

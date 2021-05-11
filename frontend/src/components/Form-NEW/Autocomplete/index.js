import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import SelectSearch from 'react-select-search';
import { find, get } from 'lodash-es';
import classNames from 'classnames';

import { Checkbox } from 'components';

import styles from './syles.module.scss';

const Autocomplete = (props) => {
    const { id, testid, defaultValue, onSelect, options, label, className, closeOnSelect } = props;
    const { name, search, multiple, placeholder, value, disabled, error, variant } = props;
    const { altLabel, altLabelClassName, emptyMessage, autoComplete, isEmptyValue, renderOption } = props;
    const [isInputEmpty, setIsInputEmpty] = useState(true);

    const onChange = useCallback((val) => {
        const valueObj = find(options, { value: val });
        const fakeEvent = { target: { value: valueObj, name } };

        if (Array.isArray(val)) {
            const values = val.map((v) => find(options, { value: v }));
            fakeEvent.target.value = values;
            return onSelect(fakeEvent, values);
        }

        onSelect(fakeEvent, valueObj);
    }, [name, onSelect, options]);

    const trackInputValue = (val) => {
        setTimeout(() => {
            if (!val?.length) {
                setIsInputEmpty(true);
            }

            if (val?.length) {
                setIsInputEmpty(false);
            }
        }, 0);
    };

    const renderValue = (valueProps) => {
        trackInputValue(valueProps.value);
        return (
            <input
                {...valueProps}
                className={classNames(styles.input, className.input)}
                name={name}
                autoComplete="off"
                testid={testid}
            />
        );
    };

    const renderOptionHandler = (optionProps, optionData, optionSnapshot) => {
        const optProps = { ...optionProps, value: optionData.value, disabled: optionData.disabled };
        return (
            <button
                type="button"
                className={classNames(
                    styles.option,
                    styles[variant],
                    { [styles['is-highlighted']]: optionSnapshot.highlighted },
                    { [styles['is-selected']]: !multiple && optionSnapshot.selected },
                )}
                {...optProps}
            >
                {renderOption ? renderOption(optionData) : <span>{optionData.name}</span>}
                {multiple && (
                    <Checkbox
                        labelClassName={styles.checkbox}
                        checked={optionSnapshot.selected}
                    />
                )}
            </button>
        );
    };

    const getValue = () => {
        if (isEmptyValue) return [];

        if (Array.isArray(value)) {
            const defVal = typeof value === 'object' ? '' : value;
            return value.map((val) => get(val, 'value', defVal));
        }

        const defVal = typeof value === 'object' ? '' : value;
        return get(value, 'value', defVal) || get(defaultValue, 'value', defaultValue);
    };

    return (
        <div testid="wrapper" className={classNames(styles.selectWrapper, styles[variant], className.wrapper)}>
            {label && (
                <label htmlFor={id}>
                    <span>{label}</span>
                    {altLabel && <span className={classNames(styles.altLabel, altLabelClassName)}>{altLabel}</span>}
                </label>
            )}
            <div className={styles.fieldHolder}>
                <SelectSearch
                    id={id}
                    printOptions={isInputEmpty ? 'never' : 'auto'}
                    closeOnSelect={closeOnSelect}
                    disabled={disabled}
                    search={search}
                    options={options}
                    renderValue={renderValue}
                    renderOption={renderOptionHandler}
                    placeholder={placeholder}
                    multiple={multiple}
                    onChange={onChange}
                    className={(key) => classNames(
                        styles[key],
                        styles[variant],
                        className[key],
                    )}
                    value={getValue()}
                    emptyMessage={emptyMessage}
                    autoComplete={autoComplete}
                />
            </div>
            {error && <div testid="validation" className={styles.error}>{error}</div>}
        </div>
    );
};

Autocomplete.LIGHT = 'light';
Autocomplete.LIGHT_FULL = 'lightFull';
Autocomplete.FULL = 'full';

Autocomplete.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    disabled: PropTypes.bool,
    className: PropTypes.shape({
        wrapper: PropTypes.string,
        input: PropTypes.string,
    }),
    defaultValue: PropTypes.oneOfType([
        PropTypes.shape({ name: PropTypes.string, value: PropTypes.string }),
        PropTypes.string,
    ]),
    onSelect: PropTypes.func,
    options: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })).isRequired,
    name: PropTypes.string,
    search: PropTypes.bool,
    multiple: PropTypes.bool,
    placeholder: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.shape({
            name: PropTypes.string,
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        }),
        PropTypes.arrayOf(PropTypes.shape({})),
    ]),
    label: PropTypes.string,
    error: PropTypes.string,
    closeOnSelect: PropTypes.bool,
    variant: PropTypes.string,
    altLabel: PropTypes.string,
    altLabelClassName: PropTypes.string,
    emptyMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    testid: PropTypes.string,
    autoComplete: PropTypes.string,
    isEmptyValue: PropTypes.bool,
    renderOption: PropTypes.func,
};

Autocomplete.defaultProps = {
    id: undefined,
    className: {
        wrapper: '',
    },
    defaultValue: undefined,
    onSelect: () => {},
    name: null,
    search: false,
    multiple: false,
    placeholder: 'Select',
    value: null,
    label: undefined,
    disabled: undefined,
    error: undefined,
    closeOnSelect: true,
    variant: Autocomplete.FULL,
    altLabel: undefined,
    altLabelClassName: '',
    emptyMessage: () => <div className={styles.emptyMessage}>No Results</div>,
    testid: undefined,
    autoComplete: 'on',
    isEmptyValue: false,
    renderOption: undefined,
};

export default Autocomplete;

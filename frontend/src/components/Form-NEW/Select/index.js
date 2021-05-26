import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import SelectSearch from 'react-select-search';
import { find, get } from 'lodash-es';
import classNames from 'classnames';

import { Checkbox } from 'components/Form-NEW';

import styles from './syles.module.scss';

const SelectComponent = (props) => {
    const { id, defaultValue, onChange, options, label, className, closeOnSelect } = props;
    const { name, search, multiple, placeholder, value, disabled, error, variant } = props;
    const { printOptions, altLabel, altLabelClassName, emptyMessage, autoComplete } = props;

    const onChangeHandler = useCallback((val) => {
        const valueObj = find(options, { value: val });
        const fakeEvent = { target: { value: valueObj, name } };

        if (Array.isArray(val)) {
            const values = val.map((v) => find(options, { value: v }));
            fakeEvent.target.value = values;
            return onChange(fakeEvent, values);
        }

        onChange(fakeEvent, valueObj);
    }, [name, onChange, options]);

    const renderValue = (valueProps) => (
        <input
            {...valueProps}
            className={classNames(styles.input, className.input)}
            name={name}
            autoComplete="off"
        />
    );

    const renderOption = (optionProps, optionData, optionSnapshot) => {
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
                <span>{optionData.name}</span>
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
        if (Array.isArray(value)) {
            const defVal = typeof value === 'object' ? '' : value;
            return value.map((val) => get(val, 'value', defVal));
        }

        const defVal = typeof value === 'object' ? '' : value;
        return get(value, 'value', defVal) || get(defaultValue, 'value', defaultValue);
    };

    const convertedOptions = useMemo(() => (
        options.map(({ label: optionLabel, value: optionValue }) => ({ name: optionLabel, value: optionValue }))
    ), [options]);

    return (
        <div className={classNames(styles.selectWrapper, styles[variant], className.wrapper)}>
            {label && (
                <label htmlFor={id}>
                    <span>{label}</span>
                    {altLabel && <span className={classNames(styles.altLabel, altLabelClassName)}>{altLabel}</span>}
                </label>
            )}
            <SelectSearch
                id={id}
                printOptions={printOptions}
                closeOnSelect={closeOnSelect}
                disabled={disabled}
                search={search}
                options={convertedOptions}
                renderValue={renderValue}
                renderOption={renderOption}
                multiple={multiple}
                onChange={onChangeHandler}
                placeholder={placeholder}
                className={(key) => classNames(styles[key], styles[variant], className[key])}
                value={getValue()}
                emptyMessage={emptyMessage}
                autoComplete={autoComplete}
            />
            {error && <div className={styles.error}>{error}</div>}
        </div>
    );
};

SelectComponent.LIGHT = 'light';
SelectComponent.LIGHT_FULL = 'lightFull';
SelectComponent.FULL = 'full';

SelectComponent.propTypes = {
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
    onChange: PropTypes.func,
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
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
            label: PropTypes.string,
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        }),
        PropTypes.arrayOf(PropTypes.shape({})),
    ]),
    label: PropTypes.string,
    error: PropTypes.string,
    closeOnSelect: PropTypes.bool,
    printOptions: PropTypes.string,
    variant: PropTypes.string,
    altLabel: PropTypes.string,
    altLabelClassName: PropTypes.string,
    emptyMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    testid: PropTypes.string,
    autoComplete: PropTypes.string,
};

SelectComponent.defaultProps = {
    id: undefined,
    className: {
        wrapper: '',
    },
    defaultValue: undefined,
    onChange: () => {},
    name: null,
    search: false,
    multiple: false,
    placeholder: 'Select',
    value: null,
    label: undefined,
    disabled: undefined,
    error: undefined,
    closeOnSelect: true,
    printOptions: 'on-focus',
    // printOptions: 'always',
    variant: SelectComponent.LIGHT_FULL,
    altLabel: undefined,
    altLabelClassName: '',
    emptyMessage: () => <div className={styles.emptyMessage}>No Results</div>,
    testid: undefined,
    autoComplete: 'on',
};

export default SelectComponent;

import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Select from 'react-select';

import styles from './syles.module.scss';

const MultipleSelect = (props) => {
    const { id, onChange, options, label, className } = props;
    const { name, search, multiple, placeholder, value, disabled, error, variant } = props;
    const { altLabel, altLabelClassName } = props;

    const onChangeHandler = useCallback((val) => {
        const fakeEvent = { target: { value: val, name } };

        onChange(fakeEvent, val);
    }, [name, onChange]);

    return (
        <div className={classNames(styles.selectWrapper, styles[variant], className.wrapper)}>
            {label && (
                <label htmlFor={id}>
                    <span>{label}</span>
                    {altLabel && <span className={classNames(styles.altLabel, altLabelClassName)}>{altLabel}</span>}
                </label>
            )}
            <Select
                id={id}
                isDisabled={disabled}
                isSearchable={search}
                options={options}
                isMulti={multiple}
                onChange={onChangeHandler}
                placeholder={placeholder}
                value={value}
            />
            {error && <div className={styles.error}>{error}</div>}
        </div>
    );
};

MultipleSelect.LIGHT = 'light';
MultipleSelect.LIGHT_FULL = 'lightFull';
MultipleSelect.FULL = 'full';

MultipleSelect.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    disabled: PropTypes.bool,
    className: PropTypes.shape({
        wrapper: PropTypes.string,
        input: PropTypes.string,
    }),
    onChange: PropTypes.func,
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
    variant: PropTypes.string,
    altLabel: PropTypes.string,
    altLabelClassName: PropTypes.string,
};

MultipleSelect.defaultProps = {
    id: undefined,
    className: {
        wrapper: '',
    },
    onChange: () => {},
    name: null,
    search: false,
    multiple: false,
    placeholder: 'Select',
    value: null,
    label: undefined,
    disabled: undefined,
    error: undefined,
    variant: MultipleSelect.LIGHT_FULL,
    altLabel: undefined,
    altLabelClassName: '',
};

export default MultipleSelect;

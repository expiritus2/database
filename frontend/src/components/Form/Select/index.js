import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactSelect from 'react-select';

import { InputLabel } from 'components/Form';
import styles from './syles.module.scss';

import selectStyles from './selectStyles';

const Select = (props) => {
    const { onChange, options, label, className } = props;
    const { name, search, multiple, placeholder, value, disabled, error } = props;
    const { settings, menuTop } = props;

    const onSelect = (val) => {
        const fakeEvent = { target: { value: val, name } };
        onChange(fakeEvent, val);
    };

    const getValue = () => {
        if (Array.isArray(value)) {
            return value.map((val) => {
                if (!val?.label && !val?.value) {
                    return options.find((option) => option?.value === val);
                }

                return val;
            });
        }

        if (!value?.label && !value?.value) {
            return options.find((option) => option?.value === value);
        }

        return value;
    };

    return (
        <div className={classNames(styles.selectWrapper, className)}>
            {label && <InputLabel label={label} />}
            <ReactSelect
                isDisabled={disabled}
                isSearchable={search}
                options={options}
                isMulti={multiple}
                onChange={onSelect}
                placeholder={placeholder}
                value={getValue()}
                styles={selectStyles({ menuTop })}
                {...settings}
            />
            {error && <div className={styles.error}>{error}</div>}
        </div>
    );
};

Select.LIGHT = 'light';
Select.LIGHT_FULL = 'lightFull';
Select.FULL = 'full';

Select.propTypes = {
    disabled: PropTypes.bool,
    className: PropTypes.string,
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
    settings: PropTypes.shape({}),
    menuTop: PropTypes.bool,
};

Select.defaultProps = {
    className: '',
    onChange: () => {},
    name: null,
    search: false,
    multiple: false,
    placeholder: 'Select',
    value: null,
    label: undefined,
    disabled: undefined,
    error: undefined,
    settings: {},
    menuTop: false,
};

export default Select;

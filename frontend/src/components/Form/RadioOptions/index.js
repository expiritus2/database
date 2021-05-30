import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Checkbox, InputLabel } from 'components/Form';

import styles from './styles.module.scss';

const RadioOptions = (props) => {
    const { className, options, name, onChange, titleLabel, disabled, testid, error } = props;
    const { optionClassName, value, direction, labelTextClassName, isPending } = props;

    const [optionValue, setOptionValue] = useState(value);

    useEffect(() => setOptionValue(value), [value]);

    return (
        <div testid="wrapper" className={classNames(styles.wrapper, { [styles.disabled]: disabled }, className)}>
            <InputLabel label={titleLabel} />
            {options.map(({ id, value: optValue, label }) => (
                <Checkbox
                    key={id}
                    type="radio"
                    name={name}
                    label={label}
                    direction={direction}
                    className={classNames(styles.option, optionClassName)}
                    labelClassName={styles.label}
                    labelTextClassName={classNames(styles.labelText, labelTextClassName)}
                    onChange={() => onChange(optValue)}
                    checked={optionValue === id}
                    value={optValue}
                    testid={testid}
                    isPending={isPending && value === id}
                />
            ))}
            {error && <div testid="validation" className={styles.error}>{error}</div>}
        </div>
    );
};

RadioOptions.propTypes = {
    className: PropTypes.string,
    labelTextClassName: PropTypes.string,
    optionClassName: PropTypes.string,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
            label: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.object]),
        }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    error: PropTypes.string,
    onChange: PropTypes.func,
    titleLabel: PropTypes.string,
    disabled: PropTypes.bool,
    testid: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
    direction: PropTypes.string,
    isPending: PropTypes.bool,
};

RadioOptions.defaultProps = {
    className: '',
    labelTextClassName: '',
    optionClassName: '',
    error: '',
    onChange: () => {},
    titleLabel: '',
    disabled: false,
    value: null,
    testid: null,
    direction: Checkbox.DIRECTION_RIGHT,
    isPending: false,
};

export default RadioOptions;

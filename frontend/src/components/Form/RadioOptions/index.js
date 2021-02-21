import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Checkbox, InputLabel } from 'components';

import styles from './styles.module.scss';

const RadioOptions = (props) => {
    const { className, options, name, onChange, titleLabel, disabled, testid } = props;
    const { optionClassName, value } = props;

    const [optionValue, setOptionValue] = useState(value);

    useEffect(() => setOptionValue(value), [value]);

    return (
        <div className={classNames(styles.wrapper, { [styles.disabled]: disabled }, className)}>
            <InputLabel label={titleLabel} />
            {options.map(({ id, value: optValue, label }) => (
                <Checkbox
                    key={id}
                    type="radio"
                    name={name}
                    label={label}
                    direction={Checkbox.DIRECTION_RIGHT}
                    className={classNames(styles.option, optionClassName)}
                    labelClassName={styles.label}
                    labelTextClassName={styles.labelText}
                    onChange={() => onChange(optValue)}
                    checked={optionValue === id}
                    value={optValue}
                    testid={testid}
                />
            ))}
        </div>
    );
};

RadioOptions.propTypes = {
    className: PropTypes.string,
    optionClassName: PropTypes.string,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            label: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.object]),
        }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    titleLabel: PropTypes.string,
    disabled: PropTypes.bool,
    testid: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

RadioOptions.defaultProps = {
    className: '',
    optionClassName: '',
    onChange: () => {},
    titleLabel: '',
    disabled: false,
    value: null,
    testid: null,
};

export default RadioOptions;

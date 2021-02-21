import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { pushOrRemove } from 'helpers';
import Button from './Button';

import styles from './styles.module.scss';

const ButtonGroup = (props) => {
    const { testid, id, buttons, multiple, value, onChange, label, altLabel } = props;
    const { className, buttonClassName, disabled, valueRequired, defaultValue } = props;
    const [activeButtons, setActiveButtons] = useState(defaultValue);

    const onClick = useCallback((buttonId) => {
        if (disabled) return null;

        const newActives = pushOrRemove({ arr: activeButtons, id: buttonId, multiple });

        setActiveButtons(newActives);

        if (valueRequired && newActives.length === 0) {
            setActiveButtons([...activeButtons]);
            return onChange([...activeButtons]);
        }

        onChange(newActives);
    }, [onChange, activeButtons, disabled, valueRequired, multiple]);

    return (
        <div className={classNames(styles.wrapper, className)}>
            {label && (
                <label htmlFor={id}>
                    <span>{label}</span>
                    {altLabel && <span className={styles.altLabel}>{altLabel}</span>}
                </label>
            )}
            <div testid={testid} className={classNames(styles.buttons, { [styles.disabled]: disabled })}>
                {buttons.map(({ id: buttonId, label: buttonLabel }) => (
                    <Button
                        key={buttonId}
                        disabled={disabled}
                        label={buttonLabel}
                        onClick={() => onClick(buttonId)}
                        active={(value || activeButtons).includes(buttonId)}
                        className={buttonClassName}
                    />
                ))}
            </div>
        </div>
    );
};

ButtonGroup.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    buttons: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        label: PropTypes.string,
    })).isRequired,
    multiple: PropTypes.bool,
    value: PropTypes.arrayOf(PropTypes.string),
    defaultValue: PropTypes.arrayOf(PropTypes.string),
    onChange: PropTypes.func,
    className: PropTypes.string,
    buttonClassName: PropTypes.shape({
        button: PropTypes.string,
        buttonActive: PropTypes.string,
    }),
    disabled: PropTypes.bool,
    valueRequired: PropTypes.bool,
    label: PropTypes.string,
    altLabel: PropTypes.string,
    testid: PropTypes.string,
};

ButtonGroup.defaultProps = {
    id: undefined,
    className: '',
    multiple: false,
    value: undefined,
    defaultValue: [],
    onChange: () => {},
    buttonClassName: {},
    disabled: false,
    valueRequired: true,
    label: undefined,
    altLabel: undefined,
    testid: undefined,
};

export default ButtonGroup;

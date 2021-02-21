/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import styles from './styles.module.scss';

const CheckboxComponent = (props) => {
    const { checked, onChange, disabled, label, direction, type, checkboxDomClassName, labelClassName, testid } = props;
    const { id, name, className, labelTextClassName, value } = props;
    const { checkboxWrapperClassName, checkboxClassName } = props;

    const [isChecked, setIsChecked] = useState(checked);

    useEffect(() => setIsChecked(checked), [checked]);

    const onChangeHandler = useCallback((event) => {
        onChange(event, event.target.value);
    }, [onChange]);

    return (
        <div className={classNames(className)}>
            <label testid={testid} className={classNames(styles.wrapper, styles[direction], labelClassName)}>
                {label && <span className={classNames(labelTextClassName)}>{label}</span>}
                <input
                    id={id}
                    name={name}
                    className={classNames(styles.checkboxDom, checkboxDomClassName)}
                    type={type}
                    value={value}
                    checked={isChecked}
                    disabled={disabled}
                    onChange={onChangeHandler}
                />
                <span className={classNames(styles.customCheckboxWrapper, styles[type], checkboxWrapperClassName)}>
                    <div className={classNames(styles.customCheckbox, checkboxClassName)} />
                    <div>Checkmark Icon</div>
                </span>
            </label>
        </div>
    );
};

CheckboxComponent.DIRECTION_LEFT = 'left';
CheckboxComponent.DIRECTION_RIGHT = 'right';

CheckboxComponent.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.object]),
    direction: PropTypes.string,
    className: PropTypes.string,
    labelTextClassName: PropTypes.string,
    checkboxWrapperClassName: PropTypes.string,
    checkboxClassName: PropTypes.string,
    checkboxDomClassName: PropTypes.string,
    labelClassName: PropTypes.string,
    type: PropTypes.string,
    testid: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

CheckboxComponent.defaultProps = {
    id: undefined,
    name: undefined,
    checked: false,
    onChange: () => {},
    disabled: false,
    label: '',
    direction: CheckboxComponent.DIRECTION_LEFT,
    className: '',
    labelTextClassName: '',
    checkboxWrapperClassName: '',
    checkboxDomClassName: '',
    checkboxClassName: '',
    labelClassName: '',
    type: 'checkbox',
    value: '',
    testid: undefined,
};

export default CheckboxComponent;

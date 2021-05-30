/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { PendingWrapper } from 'components';
import classNames from 'classnames';

import styles from './styles.module.scss';

const Toggle = (props) => {
    const { checked, onChange, disabled, label, direction, inputDomClassName, labelClassName, testid } = props;
    const { id, name, className, labelTextClassName, value, isPending, topControl } = props;
    const { checkboxWrapperClassName, toggleClassName } = props;
    const [checkedValue, setCheckedValue] = useState(checked);

    useEffect(() => setCheckedValue(checked), [checked]);

    const onChangeHandler = useCallback((event) => {
        onChange(event, !checkedValue);
        if (!topControl) {
            setCheckedValue((prevState) => !prevState);
        }
    }, [onChange, checkedValue, topControl]);

    return (
        <div className={classNames(className)}>
            <label testid={testid} className={classNames(styles.wrapper, styles[direction], labelClassName)}>
                {label && <span className={classNames(styles.label, labelTextClassName)}>{label}</span>}
                <input
                    id={id}
                    name={name}
                    className={classNames(styles.inputDom, inputDomClassName)}
                    type="checkbox"
                    value={value}
                    checked={checkedValue}
                    disabled={disabled || isPending}
                    onChange={onChangeHandler}
                />
                <span className={classNames(styles.toggleWrapper, checkboxWrapperClassName)}>
                    <div className={classNames(styles.toggle, toggleClassName)}>
                        <PendingWrapper
                            loaderClassName={classNames(styles.loader, { [styles.isChecked]: checkedValue })}
                            isPending={isPending}
                        />
                    </div>
                </span>
            </label>
        </div>
    );
};

Toggle.DIRECTION_LEFT = 'left';
Toggle.DIRECTION_RIGHT = 'right';

Toggle.propTypes = {
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
    toggleClassName: PropTypes.string,
    inputDomClassName: PropTypes.string,
    labelClassName: PropTypes.string,
    testid: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    isPending: PropTypes.bool,
    topControl: PropTypes.bool,
};

Toggle.defaultProps = {
    id: undefined,
    name: undefined,
    checked: false,
    onChange: () => {},
    disabled: false,
    label: '',
    direction: Toggle.DIRECTION_LEFT,
    className: '',
    labelTextClassName: '',
    checkboxWrapperClassName: '',
    inputDomClassName: '',
    toggleClassName: '',
    labelClassName: '',
    value: '',
    testid: undefined,
    isPending: false,
    topControl: false,
};

export default Toggle;

/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { PendingWrapper } from 'components';
import { GiCheckMark } from 'react-icons/gi';
import classNames from 'classnames';

import styles from './styles.module.scss';

const CheckboxComponent = (props) => {
    const { checked, onChange, disabled, label, direction, type, checkboxDomClassName, labelClassName, testid } = props;
    const { id, name, className, labelTextClassName, value, isPending } = props;
    const { checkboxWrapperClassName, checkboxClassName } = props;

    const [isChecked, setIsChecked] = useState(checked);

    useEffect(() => setIsChecked(checked), [checked, value, setIsChecked]);

    const onChangeHandler = useCallback((event) => {
        const newIsChecked = !isChecked;
        onChange(event, event.target.value, newIsChecked);
    }, [onChange, isChecked]);

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
                    <PendingWrapper
                        className={styles.pendingWrapper}
                        loaderClassName={classNames(styles.loader, { [styles.isChecked]: isChecked })}
                        isPending={isPending}
                    >
                        <GiCheckMark className={styles.checkmark} />
                    </PendingWrapper>
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
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
    isPending: PropTypes.bool,
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
    isPending: false,
};

export default CheckboxComponent;

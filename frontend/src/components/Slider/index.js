import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactSlider from 'react-slider';
import classNames from 'classnames';

import styles from './styles.module.scss';
import './styles.scss';

const Slider = (props) => {
    const { className, defaultValue, sliderClassName, thumbClassName, trackClassName } = props;
    const { ariaLabel, ariaValuetext, minDistance, disabled, invert, min, max, pearling } = props;
    const { step, value, onChange, sliderHolderClassName, sliderValueClassName } = props;
    const [currentValue, setCurrentValue] = useState(defaultValue);

    const getValue = () => {
        const [curMin, curMax] = currentValue;

        if (curMin === min && curMax === max) {
            return 'Any';
        }

        return currentValue.join('-') || 'Any';
    };
    const onChangeHandler = (val) => {
        setCurrentValue(val);
        onChange(val);
    };

    return (
        <div className={classNames(styles.sliderWrapper, className)}>
            <div className={classNames(styles.sliderHolder, sliderHolderClassName)}>
                <div className={classNames(styles.value, sliderValueClassName)}>{getValue()}</div>
                <ReactSlider
                    className={classNames(styles.slider, sliderClassName)}
                    thumbClassName={classNames(styles.thumb, thumbClassName)}
                    trackClassName={classNames('track', trackClassName)}
                    defaultValue={defaultValue}
                    ariaLabel={ariaLabel}
                    ariaValuetext={ariaValuetext}
                    invert={invert}
                    pearling={pearling}
                    onChange={onChangeHandler}
                    minDistance={minDistance}
                    disabled={disabled}
                    min={min}
                    max={max}
                    step={step}
                    value={value ?? currentValue}
                />
            </div>
        </div>
    );
};

Slider.propTypes = {
    className: PropTypes.string,
    sliderClassName: PropTypes.string,
    thumbClassName: PropTypes.string,
    trackClassName: PropTypes.string,
    sliderHolderClassName: PropTypes.string,
    sliderValueClassName: PropTypes.string,
    defaultValue: PropTypes.arrayOf(PropTypes.number),
    value: PropTypes.arrayOf(PropTypes.number),
    ariaLabel: PropTypes.arrayOf(PropTypes.string),
    ariaValuetext: PropTypes.func,
    minDistance: PropTypes.number,
    disabled: PropTypes.bool,
    invert: PropTypes.bool,
    pearling: PropTypes.bool,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    onChange: PropTypes.func,
};

Slider.defaultProps = {
    className: '',
    sliderClassName: '',
    thumbClassName: '',
    trackClassName: '',
    sliderHolderClassName: '',
    sliderValueClassName: '',
    defaultValue: [0, 100],
    value: undefined,
    ariaLabel: ['Lower thumb', 'Upper thumb'],
    ariaValuetext: (state) => `Thumb value ${state.valueNow}`,
    minDistance: 0,
    disabled: false,
    invert: false,
    min: 0,
    max: 100,
    pearling: false,
    step: 1,
    onChange: () => {},
};

export default Slider;

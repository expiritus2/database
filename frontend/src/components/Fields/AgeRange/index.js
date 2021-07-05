import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useTranslate } from 'hooks';
import { Input, InputLabel } from 'components/Form';

import styles from './styles.module.scss';

const AgeRange = (props) => {
    const { className, onChange, value, interval } = props;
    const { translate } = useTranslate();

    const onChangeMin = (event, val) => {
        onChange(event, { ...value, min: val });
    };

    const onChangeMax = (event, val) => {
        onChange(event, { ...value, max: val });
    };

    return (
        <div className={classNames(styles.ageInput, className)}>
            <InputLabel label={translate.Age} />
            <div className={classNames(styles.formControl)}>
                <Input
                    isNumberFormat
                    name="min"
                    placeholder={translate.From}
                    className={classNames(styles.age)}
                    onChange={onChangeMin}
                    value={value?.min}
                    interval={interval}
                    minNumber={0}
                />
                <Input
                    isNumberFormat
                    name="max"
                    placeholder={translate.To}
                    className={classNames(styles.age)}
                    onChange={onChangeMax}
                    value={value?.max}
                    interval={interval}
                    minNumber={0}
                />
            </div>
        </div>
    );
};

AgeRange.propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.shape({
        min: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        max: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    }),
    interval: PropTypes.number,
};

AgeRange.defaultProps = {
    className: '',
    onChange: () => {},
    value: {},
    interval: 1,
};

export default AgeRange;

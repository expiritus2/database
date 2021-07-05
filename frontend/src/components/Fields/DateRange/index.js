import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { DatePicker, InputLabel } from 'components/Form';
import { useTranslate } from 'hooks';

import styles from './styles.module.scss';

const DateRange = (props) => {
    const { className, onChange, value, label } = props;
    const { translate } = useTranslate();

    const onChangeMin = (event, val) => {
        onChange(event, { ...value, min: val });
    };

    const onChangeMax = (event, val) => {
        onChange(event, { ...value, max: val });
    };

    return (
        <div className={classNames(styles.inputWrapper, className)}>
            <InputLabel label={label} />
            <div className={classNames(styles.formControl)}>
                <DatePicker
                    name="min"
                    placeholder={translate.Froms}
                    className={classNames(styles.date)}
                    onChange={(event, val) => onChangeMin(event, val?.[0])}
                    value={value?.min}
                    options={{ maxDate: value?.max }}
                />
                <DatePicker
                    name="max"
                    placeholder={translate.Tos}
                    className={classNames(styles.date)}
                    onChange={(event, val) => onChangeMax(event, val?.[0])}
                    value={value?.max}
                    options={{ minDate: value?.min }}
                />
            </div>
        </div>
    );
};

DateRange.propTypes = {
    className: PropTypes.string,
    value: PropTypes.shape({
        min: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
        max: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    }),
    onChange: PropTypes.func,
    label: PropTypes.string,
};

DateRange.defaultProps = {
    className: '',
    value: null,
    label: '',
    onChange: () => {},
};

export default DateRange;

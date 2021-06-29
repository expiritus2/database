import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useTranslate } from 'hooks';
import { Input } from 'components/Form';
import { Currency } from 'components';
import styles from './styles.module.scss';

const SalaryRange = (props) => {
    const { className, onCurrencyChange, onChangeMin, onChangeMax, value, interval } = props;
    const { translate } = useTranslate();

    return (
        <div className={classNames(styles.salaryInput, className)}>
            <div className={classNames(styles.formControl)}>
                <Input
                    isNumberFormat
                    name="salaryMin"
                    className={classNames(styles.salary)}
                    label={translate.Salary}
                    onChange={onChangeMin}
                    value={value?.min}
                    interval={interval}
                    minNumber={0}
                />
                <Input
                    isNumberFormat
                    name="salaryMax"
                    className={classNames(styles.salary)}
                    label={translate.Salary}
                    onChange={onChangeMax}
                    value={value?.max}
                    interval={interval}
                    minNumber={0}
                />
                <Currency
                    name="currency"
                    className={styles.currency}
                    onChange={onCurrencyChange}
                    value={value?.currency}
                />
            </div>
        </div>
    );
};

SalaryRange.propTypes = {
    className: PropTypes.string,
    onChangeMin: PropTypes.func,
    onChangeMax: PropTypes.func,
    onCurrencyChange: PropTypes.func,
    value: PropTypes.shape({
        min: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        max: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        currency: PropTypes.shape({}),
    }),
    interval: PropTypes.number,
};

SalaryRange.defaultProps = {
    className: '',
    onChangeMin: () => {},
    onChangeMax: () => {},
    onCurrencyChange: () => {},
    value: {},
    interval: 500,
};

export default SalaryRange;

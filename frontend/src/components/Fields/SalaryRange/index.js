import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useTranslate } from 'hooks';
import { Input } from 'components/Form';
import { Currency } from 'components';
import styles from './styles.module.scss';

const SalaryRange = (props) => {
    const { className, onChange, value, interval } = props;
    const { translate } = useTranslate();

    const onChangeMin = (event, val) => {
        onChange(event, { ...value, min: val });
    };

    const onChangeMax = (event, val) => {
        onChange(event, { ...value, max: val });
    };

    const onCurrencyChange = (event, val) => {
        onChange(event, { ...value, currency: val });
    };

    return (
        <div className={classNames(styles.salaryInput, className)}>
            <div className={classNames(styles.formControl)}>
                <Input
                    isNumberFormat
                    placeholder={translate.From}
                    label={translate.Salary}
                    name="salaryMin"
                    className={classNames(styles.salary)}
                    onChange={onChangeMin}
                    value={value?.min}
                    interval={interval}
                    minNumber={0}
                />
                <Input
                    isNumberFormat
                    name="salaryMax"
                    placeholder={translate.To}
                    label="&nbsp;"
                    className={classNames(styles.salary)}
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
    onChange: PropTypes.func,
    value: PropTypes.shape({
        min: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        max: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        currency: PropTypes.shape({}),
    }),
    interval: PropTypes.number,
};

SalaryRange.defaultProps = {
    className: '',
    onChange: () => {},
    value: {},
    interval: 500,
};

export default SalaryRange;

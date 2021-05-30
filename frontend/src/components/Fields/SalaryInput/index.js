import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useTranslate } from 'hooks';
import { Currency } from 'components';
import { Input } from 'components/Form';

import styles from './styles.module.scss';

const SalaryInput = (props) => {
    const { className, onCurrencyChange, onChange, value, interval } = props;
    const { translate } = useTranslate();

    return (
        <div className={classNames(styles.salaryInput, className)}>
            <div className={classNames(styles.formControl)}>
                <Input
                    minNumber={0}
                    isNumberFormat
                    name="salary"
                    className={classNames(styles.salary)}
                    label={translate.Salary}
                    onChange={onChange}
                    value={value?.amount}
                    interval={interval}
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

SalaryInput.propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func,
    onCurrencyChange: PropTypes.func,
    value: PropTypes.shape({
        amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        currency: PropTypes.string,
    }),
    interval: PropTypes.number,
};

SalaryInput.defaultProps = {
    className: '',
    onChange: () => {},
    onCurrencyChange: () => {},
    value: {},
    interval: 500,
};

export default SalaryInput;

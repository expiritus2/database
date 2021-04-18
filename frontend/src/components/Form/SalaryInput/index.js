import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useTranslate } from 'hooks';
import { Currency, NumberInput } from 'components';
import FormControl from '@material-ui/core/FormControl';
import styles from './styles.module.scss';

const SalaryInput = (props) => {
    const { className, onCurrencyChange, onChange, value, interval } = props;
    const { translate } = useTranslate();

    return (
        <div className={classNames(styles.salaryInput, className)}>
            <FormControl className={classNames(styles.formControl)}>
                <NumberInput
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
            </FormControl>
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

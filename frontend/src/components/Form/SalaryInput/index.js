import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useTranslate } from 'hooks';
import { Currency, NumberInput } from 'components/index';
import FormControl from '@material-ui/core/FormControl';
import styles from './styles.module.scss';

const SalaryInput = (props) => {
    const { className, onCurrencyChange, onChange, value } = props;
    const { translate } = useTranslate();

    return (
        <div className={classNames(styles.salaryInput, className)}>
            <FormControl className={classNames(styles.formControl)}>
                <NumberInput
                    name="salary"
                    className={classNames(styles.salary)}
                    label={translate.Salary}
                    onValueChange={onChange}
                    value={value?.amount}
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
};

SalaryInput.defaultProps = {
    className: '',
    onChange: () => {},
    onCurrencyChange: () => {},
    value: {},
};

export default SalaryInput;

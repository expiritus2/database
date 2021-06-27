import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useTranslate } from 'hooks';
import { SalaryValue as CommonSalaryValue } from 'components';

import styles from './styles.module.scss';

const SalaryValue = (props) => {
    const { value, currency, className } = props;
    const { translate } = useTranslate();

    return (
        <div className={classNames(styles.salary, className)}>
            {!!value?.min && (
                <div className={styles.from}>
                    <span className={styles.prefix}>{translate.From}</span>
                    <CommonSalaryValue value={value?.min} currency={currency} />
                </div>
            )}
            {!!value?.max && (
                <div className={styles.to}>
                    <span className={styles.prefix}>{translate.To}</span>
                    <CommonSalaryValue value={value?.max} currency={currency} />
                </div>
            )}
        </div>
    );
};

SalaryValue.propTypes = {
    className: PropTypes.string,
    value: PropTypes.shape({
        min: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        max: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    }),
    currency: PropTypes.string,
};

SalaryValue.defaultProps = {
    className: '',
    currency: undefined,
    value: undefined,
};

export default SalaryValue;

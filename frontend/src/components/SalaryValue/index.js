import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import NumberFormat from 'react-number-format';

import styles from './styles.module.scss';

const SalaryValue = (props) => {
    const { value, currency, className } = props;

    return (
        <div className={classNames(styles.salary, className)}>
            <NumberFormat
                thousandSeparator
                value={value}
                displayType="text"
                suffix={currency}
            />
        </div>
    );
};

SalaryValue.propTypes = {
    className: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    currency: PropTypes.string,
};

SalaryValue.defaultProps = {
    className: '',
    currency: undefined,
    value: undefined,
};

export default SalaryValue;

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import NumberFormat from 'react-number-format';

import { EU } from 'settings/constants/currency';
import styles from './styles.module.scss';

const Salary = (props) => {
    const { value, currency, className } = props;

    return (
        <div className={classNames(styles.salary, className)}>
            <NumberFormat
                thousandSeparator
                value={value}
                displayType="text"
                suffix={currency === EU ? ' €' : ' $'}
            />
        </div>
    );
};

Salary.propTypes = {
    className: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    currency: PropTypes.string.isRequired,
};

Salary.defaultProps = {
    className: '',
};

export default Salary;

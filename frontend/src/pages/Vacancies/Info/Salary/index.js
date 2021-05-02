import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.module.scss';

const Salary = (props) => {
    const { className } = props;

    return (
        <div className={classNames(styles.salary, className)}>
            Salary
        </div>
    );
};

Salary.propTypes = {
    className: PropTypes.string,
};

Salary.defaultProps = {
    className: '',
};

export default Salary;

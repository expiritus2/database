import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.module.scss';

const WorkSchedules = (props) => {
    const { className } = props;

    return (
        <div className={classNames(styles.workSchedules, className)}>
            WorkSchedules
        </div>
    );
};

WorkSchedules.propTypes = {
    className: PropTypes.string,
};

WorkSchedules.defaultProps = {
    className: '',
};

export default WorkSchedules;

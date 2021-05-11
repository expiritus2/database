import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.module.scss';

const WorkSchedule = (props) => {
    const { className } = props;

    return (
        <div className={classNames(styles.workSchedule, className)}>
            WorkSchedule
        </div>
    );
};

WorkSchedule.propTypes = {
    className: PropTypes.string,
};

WorkSchedule.defaultProps = {
    className: '',
};

export default WorkSchedule;

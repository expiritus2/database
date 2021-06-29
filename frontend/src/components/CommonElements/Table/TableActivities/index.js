import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.module.scss';

const TableActivities = (props) => {
    const { list, className } = props;

    return (
        <div className={classNames(styles.activities, className)}>
            {(list || []).map((activity) => (
                <div key={activity.id} className={styles.activity}>{activity?.label}</div>
            ))}
        </div>
    );
};

TableActivities.propTypes = {
    className: PropTypes.string,
    list: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

TableActivities.defaultProps = {
    className: '',
};

export default TableActivities;

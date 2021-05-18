import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.module.scss';

const WorkPlaces = (props) => {
    const { className } = props;

    return (
        <div className={classNames(styles.workPlaces, className)}>
            Places
        </div>
    );
};

WorkPlaces.propTypes = {
    className: PropTypes.string,
};

WorkPlaces.defaultProps = {
    className: '',
};

export default WorkPlaces;

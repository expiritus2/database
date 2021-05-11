import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.module.scss';

const WorkPlace = (props) => {
    const { className } = props;

    return (
        <div className={classNames(styles.workPlace, className)}>
            Place
        </div>
    );
};

WorkPlace.propTypes = {
    className: PropTypes.string,
};

WorkPlace.defaultProps = {
    className: '',
};

export default WorkPlace;

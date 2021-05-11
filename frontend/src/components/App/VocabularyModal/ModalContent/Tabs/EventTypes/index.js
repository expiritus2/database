import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.module.scss';

const EventTypes = (props) => {
    const { className } = props;

    return (
        <div className={classNames(styles.eventTypes, className)}>
            EventTypes
        </div>
    );
};

EventTypes.propTypes = {
    className: PropTypes.string,
};

EventTypes.defaultProps = {
    className: '',
};

export default EventTypes;

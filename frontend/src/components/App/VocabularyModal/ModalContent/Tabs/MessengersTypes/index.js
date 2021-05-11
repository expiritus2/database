import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.module.scss';

const MessengersTypes = (props) => {
    const { className } = props;

    return (
        <div className={classNames(styles.messengersTypes, className)}>
            MessengersTypes
        </div>
    );
};

MessengersTypes.propTypes = {
    className: PropTypes.string,
};

MessengersTypes.defaultProps = {
    className: '',
};

export default MessengersTypes;

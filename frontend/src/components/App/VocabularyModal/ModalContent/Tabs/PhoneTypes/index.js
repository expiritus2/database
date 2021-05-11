import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.module.scss';

const PhoneTypes = (props) => {
    const { className } = props;

    return (
        <div className={classNames(styles.phoneTypes, className)}>
            PhoneTypes
        </div>
    );
};

PhoneTypes.propTypes = {
    className: PropTypes.string,
};

PhoneTypes.defaultProps = {
    className: '',
};

export default PhoneTypes;

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Positions from '../Positions';

import styles from './styles.module.scss';

const Name = (props) => {
    const { className, name, positions } = props;

    return (
        <div className={classNames(styles.name, className)}>
            <h5>{name}</h5>
            <Positions className={styles.positions} positions={positions} />
        </div>
    );
};

Name.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string.isRequired,
    positions: PropTypes.arrayOf(PropTypes.string),
};

Name.defaultProps = {
    className: '',
    positions: [],
};

export default Name;

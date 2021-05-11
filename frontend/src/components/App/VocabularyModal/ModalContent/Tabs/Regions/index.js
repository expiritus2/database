import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.module.scss';

const Regions = (props) => {
    const { className } = props;

    return (
        <div className={classNames(styles.regions, className)}>
            Regions
        </div>
    );
};

Regions.propTypes = {
    className: PropTypes.string,
};

Regions.defaultProps = {
    className: '',
};

export default Regions;

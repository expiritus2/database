import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.module.scss';

const InfoHeaderName = (props) => {
    const { className, children } = props;

    return (
        <div className={classNames(styles.infoHeaderName, className)}>
            <h2 className={styles.name}>{children}</h2>
        </div>
    );
};

InfoHeaderName.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
};

InfoHeaderName.defaultProps = {
    className: '',
    children: null,
};

export default InfoHeaderName;

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.module.scss';

const InfoWrapper = (props) => {
    const { children, className } = props;

    return (
        <div className={classNames(styles.infoWrapper, className)}>
            {children}
        </div>
    );
};

InfoWrapper.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
};

InfoWrapper.defaultProps = {
    className: '',
};

export default InfoWrapper;

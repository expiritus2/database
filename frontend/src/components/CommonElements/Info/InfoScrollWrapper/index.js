import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.module.scss';

const InfoScrollWrapper = (props) => {
    const { children, className } = props;

    return (
        <div className={classNames(styles.infoScrollWrapper, className)}>
            {children}
        </div>
    );
};

InfoScrollWrapper.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
};

InfoScrollWrapper.defaultProps = {
    className: '',
};

export default InfoScrollWrapper;

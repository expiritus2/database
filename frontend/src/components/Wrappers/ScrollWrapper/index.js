import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.module.scss';

const ScrollWrapper = (props) => {
    const { children, className } = props;

    return (
        <div className={classNames(styles.scrollWrapper, className)}>
            {children}
        </div>
    );
};

ScrollWrapper.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
};

ScrollWrapper.defaultProps = {
    className: '',
};

export default ScrollWrapper;

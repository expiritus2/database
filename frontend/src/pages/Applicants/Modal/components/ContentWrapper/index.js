import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.module.scss';

const ContentWrapper = ({ className, children }) => (
    <div className={classNames(styles.contentWrapper, className)}>
        {children}
    </div>
);

ContentWrapper.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
};

ContentWrapper.defaultProps = {
    className: '',
};

export default ContentWrapper;

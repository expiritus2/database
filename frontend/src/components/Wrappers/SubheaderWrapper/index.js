import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.module.scss';

const SubheaderWrapper = (props) => {
    const { children, className } = props;

    return (
        <div className={classNames(styles.subheaderWrapper, className)}>
            {children}
        </div>
    );
};

SubheaderWrapper.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
};

SubheaderWrapper.defaultProps = {
    className: '',
};

export default SubheaderWrapper;

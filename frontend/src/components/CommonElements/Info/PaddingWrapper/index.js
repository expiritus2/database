import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.module.scss';

const PaddingWrapper = (props) => {
    const { children, className } = props;

    return (
        <div className={classNames(styles.paddingWrapper, className)}>
            {children}
        </div>
    );
};

PaddingWrapper.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
};

PaddingWrapper.defaultProps = {
    className: '',
};

export default PaddingWrapper;

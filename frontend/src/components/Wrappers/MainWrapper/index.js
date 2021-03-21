import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.module.scss';

const MainWrapper = (props) => {
    const { children, className } = props;

    return (
        <div className={classNames(styles.mainWrapper, className)}>
            {children}
        </div>
    );
};

MainWrapper.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
};

MainWrapper.defaultProps = {
    className: '',
};

export default MainWrapper;

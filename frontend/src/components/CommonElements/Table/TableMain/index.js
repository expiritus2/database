import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.module.scss';

const Main = (props) => {
    const { className, children } = props;

    return (
        <div className={classNames(styles.main, className)}>
            {children}
        </div>
    );
};

Main.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
};

Main.defaultProps = {
    className: '',
};

export default Main;

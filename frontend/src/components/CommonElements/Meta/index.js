import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.module.scss';

const Meta = (props) => {
    const { className, children } = props;

    return (
        <div className={classNames(styles.meta, className)}>
            {children}
        </div>
    );
};

Meta.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
};

Meta.defaultProps = {
    className: '',
};

export default Meta;

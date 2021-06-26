import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.module.scss';

const NameText = (props) => {
    const { className, children } = props;

    return (
        <div className={classNames(styles.nameText, className)}>
            <h2 className={styles.name}>{children}</h2>
        </div>
    );
};

NameText.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
};

NameText.defaultProps = {
    className: '',
};

export default NameText;

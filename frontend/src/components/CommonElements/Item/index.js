import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.module.scss';

const Item = (props) => {
    const { className, label, value } = props;

    return (
        <div className={classNames(styles.item, className)}>
            <span className={styles.label}>{label}</span>
            <span className={styles.value}>{value}</span>
        </div>
    );
};

Item.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
};

Item.defaultProps = {
    className: '',
    label: '',
    value: '',
};

export default Item;

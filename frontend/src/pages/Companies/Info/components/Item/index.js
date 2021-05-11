import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.module.scss';

const Item = (props) => {
    const { label, value, className } = props;

    return (
        <div className={classNames(styles.item, className)}>
            <div className={styles.label}>
                <span>{`${label}:`}</span>
            </div>
            <div className={styles.value}>{value}</div>
        </div>
    );
};

Item.propTypes = {
    className: PropTypes.string,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
        PropTypes.arrayOf(PropTypes.object),
    ]),
};

Item.defaultProps = {
    className: '',
    label: '',
    value: '',
};

export default Item;

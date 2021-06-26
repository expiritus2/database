import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.module.scss';

const InfoItem = (props) => {
    const { label, value, className } = props;

    return (
        <div className={classNames(styles.item, className)}>
            {label ? <div className={styles.label}>{`${label}:`}</div> : <div className={styles.label} />}
            <div className={styles.value}>{value}</div>
        </div>
    );
};

InfoItem.propTypes = {
    className: PropTypes.string,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.object,
        PropTypes.arrayOf(PropTypes.object),
    ]),
};

InfoItem.defaultProps = {
    className: '',
    label: '',
    value: '',
};

export default InfoItem;

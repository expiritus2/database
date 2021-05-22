/* eslint-disable react/no-array-index-key */
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.module.scss';

const Settings = forwardRef((props, ref) => {
    const { open, className, list } = props;

    if (!open) return null;

    return (
        <div ref={ref} className={classNames(styles.settings, className)}>
            <ul>
                {list.map((item, index) => {
                    const { id, label, onClick, Component } = item || {};

                    return (
                        <li
                            className={styles.item}
                            key={id || index}
                            onClick={(event) => onClick?.(event, item?.id)}
                        >
                            {Component ? <Component label={label} /> : <div>{label}</div>}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
});

Settings.propTypes = {
    className: PropTypes.string,
    open: PropTypes.bool,
    list: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        label: PropTypes.string.isRequired,
        onClick: PropTypes.func,
    })).isRequired,
};

Settings.defaultProps = {
    className: '',
    open: false,
};

export default Settings;

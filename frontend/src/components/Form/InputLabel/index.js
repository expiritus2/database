/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.module.scss';

const InputLabel = ({ id, className, label, altLabel }) => (
    <label className={classNames(styles.label, className)} htmlFor={id}>
        <span>{label || ''}</span>
        {altLabel && <span className={styles.altLabel}>{altLabel}</span>}
    </label>
);

InputLabel.propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    label: PropTypes.string.isRequired,
    altLabel: PropTypes.string,
};

InputLabel.defaultProps = {
    id: undefined,
    className: '',
    altLabel: '',
};

export default InputLabel;

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.module.scss';

const Import = (props) => {
    const { id: elementId, className, onChange, label } = props;

    const onChangeHandler = (event) => {
        onChange(event.target.files);
    };

    return (
        <label className={classNames(styles.files, className)} htmlFor={elementId}>
            <div>{label}</div>
            <input className={styles.nativeInput} id={elementId} type="file" onChange={onChangeHandler} accept=".csv" />
        </label>
    );
};

Import.propTypes = {
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
    onChange: PropTypes.func,
    label: PropTypes.string,
};

Import.defaultProps = {
    className: '',
    onChange: () => {},
    label: undefined,
};

export default Import;

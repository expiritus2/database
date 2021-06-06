import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { FaTrashAlt, FaDownload } from 'react-icons/fa';

import styles from './styles.module.scss';

const FileName = (props) => {
    const { value, className, onDelete } = props;

    return (
        <div className={classNames(styles.fileName, className)}>
            <div className={styles.name}>{value}</div>
            <div className={styles.actions}>
                <FaDownload className={classNames(styles.icon, styles.downloadIcon)} />
                <FaTrashAlt onClick={onDelete} className={classNames(styles.icon, styles.removeIcon)} />
            </div>
        </div>
    );
};

FileName.propTypes = {
    className: PropTypes.string,
    value: PropTypes.string,
    onDelete: PropTypes.func,
};

FileName.defaultProps = {
    className: '',
    value: '',
    onDelete: () => {},
};

export default FileName;

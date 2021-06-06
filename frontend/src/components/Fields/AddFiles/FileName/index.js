import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { FaTrashAlt, FaDownload } from 'react-icons/fa';

import styles from './styles.module.scss';

const FileName = (props) => {
    const { name, className } = props;

    return (
        <div className={classNames(styles.fileName, className)}>
            <div className={styles.name}>{name}</div>
            <div className={styles.actions}>
                <FaDownload className={classNames(styles.icon, styles.downloadIcon)} />
                <FaTrashAlt className={classNames(styles.icon, styles.removeIcon)} />
            </div>
        </div>
    );
};

FileName.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
};

FileName.defaultProps = {
    className: '',
    name: '',
};

export default FileName;

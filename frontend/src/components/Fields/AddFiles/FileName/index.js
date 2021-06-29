import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import axios from 'axios';
import { downloadFile } from 'helpers';
import { FaTrashAlt, FaDownload } from 'react-icons/fa';

import styles from './styles.module.scss';

const FileName = (props) => {
    const { file, className, onDelete } = props;

    const onDownload = () => {
        if (file?.data) {
            const src = `data:${file?.contentType};base64,${file?.data}`;
            downloadFile().byLink(src, file?.filename);
        } else {
            axios.get(file?.url, { responseType: 'blob' }).then((res) => {
                downloadFile().asBlob(res?.data, file?.filename);
            });
        }
    };

    return (
        <div className={classNames(styles.fileName, className)}>
            <div className={styles.name}>{file?.filename}</div>
            <div className={styles.actions}>
                <FaDownload onClick={onDownload} className={classNames(styles.icon, styles.downloadIcon)} />
                <FaTrashAlt onClick={onDelete} className={classNames(styles.icon, styles.removeIcon)} />
            </div>
        </div>
    );
};

FileName.propTypes = {
    className: PropTypes.string,
    file: PropTypes.shape({
        filename: PropTypes.string,
        url: PropTypes.string,
        data: PropTypes.string,
        contentType: PropTypes.string,
    }),
    onDelete: PropTypes.func,
};

FileName.defaultProps = {
    className: '',
    file: null,
    onDelete: () => {},
};

export default FileName;

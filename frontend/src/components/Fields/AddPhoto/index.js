import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { IoIosClose } from 'react-icons/io';
import { GrAddCircle } from 'react-icons/gr';
import { readFiles } from 'helpers';
import { cloneDeep } from 'lodash-es';

import styles from './styles.module.scss';

const AddPhoto = (props) => {
    const { id: elementId, className, onChange, value } = props;
    const [filesValue, setFilesValue] = useState(value);

    const fileInputField = useRef();

    const onChangeHandler = (event) => {
        readFiles(event.target.files)
            .then((values) => {
                const newFilesValue = values
                    .map((file) => ({ ...file, data: file?.data ? btoa(file?.data) : undefined }));
                setFilesValue([...filesValue, ...newFilesValue]);
                onChange(event.target.files, newFilesValue);
            });
    };

    const onRemove = (event, index) => {
        event.stopPropagation();
        event.preventDefault();
        const clonedPreviewValue = cloneDeep(filesValue);

        clonedPreviewValue.splice(index, 1);
        setFilesValue(clonedPreviewValue);

        onChange(clonedPreviewValue, []);
    };

    const getPreview = () => (filesValue?.length ? filesValue.map(({ url, data }, index) => {
        const previewUrl = url || `data:image/jpeg;base64,${data}`;
        return (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index} className={styles.file}>
                <IoIosClose onClick={(event) => onRemove(event, index)} className={styles.removeIcon} />
                <img src={previewUrl} alt="" />
            </div>
        );
    }) : null);

    const getAddIcon = () => (
        <GrAddCircle className={styles.addIcon} />
    );

    return (
        <div className={classNames(styles.filesWrapper, className)}>
            <label className={styles.files} htmlFor={elementId}>
                {getPreview()}
                <div className={styles.file}>
                    {getAddIcon()}
                </div>
                <input
                    ref={fileInputField}
                    multiple
                    className={styles.nativeInput}
                    id={elementId}
                    type="file"
                    onChange={onChangeHandler}
                />
            </label>
        </div>
    );
};

AddPhoto.propTypes = {
    className: PropTypes.string,
    value: PropTypes.arrayOf(PropTypes.any),
    onChange: PropTypes.func,
    id: PropTypes.string.isRequired,
};

AddPhoto.defaultProps = {
    className: '',
    value: null,
    onChange: () => {
    },
};

export default AddPhoto;

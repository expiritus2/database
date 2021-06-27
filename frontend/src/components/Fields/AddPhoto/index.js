import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { IoIosClose } from 'react-icons/io';
import { GrAddCircle } from 'react-icons/gr';
import { readFiles } from 'helpers';
import { cloneDeep } from 'lodash-es';

import styles from './styles.module.scss';

const AddPhoto = (props) => {
    const { id: elementId, className, onChange, value, multiple } = props;
    const [filesValue, setFilesValue] = useState(value);

    const fileInputField = useRef();

    const onChangeHandler = (event) => {
        readFiles(event.target.files)
            .then((values) => {
                if (multiple) {
                    const newFilesValue = values
                        .map((file) => ({ ...file, data: file?.data ? btoa(file?.data) : undefined }));
                    const combinedFiles = [...(filesValue || []), ...newFilesValue];
                    setFilesValue(combinedFiles);
                    onChange(event.target.files, combinedFiles);
                } else {
                    if (!values?.length) {
                        setFilesValue(null);
                        return onChange(event.target.files, null);
                    }
                    const file = values?.[0];
                    const preparedFile = { ...file, data: file?.data ? btoa(file?.data) : undefined };
                    setFilesValue(preparedFile);
                    onChange(event.target.files, preparedFile);
                }
            });
    };

    const onRemove = (event, index) => {
        event.stopPropagation();
        event.preventDefault();

        if (multiple) {
            const clonedPreviewValue = cloneDeep(filesValue);

            clonedPreviewValue.splice(index, 1);
            setFilesValue(clonedPreviewValue);

            onChange([], clonedPreviewValue);
        } else {
            setFilesValue(null);
            onChange([], null);

            if (fileInputField?.current) {
                fileInputField.current.value = null;
            }
        }
    };

    const getPreview = () => {
        if (multiple) {
            if (!filesValue?.length) return null;
            return (
                filesValue.map(({ url, data }, index) => {
                    const previewUrl = url || `data:image/jpeg;base64,${data}`;
                    return (
                        // eslint-disable-next-line react/no-array-index-key
                        <div key={index} className={styles.file}>
                            <IoIosClose onClick={(event) => onRemove(event, index)} className={styles.removeIcon} />
                            <img src={previewUrl} alt="" />
                        </div>
                    );
                }));
        }

        if (!Object.keys(filesValue || {}).length) {
            return null;
        }
        const { url, data } = filesValue || {};
        const previewUrl = url || `data:image/jpeg;base64,${data}`;
        return (
            <div className={styles.file}>
                <IoIosClose onClick={(event) => onRemove(event)} className={styles.removeIcon} />
                <img src={previewUrl} alt="" />
            </div>
        );
    };

    const getAddIcon = () => (
        <GrAddCircle className={styles.addIcon} />
    );

    return (
        <div className={classNames(styles.filesWrapper, className)}>
            <label className={styles.files} htmlFor={elementId}>
                {getPreview()}
                {(multiple || (!multiple && !Object.keys(filesValue || {}).length)) && (
                    <div className={styles.file}>
                        {getAddIcon()}
                    </div>
                )}
                <input
                    ref={fileInputField}
                    multiple={multiple}
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
    value: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.any), PropTypes.object]),
    onChange: PropTypes.func,
    id: PropTypes.string.isRequired,
    multiple: PropTypes.bool,
};

AddPhoto.defaultProps = {
    className: '',
    value: null,
    onChange: () => {
    },
    multiple: true,
};

export default AddPhoto;

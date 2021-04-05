/* eslint-disable jsx-a11y/label-has-associated-control,react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Paper from '@material-ui/core/Paper';
import { IoIosClose } from 'react-icons/io';
import { GrAddCircle } from 'react-icons/gr';
import { getImagesPreview } from 'helpers';
import { cloneDeep } from 'lodash-es';

import styles from './styles.module.scss';

const AddPhoto = (props) => {
    const { className, onChange, value } = props;
    const [previewValues, setPreviewValues] = useState(value);
    const [filesValue, setFilesValue] = useState(value || []);

    useEffect(() => {
        getImagesPreview(value)
            .then((values) => {
                const newPreviewValues = [...previewValues, ...values];
                setPreviewValues(newPreviewValues);
            }).catch(() => {});
    }, []); // eslint-disable-line

    const onChangeHandler = (event) => {
        getImagesPreview(event.target.files).then((values) => {
            const newPreviewValues = [...previewValues, ...values];
            setPreviewValues(newPreviewValues);

            const newFilesValues = [...filesValue, ...event.target.files];
            setFilesValue(newFilesValues);
            onChange(newFilesValues, event.target.files);
        });
    };

    const onRemove = (event, index) => {
        event.stopPropagation();
        event.preventDefault();
        const clonedPreviewValue = cloneDeep(previewValues);
        const clonedFilesValue = cloneDeep(filesValue);

        clonedPreviewValue.splice(index, 1);
        clonedFilesValue.splice(index, 1);

        setPreviewValues(clonedPreviewValue);
        setFilesValue(clonedFilesValue);
        onChange(clonedFilesValue, []);
    };

    const getPreview = () => (previewValues?.length ? previewValues.map(({ url }, index) => (
        <div key={index} className={styles.file}>
            <IoIosClose onClick={(event) => onRemove(event, index)} className={styles.removeIcon} />
            <img src={url} alt="" />
        </div>
    )) : null);

    const getAddIcon = () => (
        <GrAddCircle className={styles.addIcon} />
    );

    return (
        <Paper elevation={3} className={classNames(styles.filesWrapper, className)}>
            <label className={styles.files} htmlFor="photo">
                {getPreview()}
                <div className={styles.file}>
                    {getAddIcon()}
                </div>
                <input multiple className={styles.nativeInput} id="photo" type="file" onChange={onChangeHandler} />
            </label>
        </Paper>
    );
};

AddPhoto.propTypes = {
    className: PropTypes.string,
    value: PropTypes.arrayOf(PropTypes.any),
    onChange: PropTypes.func,
};

AddPhoto.defaultProps = {
    className: '',
    value: null,
    onChange: () => {
    },
};

export default AddPhoto;

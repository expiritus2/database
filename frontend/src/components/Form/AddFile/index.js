/* eslint-disable jsx-a11y/label-has-associated-control,react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useTranslate } from 'hooks';
import { Button } from 'components';
import Paper from '@material-ui/core/Paper';
import { IoIosClose } from 'react-icons/io';
import { GrAddCircle } from 'react-icons/gr';
import { getImagesPreview } from 'helpers';
import { cloneDeep } from 'lodash-es';
import File from './File';

import styles from './styles.module.scss';

const AddFile = (props) => {
    const { className, onChange, value, variant } = props;
    const { translate } = useTranslate();
    const [previewValues, setPreviewValues] = useState(value);
    const [filesValue, setFilesValue] = useState(value || []);

    useEffect(() => {
        getImagesPreview(value)
            .then((values) => {
                const newPreviewValues = [...previewValues, ...values];
                if (variant !== AddFile.file) {
                    setPreviewValues(newPreviewValues);
                }
            }).catch(() => {});
    }, []); // eslint-disable-line

    const onChangeHandler = (event) => {
        getImagesPreview(event.target.files).then((values) => {
            if (variant !== AddFile.file) {
                const newPreviewValues = [...previewValues, ...values];
                setPreviewValues(newPreviewValues);
            }

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

    const getPreview = () => {
        if (variant === AddFile.photo) {
            return (previewValues?.length ? previewValues.map(({ url }, index) => (
                <div key={index} className={styles.file}>
                    <IoIosClose onClick={(event) => onRemove(event, index)} className={styles.removeIcon} />
                    <img src={url} alt="" />
                </div>
            )) : null);
        }

        if (variant === AddFile.file) {
            return (filesValue?.length ? filesValue.map((file, index) => (
                <div key={index} className={styles.file}>
                    <File file={file} onDelete={(event) => onRemove(event, index)} />
                </div>
            )) : null);
        }
    };

    const getAddIcon = () => (
        variant === AddFile.photo
            ? <GrAddCircle className={styles.addIcon} />
            : <Button className={styles.addButton} color="primary">{translate.AddFile}</Button>
    );

    return (
        <Paper elevation={3} className={classNames(styles.filesWrapper, styles[variant], className)}>
            <label className={styles.files} htmlFor={variant}>
                {getPreview()}
                <div className={styles.file}>
                    {getAddIcon()}
                </div>
                <input multiple className={styles.nativeInput} id={variant} type="file" onChange={onChangeHandler} />
            </label>
        </Paper>
    );
};

AddFile.photo = 'photo';
AddFile.file = 'file';

AddFile.propTypes = {
    className: PropTypes.string,
    value: PropTypes.arrayOf(PropTypes.any),
    onChange: PropTypes.func,
    variant: PropTypes.string,
};

AddFile.defaultProps = {
    className: '',
    value: null,
    onChange: () => {
    },
    variant: AddFile.photo,
};

export default AddFile;

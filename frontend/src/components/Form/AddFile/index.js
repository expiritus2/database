/* eslint-disable jsx-a11y/label-has-associated-control,react/no-array-index-key */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { IoIosClose } from 'react-icons/io';
import { GrAddCircle } from 'react-icons/gr';
import { getImagesPreview } from 'helpers';

import { cloneDeep } from 'lodash-es';
import styles from './styles.module.scss';

const AddFile = (props) => {
    const { className, onChange, value, type } = props;
    const [previewValues, setPreviewValues] = useState(value || []);
    const [filesValue, setFilesValue] = useState([]);

    const onChangeHandler = (event) => {
        getImagesPreview(event.target.files).then((values) => {
            const newPreviewValues = [...previewValues, ...values];
            const newFilesValues = [...filesValue, ...event.target.files];
            setPreviewValues(newPreviewValues);
            setFilesValue(newFilesValues);
            onChange(newFilesValues, event.target.files);
        });
    };

    const onRemove = (event, index) => {
        event.stopPropagation();
        event.preventDefault();
        const clonedValue = cloneDeep(previewValues);
        clonedValue.splice(index, 1);
        setPreviewValues(clonedValue);
    };

    return (
        <div className={classNames(styles.filesWrapper, styles[type], className)}>
            <label className={styles.photos} htmlFor="photo">
                {previewValues?.length ? previewValues.map(({ url }, index) => (
                    <div key={index} className={styles.avatar}>
                        <IoIosClose onClick={(event) => onRemove(event, index)} className={styles.removeIcon} />
                        <img src={url} alt="" />
                    </div>
                )) : null}
                <div className={styles.avatar}>
                    <GrAddCircle className={styles.addIcon} />
                </div>
                <input multiple className={styles.nativeInput} id="photo" type="file" onChange={onChangeHandler} />
            </label>
        </div>
    );
};

AddFile.photo = 'photo';
AddFile.file = 'file';

AddFile.propTypes = {
    className: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    type: PropTypes.string,
};

AddFile.defaultProps = {
    className: '',
    value: null,
    onChange: () => {},
    type: AddFile.photo,
};

export default AddFile;

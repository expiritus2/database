import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { readFiles } from 'helpers';
import { useTranslate } from 'hooks';
import { Button } from 'components/Form';
import { cloneDeep } from 'lodash-es';
import Table from './Table';

import styles from './styles.module.scss';

const AddFile = (props) => {
    const { id: elementId, className, onChange, value } = props;
    const { translate } = useTranslate();
    const [filesValue, setFilesValue] = useState(value);

    const onChangeHandler = (event) => {
        readFiles(event.target.files)
            .then((values) => {
                const newFilesValue = values
                    .map((file) => ({ ...file, data: file?.data ? btoa(file?.data) : undefined }));
                const combinedFiles = [...filesValue, ...newFilesValue];
                setFilesValue(combinedFiles);
                onChange(event.target.files, combinedFiles);
            });
    };

    const onChangeFileType = (event, val, index) => {
        const copyFilesValue = cloneDeep(filesValue);
        copyFilesValue[index].fileType = val;
        setFilesValue(copyFilesValue);
        onChange(null, copyFilesValue);
    };

    const onDeleteFile = (event, index) => {
        const copyFilesValue = cloneDeep(filesValue);
        copyFilesValue.splice(index, 1);
        setFilesValue(copyFilesValue);
        onChange(null, copyFilesValue);
    };

    return (
        <div className={classNames(styles.filesWrapper, className)}>
            <div className={styles.actionsWrapper}>
                <label className={styles.files} htmlFor={elementId}>
                    <div className={styles.actions}>
                        <Button className={styles.actionButton} color="primary" title={translate.AddFile} />
                    </div>
                    <input multiple className={styles.nativeInput} id={elementId} type="file" onChange={onChangeHandler} />
                </label>
            </div>
            <Table
                className={styles.table}
                files={filesValue}
                onChangeFileType={onChangeFileType}
                onDeleteFile={onDeleteFile}
            />
        </div>
    );
};

AddFile.propTypes = {
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
    value: PropTypes.arrayOf(PropTypes.any),
    onChange: PropTypes.func,
};

AddFile.defaultProps = {
    className: '',
    value: [],
    onChange: () => {},
};

export default AddFile;

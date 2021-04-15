/* eslint-disable jsx-a11y/label-has-associated-control,react/no-array-index-key,no-param-reassign */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useTranslate } from 'hooks';
import { Button } from 'components';
import { uniqueId } from 'lodash-es';
import Table from './Table';

import styles from './styles.module.scss';

const AddFile = (props) => {
    const { className, onChange, value } = props;
    const { translate } = useTranslate();
    const [filesValue, setFilesValue] = useState(value);
    const [selectedFiles, setSelectedFiles] = useState([]);

    const onChangeHandler = (event) => {
        const newFilesValues = [
            ...filesValue,
            ...Array.from(event.target.files).map((file) => ({ id: uniqueId(), data: file })),
        ];

        setFilesValue(newFilesValues);
        onChange(newFilesValues, event.target.files);
    };

    const onRemove = (event) => {
        event.stopPropagation();
        event.preventDefault();

        const selectedIds = selectedFiles.map(({ id }) => id);
        const newFilesValue = filesValue.filter((file) => !selectedIds.includes(file.id));

        setFilesValue(newFilesValue);
        setSelectedFiles([]);
        onChange(newFilesValue, []);
    };

    const onSelectChange = (selections) => {
        setSelectedFiles(selections);
    };

    return (
        <div className={classNames(styles.filesWrapper, className)}>
            <div className={styles.actionsWrapper}>
                <label className={styles.files} htmlFor="file">
                    <div className={styles.actions}>
                        <Button className={styles.actionButton} color="primary">{translate.AddFile}</Button>
                    </div>
                    <input multiple className={styles.nativeInput} id="file" type="file" onChange={onChangeHandler} />
                </label>
                <Button onClick={onRemove} className={styles.actionButton} color="primary">{translate.Delete}</Button>
            </div>
            <Table
                className={styles.table}
                files={filesValue}
                onSelectChange={onSelectChange}
                selections={selectedFiles}
            />
        </div>
    );
};

AddFile.propTypes = {
    className: PropTypes.string,
    value: PropTypes.arrayOf(PropTypes.any),
    onChange: PropTypes.func,
};

AddFile.defaultProps = {
    className: '',
    value: null,
    onChange: () => {
    },
};

export default AddFile;

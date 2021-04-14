/* eslint-disable jsx-a11y/label-has-associated-control,react/no-array-index-key,no-param-reassign */
import React, { useState, useEffect } from 'react';
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
    const [filesValue, setFilesValue] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);

    useEffect(() => {
        const newValue = value.map((val) => ({ id: uniqueId(), url: val?.url || val }));
        setFilesValue(newValue);
    }, [value]); // eslint-disable-line

    console.log(filesValue);

    const onChangeHandler = (event) => {
        const newFilesValues = [...filesValue, ...event.target.files];
        newFilesValues.forEach((newFile) => {
            newFile.id = uniqueId();
        });

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

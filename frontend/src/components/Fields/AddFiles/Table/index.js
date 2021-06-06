import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Table as CommonTable } from 'components';
import { useTranslate } from 'hooks';

import FileName from '../FileName';
import FileType from '../FileType';

// import { downloadFile } from 'helpers';

import styles from './styles.module.scss';

const TableComponent = (props) => {
    const { className, files, onSelectChange, selections, onChangeFileType, onDeleteFile } = props;
    const { translate } = useTranslate();

    // const getFileLink = (file) => {
    //     const url = file?.url || '';
    //     const parts = url.split('/');
    //     const filename = parts.pop();
    //     const firstHyphenIndex = filename.split('').findIndex((char) => char === '-');
    //     const trimmedFilename = filename.substring(firstHyphenIndex + 1);
    //
    //     return <span>{trimmedFilename}</span>;
    // };
    //
    // getFileLink();

    const getColumns = () => [
        { key: 'type', title: 'Type', width: '50%' },
        { key: 'name', title: translate.Name, width: '50%' },
    ];

    const getRows = () => files.map((file, index) => ({
        id: file.id || index,
        type: (
            <FileType
                onChangeFileType={(event, val) => onChangeFileType(event, val, index)}
                value={file?.fileType}
                index={index}
            />
        ),
        name: <FileName value={file?.filename} onDelete={() => onDeleteFile(index)} index={index} />,
    }));

    // const onClickRow = (e, rowValue) => {
    //     if (rowValue?.url) {
    //         downloadFile(true).byLink(rowValue?.url);
    //     }
    //
    //     if (rowValue?.data) {
    //         downloadFile().asBlob(rowValue?.data, rowValue?.name);
    //     }
    // };

    return (
        <div className={classNames(styles.filesTable, className)}>
            <CommonTable
                initSelections={selections}
                onSelectChange={onSelectChange}
                columns={getColumns()}
                data={getRows()}
                // onClickRow={onClickRow}
                selectable={false}
                rowClassName={styles.fileRow}
                cellClassName={styles.fileCell}
                className={styles.filesTableHolder}
            />
        </div>
    );
};

TableComponent.propTypes = {
    className: PropTypes.string,
    files: PropTypes.arrayOf(PropTypes.shape({})),
    onSelectChange: PropTypes.func,
    selections: PropTypes.arrayOf(PropTypes.shape({})),
    onChangeFileType: PropTypes.func,
    onDeleteFile: PropTypes.func,
};

TableComponent.defaultProps = {
    className: '',
    files: [],
    onSelectChange: () => {},
    selections: [],
    onChangeFileType: () => {},
    onDeleteFile: () => {},
};

export default TableComponent;

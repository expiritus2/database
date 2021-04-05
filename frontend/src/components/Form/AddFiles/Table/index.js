import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Table as CommonTable } from 'components';
import { useTranslate } from 'hooks';

import styles from './styles.module.scss';

const TableComponent = (props) => {
    const { className, files, onSelectChange, selections } = props;
    const { translate } = useTranslate();

    const getColumns = () => [
        { key: 'type', title: 'Type', width: '50%' },
        { key: 'name', title: translate.Name, width: '50%' },
    ];

    const getRows = () => files.map((file) => ({
        id: file.id,
        type: file.type,
        name: file.name,
    }));

    return (
        <div className={classNames(styles.filesTable, className)}>
            <CommonTable
                initSelections={selections}
                onSelectChange={onSelectChange}
                columns={getColumns()}
                data={getRows()}
            />
        </div>
    );
};

TableComponent.propTypes = {
    className: PropTypes.string,
    files: PropTypes.arrayOf(PropTypes.shape({})),
    onSelectChange: PropTypes.func,
    selections: PropTypes.arrayOf(PropTypes.shape({})),
};

TableComponent.defaultProps = {
    className: '',
    files: [],
    onSelectChange: () => {},
    selections: [],
};

export default TableComponent;

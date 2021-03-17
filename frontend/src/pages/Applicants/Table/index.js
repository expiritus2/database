import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useTranslate } from 'hooks';
import { Table as CommonTable } from 'components';

import styles from './styles.module.scss';

const ApplicantTable = (props) => {
    const { data, className } = props;
    const { translate } = useTranslate();

    const getColumns = () => [
        { key: 'id', title: 'ID', width: '5%' },
        { key: 'salary', title: translate.Salary, width: '47.5%' },
        { key: 'name', title: translate.Name, width: '47.5%' },
    ];

    const getRows = () => {
        if (!data?.rows) return [];
        return data?.rows?.map((row) => ({
            id: row?.id,
            salary: row?.salary,
            name: row?.name,
        }));
    };

    return (
        <div className={classNames(styles.applicantsTable, className)}>
            <CommonTable columns={getColumns()} data={getRows()} selectable={false} />
        </div>
    );
};

ApplicantTable.propTypes = {
    className: PropTypes.string,
    data: PropTypes.shape({
        count: PropTypes.number,
        rows: PropTypes.arrayOf(PropTypes.shape({})),
    }),
};

ApplicantTable.defaultProps = {
    className: '',
    data: {},
};

export default ApplicantTable;

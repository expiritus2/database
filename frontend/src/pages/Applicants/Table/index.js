import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { setCurrentApplicantEffect } from 'store/effects/applicants';
import { useTranslate } from 'hooks';
import { Table as CommonTable } from 'components';

import { useSelector, useDispatch } from 'react-redux';
import { getApplicantsSelector } from 'store/selectors/applicants';
import Salary from './Salary';
import Name from './Name';

import styles from './styles.module.scss';

const ApplicantTable = (props) => {
    const { className } = props;
    const dispatch = useDispatch();
    const { data } = useSelector(getApplicantsSelector);

    const { translate } = useTranslate();

    const getColumns = () => [
        { key: 'id', title: 'ID', width: '7%' },
        { key: 'salary', title: translate.Salary, width: '15%' },
        { key: 'name', title: translate.Name, width: '78%' },
    ];

    const getRows = () => {
        if (!data) return [];
        return data?.map((row) => ({
            id: row?.id,
            salary: <Salary value={row?.salary.amount} currency={row?.salary?.currency} />,
            name: <Name {...row} />,
        }));
    };

    const onClickRow = (event, rowInfo) => {
        dispatch(setCurrentApplicantEffect({ id: rowInfo?.id }));
    };

    return (
        <div className={classNames(styles.applicantsTable, className)}>
            <CommonTable
                className={styles.tableHolder}
                columns={getColumns()}
                data={getRows()}
                selectable={false}
                onClickRow={onClickRow}
            />
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

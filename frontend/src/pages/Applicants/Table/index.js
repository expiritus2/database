import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useTranslate } from 'hooks';
import { Table as CommonTable, SalaryValue } from 'components';
import { getApplicantEffect } from 'store/effects/applicants';
import { useSelector, useDispatch } from 'react-redux';
import { getApplicantsSelector } from 'store/selectors/applicants';
import { getCurrentApplicantSelector } from 'store/selectors/applicant';
import Name from './Name';

import styles from './styles.module.scss';

const ApplicantTable = (props) => {
    const { className } = props;
    const dispatch = useDispatch();
    const { data, count } = useSelector(getApplicantsSelector);
    const { applicant } = useSelector(getCurrentApplicantSelector);

    const { translate } = useTranslate();

    const getColumns = () => {
        if (!data) return [];
        return [
            { key: 'id', title: 'ID', width: '7%' },
            { key: 'salary', title: translate.Salary, width: '15%' },
            { key: 'name', title: translate.Name, width: '78%', className: styles.colName },
        ];
    };

    const getRows = () => {
        if (!data) return [];
        return data?.map((row) => ({
            id: row?.id,
            salary: <SalaryValue value={row?.salary?.amount} currency={row?.salary?.currency?.label} />,
            name: <Name {...row} />,
        }));
    };

    const onClickRow = (event, rowInfo) => {
        if (rowInfo?.id !== applicant?.id) {
            dispatch(getApplicantEffect({ id: rowInfo?.id }));
        }
    };

    return (
        <div className={classNames(styles.applicantsTable, className)}>
            <CommonTable
                className={styles.tableHolder}
                count={count}
                columns={getColumns()}
                data={getRows()}
                selectable={false}
                onClickRow={onClickRow}
                rowClassName={styles.applicantRow}
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

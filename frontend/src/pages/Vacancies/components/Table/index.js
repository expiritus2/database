import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { getVacancyEffect } from 'store/effects/vacancies';
import { useTranslate } from 'hooks';
import { Table as CommonTable } from 'components';

import { useSelector, useDispatch } from 'react-redux';
import { getVacanciesSelector } from 'store/selectors/vacancies';
import { getCurrentVacancySelector } from 'store/selectors/vacancy';
import { SalaryValue } from '../index';
import Name from './Name';

import styles from './styles.module.scss';

const VacancyTable = (props) => {
    const { className } = props;
    const dispatch = useDispatch();
    const { vacancies, count } = useSelector(getVacanciesSelector);
    const { vacancy } = useSelector(getCurrentVacancySelector);

    const { translate } = useTranslate();

    const getColumns = () => {
        if (!vacancies) return [];
        return [
            { key: 'id', title: 'ID', width: '7%' },
            { key: 'salaryRange', title: translate.Salary, width: '15%' },
            { key: 'name', title: translate.Name, width: '78%', className: styles.colName },
        ];
    };

    const getRows = () => {
        if (!vacancies) return [];
        return vacancies?.map((row) => ({
            id: row?.id,
            salaryRange: <SalaryValue value={row?.salaryRange} currency={row?.salaryRange?.currency?.label} />,
            name: <Name {...row} />,
        }));
    };

    const onClickRow = (event, rowInfo) => {
        if (vacancy?.id !== rowInfo?.id) {
            dispatch(getVacancyEffect({ id: rowInfo?.id }));
        }
    };

    return (
        <div className={classNames(styles.vacancyTable, className)}>
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

VacancyTable.propTypes = {
    className: PropTypes.string,
    data: PropTypes.shape({
        count: PropTypes.number,
        rows: PropTypes.arrayOf(PropTypes.shape({})),
    }),
};

VacancyTable.defaultProps = {
    className: '',
    data: {},
};

export default VacancyTable;

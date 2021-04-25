import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { setCurrentVacancyEffect } from 'store/effects/vacancies';
import { useTranslate } from 'hooks';
import { Table as CommonTable } from 'components';

import { useSelector, useDispatch } from 'react-redux';
import { getVacanciesSelector } from 'store/selectors/vacancies';
import Name from './Name';
import SalaryValue from './SalaryValue';

import styles from './styles.module.scss';

const VacancyTable = (props) => {
    const { className } = props;
    const dispatch = useDispatch();
    const { data, count } = useSelector(getVacanciesSelector);

    const { translate } = useTranslate();

    const getColumns = () => {
        if (!data) return [];
        return [
            { key: 'id', title: 'ID', width: '10%' },
            { key: 'salary', title: translate.Salary, width: '20%' },
            { key: 'name', title: translate.Name, width: '93%' },
        ];
    };

    const getRows = () => {
        if (!data) return [];
        return data?.map((row) => ({
            id: row?.id,
            salary: <SalaryValue value={row?.salary} currency={row?.salary?.currency} />,
            name: <Name {...row} />,
        }));
    };

    const onClickRow = (event, rowInfo) => {
        dispatch(setCurrentVacancyEffect({ id: rowInfo?.id }));
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

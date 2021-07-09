import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useTranslate } from 'hooks';
import { Table as CommonTable } from 'components';
import { getCompanyEffect } from 'store/effects/companies';
import { useSelector, useDispatch } from 'react-redux';
import { getCompaniesSelector } from 'store/selectors/companies';
import { getCurrentCompanySelector } from 'store/selectors/company';
import Name from './Name';

import styles from './styles.module.scss';

const CompanyTable = (props) => {
    const { className } = props;
    const dispatch = useDispatch();
    const { data, count } = useSelector(getCompaniesSelector);
    const { company } = useSelector(getCurrentCompanySelector);

    const { translate } = useTranslate();

    const getColumns = () => {
        if (!data) return [];
        return [
            { key: 'id', title: 'ID', width: '23.79%' },
            { key: 'name', title: translate.Name, width: '76.21%', className: styles.colName },
        ];
    };

    const getRows = () => {
        if (!data) return [];
        return data?.map((row) => ({
            id: row?.id,
            name: <Name {...row} />,
        }));
    };

    const onClickRow = (event, rowInfo) => {
        if (rowInfo?.id !== company?.id) {
            dispatch(getCompanyEffect({ id: rowInfo?.id }));
        }
    };

    return (
        <div className={classNames(styles.companiesTable, className)}>
            <CommonTable
                className={styles.tableHolder}
                count={count}
                columns={getColumns()}
                data={getRows()}
                selectable={false}
                onClickRow={onClickRow}
                rowClassName={styles.companyRow}
            />
        </div>
    );
};

CompanyTable.propTypes = {
    className: PropTypes.string,
    data: PropTypes.shape({
        count: PropTypes.number,
        rows: PropTypes.arrayOf(PropTypes.shape({})),
    }),
};

CompanyTable.defaultProps = {
    className: '',
    data: {},
};

export default CompanyTable;

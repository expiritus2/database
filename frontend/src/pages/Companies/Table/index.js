import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { setCurrentCompanyEffect } from 'store/effects/companies';
import { useTranslate } from 'hooks';
import { Table as CommonTable } from 'components';

import { useSelector, useDispatch } from 'react-redux';
import { getCompaniesSelector } from 'store/selectors/companies';
import Name from './Name';

import styles from './styles.module.scss';

const CompanyTable = (props) => {
    const { className } = props;
    const dispatch = useDispatch();
    const { data, count } = useSelector(getCompaniesSelector);

    const { translate } = useTranslate();

    const getColumns = () => {
        if (!data) return [];
        return [
            { key: 'id', title: 'ID', width: '15%' },
            { key: 'name', title: translate.Name, width: '93%' },
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
        dispatch(setCurrentCompanyEffect({ id: rowInfo?.id }));
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

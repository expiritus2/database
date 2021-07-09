import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { getContactEffect } from 'store/effects/contacts';
import { useTranslate } from 'hooks';
import { Table as CommonTable } from 'components';

import { useSelector, useDispatch } from 'react-redux';
import { getContactsSelector } from 'store/selectors/contacts';
import { getCurrentContactSelector } from 'store/selectors/contact';
import Name from './Name';

import styles from './styles.module.scss';

const ContactTable = (props) => {
    const { className } = props;
    const dispatch = useDispatch();
    const { data, count } = useSelector(getContactsSelector);
    const { contact } = useSelector(getCurrentContactSelector);

    const { translate } = useTranslate();

    const getColumns = () => {
        if (!data) return [];
        return [
            { key: 'id', title: 'ID', width: '22%' },
            { key: 'name', title: translate.Name, width: '78%', className: styles.colName },
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
        if (rowInfo?.id !== contact?.id) {
            dispatch(getContactEffect({ id: rowInfo?.id }));
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
                rowClassName={styles.contactRow}
            />
        </div>
    );
};

ContactTable.propTypes = {
    className: PropTypes.string,
    data: PropTypes.shape({
        count: PropTypes.number,
        rows: PropTypes.arrayOf(PropTypes.shape({})),
    }),
};

ContactTable.defaultProps = {
    className: '',
    data: {},
};

export default ContactTable;

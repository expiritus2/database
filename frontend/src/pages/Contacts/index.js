import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';

import { getContactsEffect, setContactsSearchEffect } from 'store/effects/contacts';
import { getContactsSearchSelector, getContactsSelector } from 'store/selectors/contacts';
import { Header, ScrollWrapper, ContentWrapper, InfoWrapper, MainWrapper, TablePagination, PendingWrapper, SubHeader } from 'components';
import AddModal from './Modal';
import Table from './Table';
import Info from './Info';

import styles from './styles.module.scss';

const Contacts = () => {
    const { isPending, isIdle, count, meta } = useSelector(getContactsSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isIdle) {
            dispatch(getContactsEffect());
        } else {
            dispatch(getContactsEffect({}, { silent: true }));
        }
    }, []); // eslint-disable-line

    const onChangePaginationValueHandler = (event, page, countPerPage) => {
        dispatch(getContactsEffect({ page, countPerPage }));
    };

    const onSearchHandler = (search) => {
        dispatch(setContactsSearchEffect(search));
        dispatch(getContactsEffect());
    };

    const onActiveHandler = (search) => {
        dispatch(setContactsSearchEffect(search));
        dispatch(getContactsEffect({ page: 0 }));
    };

    return (
        <>
            <Header />
            <MainWrapper>
                <ContentWrapper>
                    <SubHeader
                        onSearch={onSearchHandler}
                        onActive={onActiveHandler}
                        searchSelector={getContactsSearchSelector}
                        refreshEffect={(cfg, options, cb) => getContactsEffect(cfg, { ...options, silent: true }, cb)}
                    />
                    <ScrollWrapper>
                        <PendingWrapper
                            className={classNames(styles.pendingWrapper, { [styles.isPending]: isPending })}
                            isPending={isPending}
                        >
                            <Table />
                        </PendingWrapper>
                    </ScrollWrapper>
                    <TablePagination
                        onChangePage={onChangePaginationValueHandler}
                        onChangeCountPerPage={onChangePaginationValueHandler}
                        className={styles.tablePagination}
                        page={meta?.page}
                        count={count}
                    />
                </ContentWrapper>
                <InfoWrapper>
                    <Info />
                </InfoWrapper>
            </MainWrapper>
            <AddModal />
        </>
    );
};

export default Contacts;

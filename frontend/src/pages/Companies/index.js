import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';

import { getCompaniesEffect, setCompaniesSearchEffect } from 'store/effects/companies';
import { getCompaniesSearchSelector, getCompaniesSelector } from 'store/selectors/companies';
import { Header, ScrollWrapper, ContentWrapper, InfoWrapper, MainWrapper, TablePagination, PendingWrapper, SubHeader } from 'components';
import { AddModal, SearchDrawer, Table, Info } from './componets';

import styles from './styles.module.scss';

const Companies = () => {
    const { isPending, isIdle, count, meta } = useSelector(getCompaniesSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isIdle) {
            dispatch(getCompaniesEffect());
        } else {
            dispatch(getCompaniesEffect({}, { silent: true }));
        }
    }, []); // eslint-disable-line

    const onChangePaginationValueHandler = (event, page, countPerPage) => {
        dispatch(getCompaniesEffect({ page, countPerPage }));
    };

    const onSearchHandler = (search) => {
        dispatch(setCompaniesSearchEffect(search));
        dispatch(getCompaniesEffect());
    };

    const onActiveHandler = (search) => {
        dispatch(setCompaniesSearchEffect(search));
        dispatch(getCompaniesEffect({ page: 0 }));
    };

    return (
        <div>
            <Header />
            <MainWrapper>
                <ContentWrapper>
                    <SubHeader
                        onSearch={onSearchHandler}
                        onActive={onActiveHandler}
                        searchSelector={getCompaniesSearchSelector}
                        refreshEffect={(cfg, options, cb) => getCompaniesEffect(cfg, { ...options, silent: true }, cb)}
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
            <SearchDrawer />
        </div>
    );
};

export default Companies;

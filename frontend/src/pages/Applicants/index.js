import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';

import { getApplicantsEffect, setApplicantsSearchEffect, requestRefreshApplicantsEffect } from 'store/effects/applicants';
import { getApplicantsSearchSelector, getApplicantsSelector } from 'store/selectors/applicants';
import { Header, ScrollWrapper, ContentWrapper, InfoWrapper, MainWrapper, TablePagination, PendingWrapper, SubHeader } from 'components';
import AddModal from './Modal';
import Table from './Table';
import Info from './Info';

import styles from './styles.module.scss';

const Applicants = () => {
    const { isPending, isIdle, count, meta } = useSelector(getApplicantsSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isIdle) {
            dispatch(getApplicantsEffect());
        } else {
            dispatch(getApplicantsEffect({}, { silent: true }));
        }
    }, []); // eslint-disable-line

    const onChangePaginationValueHandler = (event, page, countPerPage) => {
        dispatch(getApplicantsEffect({ page, countPerPage }));
    };

    const onSearchHandler = (search) => {
        dispatch(setApplicantsSearchEffect(search));
        dispatch(getApplicantsEffect());
    };

    const onActiveHandler = (search) => {
        dispatch(setApplicantsSearchEffect(search));
        dispatch(getApplicantsEffect({ page: 0 }));
    };

    return (
        <>
            <Header />
            <MainWrapper>
                <ContentWrapper>
                    <SubHeader
                        onSearch={onSearchHandler}
                        onActive={onActiveHandler}
                        searchSelector={getApplicantsSearchSelector}
                        refreshEffect={requestRefreshApplicantsEffect}
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

export default Applicants;

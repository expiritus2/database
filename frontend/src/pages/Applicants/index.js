import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getApplicantsEffect, setApplicantsSearchEffect, requestRefreshApplicantsEffect } from 'store/effects/applicants';
import { getApplicantsSearchSelector, getApplicantsSelector } from 'store/selectors/applicants';
import {
    Header,
    ScrollWrapper,
    ContentWrapper,
    InfoWrapper,
    MainWrapper,
    TablePagination,
    PendingWrapper,
    SubHeader,
} from 'components';
import AddModal from './Modal';
import Table from './Table';
import Info from './Info';

import styles from './styles.module.scss';

const Applicants = () => {
    const { isPending, isIdle } = useSelector(getApplicantsSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isIdle) {
            dispatch(getApplicantsEffect());
        } else {
            dispatch(getApplicantsEffect({}, { silent: true }));
        }
    }, []); // eslint-disable-line

    return (
        <>
            <Header />
            <PendingWrapper className={styles.pendingWrapper} isPending={isPending}>
                <MainWrapper>
                    <ContentWrapper>
                        <SubHeader
                            searchEffect={setApplicantsSearchEffect}
                            searchSelector={getApplicantsSearchSelector}
                            refreshEffect={requestRefreshApplicantsEffect}
                        />
                        <ScrollWrapper>
                            <Table />
                        </ScrollWrapper>
                        <TablePagination className={styles.tablePagination} />
                    </ContentWrapper>
                    <InfoWrapper>
                        <Info />
                    </InfoWrapper>
                </MainWrapper>
            </PendingWrapper>
            <AddModal />
        </>
    );
};

export default Applicants;

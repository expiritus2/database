import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getApplicantsEffect } from 'store/effects/applicants';
import { getApplicantsSelector } from 'store/selectors/applicants';
import {
    Header,
    ScrollWrapper,
    ContentWrapper,
    InfoWrapper,
    MainWrapper,
    TablePagination,
    PendingWrapper,
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

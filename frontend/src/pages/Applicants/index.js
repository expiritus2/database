import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';

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
    const { isPending, isIdle, data } = useSelector(getApplicantsSelector);
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
            <MainWrapper>
                <ContentWrapper>
                    <SubHeader
                        searchEffect={setApplicantsSearchEffect}
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
                    <TablePagination className={styles.tablePagination} />
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

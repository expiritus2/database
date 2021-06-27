import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';

import { getVacanciesEffect, setVacanciesSearchEffect } from 'store/effects/vacancies';
import { getVacanciesSearchSelector, getVacanciesSelector } from 'store/selectors/vacancies';
import { Header, ScrollWrapper, ContentWrapper, InfoWrapper, MainWrapper, TablePagination, PendingWrapper, SubHeader } from 'components';
import AddModal from './Modal';
import Table from './Table';
import Info from './Info';

import styles from './styles.module.scss';

const Vacancies = () => {
    const { isPending, isIdle, count, meta } = useSelector(getVacanciesSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isIdle) {
            dispatch(getVacanciesEffect());
        } else {
            dispatch(getVacanciesEffect({}, { silent: true }));
        }
    }, []); // eslint-disable-line

    const onChangePaginationValueHandler = (event, page, countPerPage) => {
        dispatch(getVacanciesEffect({ page, countPerPage }));
    };

    const onSearchHandler = (search) => {
        dispatch(setVacanciesSearchEffect(search));
        dispatch(getVacanciesEffect());
    };

    const onActiveHandler = (search) => {
        dispatch(setVacanciesSearchEffect(search));
        dispatch(getVacanciesEffect({ page: 0 }));
    };

    return (
        <>
            <Header />
            <MainWrapper>
                <ContentWrapper>
                    <SubHeader
                        onSearch={onSearchHandler}
                        onActive={onActiveHandler}
                        searchSelector={getVacanciesSearchSelector}
                        refreshEffect={(cfg, options, cb) => getVacanciesEffect(cfg, { ...options, silent: true }, cb)}
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

export default Vacancies;

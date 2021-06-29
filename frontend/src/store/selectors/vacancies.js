import { createSelector } from 'reselect';
import { IDLE, PENDING } from 'settings/constants/apiState';

const localState = ({ vacancies }) => vacancies;

export const getVacanciesSelector = createSelector(
    localState,
    (vacancies) => ({
        isPending: vacancies?.state === PENDING,
        isIdle: vacancies?.state === IDLE,
        count: vacancies?.data?.count,
        vacancies: vacancies?.data?.rows,
        meta: vacancies?.meta,
    }),
);

export const getVacanciesSearchSelector = createSelector(
    localState,
    (vacancies) => vacancies?.search,
);

import { createSelector } from 'reselect';
import { IDLE, PENDING } from 'settings/constants/apiState';

const localState = ({ vacancies }) => vacancies;

export const getVacanciesSelector = createSelector(
    localState,
    (vacancies) => ({
        isPending: vacancies?.state === PENDING,
        isIdle: vacancies?.state === IDLE,
        count: vacancies?.data?.count,
        data: vacancies?.data?.rows.map((contact) => ({
            ...contact,
            positions: contact?.positions?.map(({ label }) => label),
        })),
        meta: vacancies?.meta,
    }),
);

export const getVacanciesSearchSelector = createSelector(
    localState,
    (vacancies) => vacancies?.search,
);

import { createSelector } from 'reselect';
import { IDLE, PENDING } from 'settings/constants/apiState';

const localState = ({ vacancies }) => vacancies;

export const getVacanciesSelector = createSelector(
    localState,
    (vacancies) => ({
        isPending: vacancies?.state === PENDING,
        isIdle: vacancies?.state === IDLE,
        count: vacancies?.data?.count,
        data: vacancies?.data?.rows.map((vacancy) => ({
            ...vacancy,
            positions: vacancy?.positions?.map(({ label }) => label),
            skills: vacancy?.skills?.map(({ label }) => label),
            regions: vacancy?.regions?.map(({ label }) => label),
        })),
        meta: vacancies?.meta,
    }),
);

export const getVacanciesSearchSelector = createSelector(
    localState,
    (vacancies) => vacancies?.search,
);

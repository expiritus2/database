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
            position: vacancy?.position?.label,
            company: vacancy?.company?.name,
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

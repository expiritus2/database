import { createSelector } from 'reselect';
import { IDLE, PENDING } from 'settings/constants/apiState';

const localState = ({ vacancy }) => vacancy;

export const getCurrentVacancySelector = createSelector(
    localState,
    (vacancy) => ({
        isIdle: vacancy.state === IDLE,
        isPending: vacancy.state === PENDING,
        isData: !!vacancy?.data,
        vacancy: vacancy?.data,
    }),
);

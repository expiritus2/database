import { createSelector } from 'reselect';

const localState = ({ forms }) => forms;

export const getVacancyFormSelector = createSelector(
    localState,
    (forms) => ({
        formFields: forms?.vacancy?.data || {},
        errors: forms?.vacancy?.errors || [],
    }),
);

// export const getVacancyFilesFormStateSelector = createSelector(
//     getVacancyFormSelector,
//     (vacancy) => vacancy?.files,
// );
//
// export const getVacancyFormStateSelector = createSelector(
//     getVacancyFormSelector,
//     (vacancy) => vacancy?.state,
// );

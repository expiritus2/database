import { handleActions } from 'redux-actions';
import { getVacanciesAction, resetCurrentVacancyAction, setCurrentVacancyAction } from 'store/actions/vacancies';
import { get, find } from 'lodash-es';

const initialData = null;

export default handleActions({
    [setCurrentVacancyAction]: (state, { payload }) => ({
        ...state,
        ...payload,
    }),
    [getVacanciesAction]: (state, { payload }) => {
        const vacancies = get(payload, 'data.result.rows');
        const currentVacancy = find(vacancies, (applicant) => applicant?.id === state?.id);
        return currentVacancy ? { ...currentVacancy } : state;
    },
    [resetCurrentVacancyAction]: () => initialData,
}, initialData);

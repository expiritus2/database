import Api from 'store/effects/core/api';
import {
    getVacanciesAction,
    setCurrentVacancyAction,
    resetCurrentVacancyAction,
    setVacanciesSearchAction,
    requestRefreshVacanciesAction,
} from 'store/actions/vacancies';
import { getVacancies } from 'api/vacancies';
import { getState } from 'store';
import { get } from 'lodash-es';

export const getVacanciesEffect = (cfg, options = {}, cb) => {
    const { vacancies } = getState();

    const sendRequest = Api.execResult({ action: getVacanciesAction, method: getVacancies });

    const config = {
        search: vacancies?.search?.string || undefined,
        active: vacancies?.search?.active || undefined,
        page: cfg?.page ?? vacancies?.meta?.page,
        countPerPage: cfg?.countPerPage ?? vacancies?.meta?.countPerPage,
    };

    return sendRequest(config, options, cb);
};

export const setCurrentVacancyEffect = (cfg) => (dispatch) => {
    const state = getState();
    const vacancies = get(state, 'vacancies.data.rows', []);
    const vacancyInfo = vacancies.find((vacancy) => vacancy.id === cfg?.id);

    if (vacancyInfo) {
        dispatch(setCurrentVacancyAction(vacancyInfo));
    }
};

export const resetVacancyEffect = () => (dispatch) => {
    dispatch(resetCurrentVacancyAction());
};

export const setVacanciesSearchEffect = (cfg = {}) => (dispatch) => {
    const { vacancies } = getState();
    dispatch(setVacanciesSearchAction({ ...(vacancies?.search || {}), ...cfg }));
};

export const requestRefreshVacanciesEffect = Api.execResult({
    action: requestRefreshVacanciesAction,
    method: getVacancies,
});

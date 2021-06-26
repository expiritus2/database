import Api from 'store/effects/core/api';
import {
    getVacanciesAction,
    resetCurrentVacancyAction,
    setVacanciesSearchAction,
    requestRefreshVacanciesAction,
    getVacancyAction,
} from 'store/actions/vacancies';
import { getVacancies, getVacancy } from 'api/vacancies';
import { getState } from 'store';

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

export const getVacancyEffect = (cfg, options = {}, cb) => {
    const sendRequest = Api.execResult({ action: getVacancyAction, method: getVacancy });

    return sendRequest(cfg, options, cb);
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

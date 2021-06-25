import Api from 'store/effects/core/api';
import {
    createVacancyAction,
    setVacancyFormStateAction,
    resetVacancyFormAction,
    setInitVacancyFormDataAction,
    updateVacancyAction,
} from 'store/actions/forms/vacancy';
import { createVacancy, updateVacancy } from 'api/vacancies';
import { getState } from 'store/index';
import { get } from 'lodash-es';
import { prepareData } from './helpers';

export const setVacancyFormStateEffect = (cfg) => (dispatch) => {
    dispatch(setVacancyFormStateAction(cfg));
};

export const resetVacancyFormEffect = () => (dispatch) => {
    dispatch(resetVacancyFormAction());
};

export const createVacancyEffect = (cfg, options, cb) => {
    const sendRequest = Api.execResult({ action: createVacancyAction, method: createVacancy });
    const formFields = get(getState(), 'forms.vacancy.data');

    const clonedApplicant = prepareData(formFields);

    return sendRequest(clonedApplicant, options, cb);
};

export const updateVacancyEffect = (cfg, options, cb) => {
    const sendRequest = Api.execResult({ action: updateVacancyAction, method: updateVacancy });
    const formFields = get(getState(), 'forms.vacancy.data');

    const clonedApplicant = prepareData(formFields);

    return sendRequest(clonedApplicant, options, cb);
};

export const setInitVacancyFormDataEffect = (cfg) => (dispatch) => {
    dispatch(setInitVacancyFormDataAction(cfg));
};

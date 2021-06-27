import Api from 'store/effects/core/api';
import {
    createCompanyAction,
    setCompanyFormStateAction,
    resetCompanyFormAction,
    setInitCompanyFormDataAction,
    updateCompanyAction,
} from 'store/actions/forms/company';
import { getState } from 'store/index';
import { get } from 'lodash-es';
import { createCompany, updateCompany } from 'api/companies';
import { prepareData } from './helpers';

export const setCompanyFormStateEffect = (cfg) => (dispatch) => {
    dispatch(setCompanyFormStateAction(cfg));
};

export const resetCompanyFormEffect = () => (dispatch) => {
    dispatch(resetCompanyFormAction());
};

export const createCompanyEffect = (cfg, options, cb) => {
    const sendRequest = Api.execResult({ action: createCompanyAction, method: createCompany });
    const formFields = get(getState(), 'forms.company.data');

    const clonedCompany = prepareData(formFields);

    return sendRequest(clonedCompany, options, cb);
};

export const updateCompanyFormEffect = (cfg, options, cb) => {
    const sendRequest = Api.execResult({ action: updateCompanyAction, method: updateCompany });
    const formFields = get(getState(), 'forms.company.data');

    const clonedCompany = prepareData(formFields);

    return sendRequest(clonedCompany, options, cb);
};

export const setInitCompanyFormDataEffect = (cfg) => (dispatch) => {
    dispatch(setInitCompanyFormDataAction(cfg));
};

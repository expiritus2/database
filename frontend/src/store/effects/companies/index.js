import Api from 'store/effects/core/api';
import {
    getCompaniesAction,
    setCurrentCompanyAction,
    resetCurrentCompanyAction,
    setCompaniesSearchAction,
    requestRefreshCompaniesAction,
} from 'store/actions/companies';
import { getCompanies } from 'api/companies';
import { getState } from 'store';
import { get } from 'lodash-es';

export const getCompaniesEffect = (cfg, options = {}, cb) => {
    const { companies } = getState();
    const requestParams = { action: getCompaniesAction, method: getCompanies };

    let sendRequest = Api.execBase(requestParams);

    if (options.silent) {
        sendRequest = Api.execResult(requestParams);
    }

    const config = {
        search: companies?.search?.string || undefined,
        active: companies?.search?.active || undefined,
        page: cfg?.page ?? companies?.meta?.page,
        countPerPage: cfg?.countPerPage ?? companies?.meta?.countPerPage,
    };

    return sendRequest(config, options, cb);
};

export const setCurrentCompanyEffect = (cfg) => (dispatch) => {
    const state = getState();
    const companies = get(state, 'companies.data.rows', []);
    const contactInfo = companies.find((contact) => contact.id === cfg?.id);

    if (contactInfo) {
        dispatch(setCurrentCompanyAction(contactInfo));
    }
};

export const resetCompanyEffect = () => (dispatch) => {
    dispatch(resetCurrentCompanyAction());
};

export const setCompaniesSearchEffect = (cfg = {}) => (dispatch) => {
    const { companies } = getState();
    dispatch(setCompaniesSearchAction({ ...(companies?.search || {}), ...cfg }));
};

export const requestRefreshCompaniesEffect = (cfg, options, cb) => {
    const sendRequest = Api.execResult({ action: requestRefreshCompaniesAction, method: getCompanies });

    return sendRequest(cfg, options, cb);
};

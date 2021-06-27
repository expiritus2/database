import Api from 'store/effects/core/api';
import {
    getCompaniesAction,
    resetCurrentCompanyAction,
    setCompaniesSearchAction,
    deleteCompanyAction,
    getCompanyAction,
} from 'store/actions/companies';
import { getCompanies, deleteCompany, getCompany } from 'api/companies';
import { getState } from 'store';
import { getSearchConfig } from './helpers';

export const getCompaniesEffect = (cfg, options = {}, cb) => {
    const sendRequest = Api.execResult({ action: getCompaniesAction, method: getCompanies });
    const { companies } = getState();

    const config = getSearchConfig(cfg, companies);

    return sendRequest(config, options, cb);
};

export const resetCompanyEffect = () => (dispatch) => {
    dispatch(resetCurrentCompanyAction());
};

export const setCompaniesSearchEffect = (cfg = {}) => (dispatch) => {
    const { companies } = getState();
    dispatch(setCompaniesSearchAction({ ...(companies?.search || {}), ...cfg }));
};

export const deleteCompanyEffect = (cfg, options, cb) => {
    const sendRequest = Api.execResult({ action: deleteCompanyAction, method: deleteCompany });

    const { companies } = getState();

    const config = {
        id: cfg?.id,
        ...getSearchConfig(cfg, companies),
    };

    return sendRequest(config, options, cb);
};

export const getCompanyEffect = (cfg, options, cb) => {
    const sendRequest = Api.execResult({ action: getCompanyAction, method: getCompany });

    return sendRequest(cfg, options, cb);
};

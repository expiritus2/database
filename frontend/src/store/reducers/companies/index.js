import { handleActions } from 'redux-actions';
import { IDLE } from 'settings/constants/apiState';
import {
    getCompaniesAction,
    requestRefreshCompaniesAction,
    setCompaniesSearchAction,
} from 'store/actions/companies';
import { get } from 'lodash-es';

const initialData = {
    state: IDLE,
    data: null,
    meta: {},
    search: {
        string: '',
        active: false,
    },
};

export default handleActions({
    [getCompaniesAction]: (state, { payload }) => ({
        ...state,
        state: payload.state,
        data: get(payload, 'data.result', initialData.data),
        meta: get(payload, 'meta', initialData.meta),
    }),
    [requestRefreshCompaniesAction]: (state, { payload }) => ({
        ...state,
        state: payload.state,
        data: get(payload, 'data.result', initialData.data),
        meta: get(payload, 'meta', initialData.meta),
    }),
    [setCompaniesSearchAction]: (state, { payload }) => ({
        ...state,
        search: { ...payload },
    }),
}, initialData);

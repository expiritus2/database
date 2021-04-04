import { handleActions } from 'redux-actions';
import { IDLE } from 'settings/constants/apiState';
import {
    getApplicantsAction,
    requestRefreshApplicantsAction,
    setApplicantsSearchAction,
} from 'store/actions/applicants';
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
    [getApplicantsAction]: (state, { payload }) => ({
        ...state,
        state: payload.state,
        data: get(payload, 'data.result', initialData.data),
        meta: get(payload, 'meta', initialData.meta),
    }),
    [requestRefreshApplicantsAction]: (state, { payload }) => ({
        ...state,
        state: payload.state,
        data: get(payload, 'data.result', initialData.data),
        meta: get(payload, 'meta', initialData.meta),
    }),
    [setApplicantsSearchAction]: (state, { payload }) => ({
        ...state,
        search: { ...payload },
    }),
}, initialData);

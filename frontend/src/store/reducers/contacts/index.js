import { handleActions } from 'redux-actions';
import { IDLE } from 'settings/constants/apiState';
import {
    getContactsAction,
    requestRefreshContactsAction,
    setContactsSearchAction,
} from 'store/actions/contacts';
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
    [getContactsAction]: (state, { payload }) => ({
        ...state,
        state: payload.state,
        data: get(payload, 'data.result', initialData.data),
        meta: get(payload, 'meta', initialData.meta),
    }),
    [requestRefreshContactsAction]: (state, { payload }) => ({
        ...state,
        state: payload.state,
        data: get(payload, 'data.result', initialData.data),
        meta: get(payload, 'meta', initialData.meta),
    }),
    [setContactsSearchAction]: (state, { payload }) => ({
        ...state,
        search: { ...payload },
    }),
}, initialData);

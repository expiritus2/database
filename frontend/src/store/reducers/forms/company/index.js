import { handleActions } from 'redux-actions';
import {
    resetCompanyFormAction,
    setCompanyFormStateAction,
    createCompanyAction,
    setInitCompanyFormDataAction,
    updateCompanyAction,
} from 'store/actions/forms/company';
import { cloneDeep, get } from 'lodash-es';
import { emptyLink, emptyAddress } from 'settings/constants/templates';
import { IDLE } from 'settings/constants/apiState';
import { clearErrors } from 'store/helpers';
import { logoutAction } from 'store/actions/auth';

const initialData = {
    state: IDLE,
    data: {
        active: false,
        name: '',
        users: [],
        photo: null,
        activities: [],
        regions: [],
        links: [emptyLink],
        addresses: [emptyAddress],
        info: '',
    },
    meta: {},
    errors: {},
};

export default handleActions({
    [setCompanyFormStateAction]: (state, { payload }) => ({
        ...state,
        data: {
            ...state.data,
            ...payload,
        },
        errors: clearErrors(state.errors, payload),
    }),
    [createCompanyAction]: (state, { payload }) => ({
        ...state,
        state: payload.state,
        meta: get(payload, 'meta', initialData.meta),
        errors: get(payload, 'errors', initialData.errors),
    }),
    [updateCompanyAction]: (state, { payload }) => ({
        ...state,
        state: payload.state,
        meta: get(payload, 'meta', initialData.meta),
        errors: get(payload, 'errors', initialData.errors),
    }),
    [setInitCompanyFormDataAction]: (state, { payload }) => ({
        ...state,
        data: {
            ...payload,
        },
        errors: cloneDeep(initialData.errors),
    }),
    [resetCompanyFormAction]: () => initialData,
    [logoutAction]: () => cloneDeep(initialData),
}, initialData);

import { handleActions } from 'redux-actions';
import {
    resetContactFormAction,
    setContactFormStateAction,
    createContactAction,
    setInitContactFormDataAction,
    updateContactAction,
} from 'store/actions/forms/contact';
import { cloneDeep, get } from 'lodash-es';
import { emptyEmail, emptyPhone } from 'settings/constants/templates';
import { IDLE } from 'settings/constants/apiState';
import { clearErrors } from 'store/helpers';

const initialData = {
    state: IDLE,
    data: {
        active: false,
        name: '',
        users: [],
        positions: [],
        photos: [],
        birthDate: null,
        sex: {},
        phones: [emptyPhone],
        emails: [emptyEmail],
    },
    meta: {},
    errors: {},
};

export default handleActions({
    [setContactFormStateAction]: (state, { payload }) => ({
        ...state,
        data: {
            ...state.data,
            ...payload,
        },
        errors: clearErrors(state.errors, payload),
    }),
    [createContactAction]: (state, { payload }) => ({
        ...state,
        state: payload.state,
        meta: get(payload, 'meta', initialData.meta),
        errors: get(payload, 'errors', initialData.errors),
    }),
    [updateContactAction]: (state, { payload }) => ({
        ...state,
        state: payload.state,
        meta: get(payload, 'meta', initialData.meta),
        errors: get(payload, 'errors', initialData.errors),
    }),
    [setInitContactFormDataAction]: (state, { payload }) => ({
        ...state,
        data: {
            ...payload,
        },
        errors: cloneDeep(initialData.errors),
    }),
    [resetContactFormAction]: () => initialData,
}, initialData);

import { handleActions } from 'redux-actions';
import {
    resetContactFormAction,
    setContactFormStateAction,
    submitContactFormAction,
    uploadContactFilesAction,
    setContactFormDataAction,
} from 'store/actions/forms/contact';
import { IDLE } from 'settings/constants/apiState';
import { get } from 'lodash-es';

const initialData = {
    active: false,
    name: '',
    company: '',
    positions: [],
    photos: [],
    birthDate: '',
    sex: '',
    phones: [{ type: '', number: '' }],
    emails: [''],
    state: IDLE,
    meta: {},
};

export default handleActions({
    [setContactFormStateAction]: (state, { payload }) => ({
        ...state,
        ...payload,
    }),
    [uploadContactFilesAction]: (state, { payload }) => ({
        ...state,
        state: payload.state,
        meta: get(payload, 'meta', initialData.meta),
    }),
    [submitContactFormAction]: (state, { payload }) => ({
        ...state,
        state: payload.state,
        meta: get(payload, 'meta', initialData.meta),
    }),
    [setContactFormDataAction]: (state, { payload }) => ({
        ...state,
        ...payload,
    }),
    [resetContactFormAction]: () => initialData,
}, initialData);

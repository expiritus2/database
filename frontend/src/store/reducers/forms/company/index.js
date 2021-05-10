import { handleActions } from 'redux-actions';
import {
    resetCompanyFormAction,
    setCompanyFormStateAction,
    submitCompanyFormAction,
    uploadCompanyFilesAction,
    setCompanyFormDataAction,
} from 'store/actions/forms/company';
import { get } from 'lodash-es';

const initialData = {
    active: false,
    name: '',
    users: [],
    logo: null,
    regions: [],
    links: [{ type: '', link: '' }],
    addresses: [],
    info: '',
};

export default handleActions({
    [setCompanyFormStateAction]: (state, { payload }) => ({
        ...state,
        ...payload,
    }),
    [uploadCompanyFilesAction]: (state, { payload }) => ({
        ...state,
        state: payload.state,
        meta: get(payload, 'meta', initialData.meta),
    }),
    [submitCompanyFormAction]: (state, { payload }) => ({
        ...state,
        state: payload.state,
        meta: get(payload, 'meta', initialData.meta),
    }),
    [setCompanyFormDataAction]: (state, { payload }) => ({
        ...state,
        ...payload,
    }),
    [resetCompanyFormAction]: () => initialData,
}, initialData);

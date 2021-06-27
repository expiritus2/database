import { handleActions } from 'redux-actions';
import { getCompanyAction, resetCurrentCompanyAction } from 'store/actions/companies';
import { updateCompanyAction } from 'store/actions/forms/company';
import { get } from 'lodash-es';
import { IDLE } from 'settings/constants/apiState';

const initialData = {
    state: IDLE,
    data: null,
    meta: {},
};

export default handleActions({
    [getCompanyAction]: (state, { payload }) => ({
        state: payload.state,
        data: get(payload, 'data.result', initialData.data),
        meta: get(payload, 'meta', initialData.meta),
    }),
    [updateCompanyAction]: (state, { payload }) => ({
        state: payload.state,
        data: get(payload, 'data.result', initialData.data),
        meta: get(payload, 'meta', initialData.meta),
    }),
    [resetCurrentCompanyAction]: () => initialData,
}, initialData);

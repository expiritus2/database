import { handleActions } from 'redux-actions';
import { getCompanyAction, resetCurrentCompanyAction } from 'store/actions/companies';
import { updateCompanyAction } from 'store/actions/forms/company';
import { cloneDeep, get } from 'lodash-es';
import { IDLE } from 'settings/constants/apiState';
import { logoutAction } from 'store/actions/auth';

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
    [logoutAction]: () => cloneDeep(initialData),
}, initialData);
